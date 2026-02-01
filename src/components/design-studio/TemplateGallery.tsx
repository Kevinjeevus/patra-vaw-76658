import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { DesignTemplate } from '@/types/design-studio';
import { supabase } from '@/integrations/supabase/client';
import { Search, Download, Eye, User, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface TemplateGalleryProps {
  onUseTemplate: (template: DesignTemplate) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onUseTemplate }) => {
  const [templates, setTemplates] = useState<DesignTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

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

      // Map the data to our DesignTemplate type
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
    // Increment use count
    try {
      await supabase
        .from('custom_id_templates')
        .update({ use_count: (template.use_count || 0) + 1 })
        .eq('id', template.id);
    } catch (error) {
      console.error('Error updating use count:', error);
    }

    onUseTemplate(template);
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden group hover:ring-2 hover:ring-primary transition-all">
              <div className="aspect-[1.6] relative bg-muted">
                {template.thumbnail_url ? (
                  <img 
                    src={template.thumbnail_url} 
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div 
                    className="w-full h-full"
                    style={{
                      background: template.background.type === 'gradient' 
                        ? `linear-gradient(${template.background.gradientDirection || '135deg'}, ${template.background.value}, ${template.background.secondaryValue})`
                        : template.background.type === 'image'
                        ? `url(${template.background.value}) center/cover`
                        : template.background.value,
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="sm" variant="secondary" onClick={() => handleUseTemplate(template)}>
                    <Download className="w-3 h-3 mr-1" />
                    Use
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <h4 className="font-medium text-sm truncate">{template.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-[10px]">
                    <Eye className="w-2.5 h-2.5 mr-1" />
                    {template.use_count || 0}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
