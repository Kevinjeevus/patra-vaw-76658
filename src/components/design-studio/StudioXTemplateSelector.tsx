import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { DesignTemplate, CanvasElement, CanvasBackground, CardDimensions } from '@/types/design-studio';
import { supabase } from '@/integrations/supabase/client';
import { Sparkles, Eye, Check, Layout, FlipHorizontal } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import QRCode from 'react-qr-code';

// Default back side elements when template doesn't have back configured
const getDefaultBackElements = (dimensions: CardDimensions): CanvasElement[] => [
  {
    id: 'default-back-logo',
    type: 'company_logo',
    label: 'Company Logo',
    dataField: 'company_logo_url',
    x: dimensions.width / 2 - 30,
    y: 20,
    width: 60,
    height: 60,
    zIndex: 1,
    visible: true,
    style: { borderRadius: 8 },
  },
  {
    id: 'default-back-qr',
    type: 'qr_code',
    label: 'QR Code',
    dataField: 'vanity_url',
    x: dimensions.width / 2 - 50,
    y: 90,
    width: 100,
    height: 100,
    zIndex: 2,
    visible: true,
    style: { backgroundColor: '#ffffff', borderRadius: 8, padding: 8 },
  },
  {
    id: 'default-back-brand',
    type: 'custom_text',
    label: 'Patra',
    content: 'Patra',
    x: dimensions.width / 2 - 30,
    y: dimensions.height - 30,
    width: 60,
    height: 20,
    zIndex: 3,
    visible: true,
    style: { fontSize: 12, fontWeight: 'semibold', color: '#6366f1', textAlign: 'center' },
  },
];

const defaultBackBackground: CanvasBackground = { type: 'color', value: '#f8fafc' };

interface StudioXTemplateSelectorProps {
  selectedTemplateId: string | null;
  onSelectTemplate: (template: DesignTemplate | null) => void;
  previewData?: {
    company_logo_url?: string;
    avatar_url?: string;
    display_name?: string;
    job_title?: string;
    employee_display_id?: string;
    department?: string;
    email?: string;
    phone?: string;
    vanity_url?: string;
  };
}

