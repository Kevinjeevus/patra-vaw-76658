import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { DesignTemplate, CanvasElement, CanvasBackground, CardDimensions } from '@/types/design-studio';
import { supabase } from '@/integrations/supabase/client';
import { Search, Download, Eye, Sparkles, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import QRCode from 'react-qr-code';

interface TemplateGalleryProps {
  onUseTemplate: (template: DesignTemplate) => void;
}

// Mini preview renderer for template cards
const TemplatePreview: React.FC<{
  elements: CanvasElement[];
  background: CanvasBackground;
  dimensions: CardDimensions;
  previewData: Record<string, any>;
  scale?: number;
}> = ({ elements, background, dimensions, previewData, scale = 0.4 }) => {
  
  const getBackgroundStyle = (): React.CSSProperties => {
    switch (background.type) {
      case 'color':
        return { backgroundColor: background.value };
      case 'gradient':
        return {
          background: `linear-gradient(${background.gradientDirection || '135deg'}, ${background.value}, ${background.secondaryValue || background.value})`,
        };
      case 'image':
        return {
          backgroundImage: `url(${background.value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      default:
        return { backgroundColor: '#ffffff' };
    }
  };

  const renderElement = (element: CanvasElement) => {
    const value = element.dataField ? previewData[element.dataField] : element.content;

    if (element.type === 'company_logo' || element.type === 'profile_photo') {
      return value ? (
        <img 
          src={value} 
          alt={element.label}
          className="w-full h-full object-cover"
          style={{ borderRadius: element.style.borderRadius }}
        />
      ) : (
        <div 
          className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground"
          style={{ borderRadius: element.style.borderRadius, fontSize: 8 * scale }}
        >
          {element.type === 'company_logo' ? '🏢' : '👤'}
        </div>
      );
    }

    if (element.type === 'qr_code') {
      return (
        <div 
          className="w-full h-full flex items-center justify-center bg-white"
          style={{ borderRadius: element.style.borderRadius, padding: 2 }}
        >
          <QRCode value={value || 'https://patra.app'} size={Math.min(element.width, element.height) * scale - 4} />
        </div>
      );
    }

    if (element.type === 'shape') {
      return (
        <div 
          className="w-full h-full"
          style={{
            backgroundColor: element.style.backgroundColor,
            borderRadius: element.style.borderRadius,
            opacity: element.style.opacity,
          }}
        />
      );
    }

    if (element.type === 'divider') {
      return <div className="w-full h-full" style={{ backgroundColor: element.style.backgroundColor }} />;
    }

    // Text elements
    return (
      <div
        className="w-full h-full flex items-center overflow-hidden"
        style={{
          fontSize: (element.style.fontSize || 14) * scale,
          fontWeight: element.style.fontWeight === 'bold' ? 700 : element.style.fontWeight === 'semibold' ? 600 : 400,
          color: element.style.color,
          textAlign: element.style.textAlign,
          justifyContent: element.style.textAlign === 'center' ? 'center' : element.style.textAlign === 'right' ? 'flex-end' : 'flex-start',
        }}
      >
        <span className="truncate">{value || element.label}</span>
      </div>
    );
  };

  const sortedElements = [...elements].filter(el => el.visible !== false).sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div
      className="relative rounded-lg overflow-hidden shadow-md"
      style={{
        width: dimensions.width * scale,
        height: dimensions.height * scale,
        ...getBackgroundStyle(),
      }}
    >
      {sortedElements.map((element) => (
        <div
          key={element.id}
          className="absolute"
          style={{
            left: element.x * scale,
            top: element.y * scale,
            width: element.width * scale,
            height: element.height * scale,
          }}
        >
          {renderElement(element)}
        </div>
      ))}
    </div>
  );
};

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onUseTemplate }) => {
  const [templates, setTemplates] = useState<DesignTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<DesignTemplate | null>(null);

  // Sample preview data
  const samplePreviewData = {
    company_logo_url: '',
    avatar_url: '',
    display_name: 'Alex Johnson',
    job_title: 'Product Designer',
    employee_display_id: 'EMP-2024',
    department: 'Design Team',
    email: 'alex@company.com',
    phone: '+1 555 123 4567',
    vanity_url: 'https://patra.app/alex',
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('custom_id_templates')
        .select('*')
        .eq('is_published', true)
        .eq('is_public', true)
        .order('use_count', { ascending: false });

      if (error) throw error;

      const mappedTemplates: DesignTemplate[] = (data || []).map((t: any) => ({
        id: t.id,
        created_by: t.created_by,
        name: t.name,
        description: t.description,
        thumbnail_url: t.thumbnail_url,
        canvas_config: t.canvas_config,
        elements: t.elements || [],
        background: t.background || { type: 'color', value: '#ffffff' },
        card_dimensions: t.card_dimensions || { width: 340, height: 214, orientation: 'horizontal' },
        is_published: t.is_published,
        is_public: t.is_public,
        use_count: t.use_count || 0,
        created_at: t.created_at,
        updated_at: t.updated_at,
      }));

      setTemplates(mappedTemplates);
    } catch (error: any) {
      console.error('Error fetching templates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseTemplate = async (template: DesignTemplate) => {
    try {
      await supabase
        .from('custom_id_templates')
        .update({ use_count: (template.use_count || 0) + 1 })
        .eq('id', template.id);
    } catch (error) {
      console.error('Error updating use count:', error);
    }

    onUseTemplate(template);
    setPreviewTemplate(null);
    toast({ title: 'Template loaded!', description: `"${template.name}" is ready to customize.` });
  };

  const filteredTemplates = templates.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-[1.6] w-full" />
              <CardContent className="p-3">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredTemplates.length === 0 ? (
        <div className="text-center py-12">
          <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No templates yet</h3>
          <p className="text-muted-foreground text-sm">
            Be the first to create and publish a template!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id} 
              className="overflow-hidden group hover:ring-2 hover:ring-primary transition-all cursor-pointer"
              onClick={() => setPreviewTemplate(template)}
            >
              <div className="p-3 flex items-center gap-3">
                {/* Mini preview */}
                <TemplatePreview
                  elements={template.elements}
                  background={template.background}
                  dimensions={template.card_dimensions}
                  previewData={samplePreviewData}
                  scale={0.3}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{template.name}</h4>
                  {template.description && (
                    <p className="text-xs text-muted-foreground truncate">{template.description}</p>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-[10px]">
                      <Eye className="w-2.5 h-2.5 mr-1" />
                      {template.use_count || 0} uses
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{previewTemplate?.name}</DialogTitle>
            <DialogDescription>
              {previewTemplate?.description || 'Preview this template before using it.'}
            </DialogDescription>
          </DialogHeader>
          
          {previewTemplate && (
            <div className="flex flex-col items-center py-4">
              {/* Large preview */}
              <TemplatePreview
                elements={previewTemplate.elements}
                background={previewTemplate.background}
                dimensions={previewTemplate.card_dimensions}
                previewData={samplePreviewData}
                scale={0.9}
              />
              
              <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                <Eye className="w-4 h-4" />
                <span>Used {previewTemplate.use_count || 0} times</span>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewTemplate(null)}>
              Cancel
            </Button>
            <Button onClick={() => previewTemplate && handleUseTemplate(previewTemplate)}>
              <Download className="w-4 h-4 mr-2" />
              Use This Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