// Mini preview renderer for template cards
const TemplatePreview: React.FC<{
  elements: CanvasElement[];
  background: CanvasBackground;
  dimensions: CardDimensions;
  previewData: Record<string, any>;
  scale?: number;
  showBack?: boolean;
  backElements?: CanvasElement[];
  backBackground?: CanvasBackground;
}> = ({ elements, background, dimensions, previewData, scale = 0.4, showBack = false, backElements, backBackground }) => {
  
  // Use back side data if showing back, with defaults if not configured
  const displayElements = showBack 
    ? (backElements && backElements.length > 0 ? backElements : getDefaultBackElements(dimensions))
    : elements;
  const displayBackground = showBack 
    ? (backBackground || defaultBackBackground)
    : background;
  
  const getBackgroundStyle = (): React.CSSProperties => {
    switch (displayBackground.type) {
      case 'color':
        return { backgroundColor: displayBackground.value };
      case 'gradient':
        return {
          background: `linear-gradient(${displayBackground.gradientDirection || '135deg'}, ${displayBackground.value}, ${displayBackground.secondaryValue || displayBackground.value})`,
        };
      case 'image':
        return {
          backgroundImage: `url(${displayBackground.value})`,
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

  const sortedElements = [...displayElements].filter(el => el.visible !== false).sort((a, b) => a.zIndex - b.zIndex);

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

export const StudioXTemplateSelector: React.FC<StudioXTemplateSelectorProps> = ({
  selectedTemplateId,
  onSelectTemplate,
  previewData = {},
}) => {
  const [templates, setTemplates] = useState<DesignTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [previewTemplate, setPreviewTemplate] = useState<DesignTemplate | null>(null);
  const [showBackSide, setShowBackSide] = useState(false);

  // Helper to extract back side data from canvas_config
  const getBackSideData = (template: DesignTemplate) => {
    const config = template.canvas_config || {};
    return {
      elements: config.backElements as CanvasElement[] || [],
      background: config.backBackground as CanvasBackground || null,
    };
  };

  // Sample preview data merged with provided data
  const sampleData = {
    company_logo_url: previewData.company_logo_url || '',
    avatar_url: previewData.avatar_url || '',
    display_name: previewData.display_name || 'Alex Johnson',
    job_title: previewData.job_title || 'Product Designer',
    employee_display_id: previewData.employee_display_id || 'EMP-2024',
    department: previewData.department || 'Design Team',
    email: previewData.email || 'alex@company.com',
    phone: previewData.phone || '+1 555 123 4567',
    vanity_url: previewData.vanity_url || 'https://patra.app/alex',
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

  const handleSelectTemplate = async (template: DesignTemplate) => {
    try {
      await supabase
        .from('custom_id_templates')
        .update({ use_count: (template.use_count || 0) + 1 })
        .eq('id', template.id);
    } catch (error) {
      console.error('Error updating use count:', error);
    }

    onSelectTemplate(template);
    setPreviewTemplate(null);
    toast({ title: 'Template applied!', description: `"${template.name}" is now active for staff cards.` });
  };

  const handleClearTemplate = () => {
    onSelectTemplate(null);
    toast({ title: 'Template cleared', description: 'Using default ID card template.' });
  };

  const selectedTemplate = templates.find(t => t.id === selectedTemplateId);

  return (
    <Card className="shadow-md border-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Studio X Templates
        </CardTitle>
        <CardDescription>
          Apply custom ID card designs created in the Design Studio. These templates are published by the community.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="aspect-[1.6] rounded-xl" />
            ))}
          </div>
        ) : templates.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-xl">
            <Layout className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Studio X Templates</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              No community templates available yet. Create your own in the Design Studio and publish it for everyone to use!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Currently selected template */}
            {selectedTemplate && (
              <div className="p-4 bg-primary/5 rounded-xl border-2 border-primary/20 mb-4">
                <div className="flex items-center gap-4">
                  <TemplatePreview
                    elements={selectedTemplate.elements}
                    background={selectedTemplate.background}
                    dimensions={selectedTemplate.card_dimensions}
                    previewData={sampleData}
                    scale={0.35}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="font-medium text-sm">Active Template</span>
                    </div>
                    <h4 className="font-semibold">{selectedTemplate.name}</h4>
                    <p className="text-xs text-muted-foreground">{selectedTemplate.description}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleClearTemplate}>
                    Clear
                  </Button>
                </div>
              </div>
            )}

            {/* Template grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`relative group cursor-pointer rounded-xl overflow-hidden border-2 transition-all hover:ring-2 hover:ring-primary ${
                    selectedTemplateId === template.id 
                      ? 'border-primary ring-2 ring-primary' 
                      : 'border-muted hover:border-primary/50'
                  }`}
                  onClick={() => setPreviewTemplate(template)}
                >
                  {/* Template preview */}
                  <div className="p-3 bg-muted/30 flex items-center justify-center">
                    <TemplatePreview
                      elements={template.elements}
                      background={template.background}
                      dimensions={template.card_dimensions}
                      previewData={sampleData}
                      scale={0.35}
                    />
                  </div>
                  
                  {/* Template info */}
                  <div className="p-3 bg-card">
                    <h4 className="font-medium text-sm truncate">{template.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-[10px]">
                        <Eye className="w-2.5 h-2.5 mr-1" />
                        {template.use_count || 0}
                      </Badge>
                    </div>
                  </div>

                  {/* Selected checkmark */}
                  {selectedTemplateId === template.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm" variant="secondary">
                      <Eye className="w-3 h-3 mr-1" />
                      Preview
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      {/* Preview Modal */}
      <Dialog open={!!previewTemplate} onOpenChange={(open) => { 
        if (!open) {
          setPreviewTemplate(null);
          setShowBackSide(false);
        }
      }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{previewTemplate?.name}</DialogTitle>
            <DialogDescription>
              {previewTemplate?.description || 'Preview this template before applying it to staff cards.'}
            </DialogDescription>
          </DialogHeader>
          
          {previewTemplate && (
            <div className="flex flex-col items-center py-4">
              {/* Flip toggle */}
              <div className="flex items-center gap-2 mb-4">
                <Button
                  variant={showBackSide ? 'outline' : 'default'}
                  size="sm"
                  onClick={() => setShowBackSide(false)}
                >
                  Front
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowBackSide(!showBackSide)}
                  className="h-8 w-8"
                >
                  <FlipHorizontal className="w-4 h-4" />
                </Button>
                <Button
                  variant={showBackSide ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShowBackSide(true)}
                >
                  Back
                </Button>
              </div>

              {/* Large preview */}
              <TemplatePreview
                elements={previewTemplate.elements}
                background={previewTemplate.background}
                dimensions={previewTemplate.card_dimensions}
                previewData={sampleData}
                scale={0.9}
                showBack={showBackSide}
                backElements={getBackSideData(previewTemplate).elements}
                backBackground={getBackSideData(previewTemplate).background}
              />
              
              <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                <Eye className="w-4 h-4" />
                <span>Used {previewTemplate.use_count || 0} times</span>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => { setPreviewTemplate(null); setShowBackSide(false); }}>
              Cancel
            </Button>
            <Button onClick={() => previewTemplate && handleSelectTemplate(previewTemplate)}>
              <Check className="w-4 h-4 mr-2" />
              Apply Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
