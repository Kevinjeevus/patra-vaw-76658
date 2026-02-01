import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import {
  Palette, Layout, Type, Settings,
  RefreshCw, Check, Wand2, Sparkles, Eye
} from 'lucide-react';
import {
  IDCardCustomization,
  IDCardTemplate,
  ID_CARD_TEMPLATES,
  DEFAULT_CUSTOMIZATION,
  syncWithBrandColors
} from '@/types/id-card-templates';
import { TemplatePreview } from './IDCardRenderer';
import { DesignTemplate, CanvasElement, CanvasBackground, CardDimensions } from '@/types/design-studio';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import QRCode from 'react-qr-code';

interface IDCardCustomizerProps {
  customization: IDCardCustomization;
  onCustomizationChange: (customization: IDCardCustomization) => void;
  brandColors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
  onSave?: () => void;
  isSaving?: boolean;
  selectedStudioXTemplate?: DesignTemplate | null;
  onStudioXTemplateChange?: (template: DesignTemplate | null) => void;
  studioXPreviewData?: Record<string, any>;
}

// Studio X Template Preview Component
const StudioXPreview: React.FC<{
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

export const IDCardCustomizer: React.FC<IDCardCustomizerProps> = ({
  customization,
  onCustomizationChange,
  brandColors,
  onSave,
  isSaving = false,
  selectedStudioXTemplate,
  onStudioXTemplateChange,
  studioXPreviewData = {},
}) => {
  const [activeTab, setActiveTab] = useState('templates');
  const [studioXTemplates, setStudioXTemplates] = useState<DesignTemplate[]>([]);
  const [isLoadingStudioX, setIsLoadingStudioX] = useState(true);
  const [previewStudioXTemplate, setPreviewStudioXTemplate] = useState<DesignTemplate | null>(null);

  const selectedTemplate = ID_CARD_TEMPLATES.find(t => t.id === customization.templateId);

  // Fetch Studio X templates
  useEffect(() => {
    const fetchStudioXTemplates = async () => {
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

        setStudioXTemplates(mappedTemplates);
      } catch (error: any) {
        console.error('Error fetching Studio X templates:', error);
      } finally {
        setIsLoadingStudioX(false);
      }
    };

    fetchStudioXTemplates();
  }, []);

  const handleSelectStudioXTemplate = async (template: DesignTemplate) => {
    if (!onStudioXTemplateChange) return;
    
    try {
      await supabase
        .from('custom_id_templates')
        .update({ use_count: (template.use_count || 0) + 1 })
        .eq('id', template.id);
    } catch (error) {
      console.error('Error updating use count:', error);
    }

    onStudioXTemplateChange(template);
    setPreviewStudioXTemplate(null);
    toast({ title: 'Studio X template applied!', description: `"${template.name}" is now active.` });
  };

  const handleClearStudioXTemplate = () => {
    if (onStudioXTemplateChange) {
      onStudioXTemplateChange(null);
      toast({ title: 'Template cleared', description: 'Using standard template.' });
    }
  };

  // Sample preview data for Studio X templates
  const samplePreviewData = {
    company_logo_url: studioXPreviewData.company_logo_url || '',
    avatar_url: studioXPreviewData.avatar_url || '',
    display_name: studioXPreviewData.display_name || 'Alex Johnson',
    job_title: studioXPreviewData.job_title || 'Product Designer',
    employee_display_id: studioXPreviewData.employee_display_id || 'EMP-2024',
    department: studioXPreviewData.department || 'Design Team',
    email: studioXPreviewData.email || 'alex@company.com',
    phone: studioXPreviewData.phone || '+1 555 123 4567',
    vanity_url: studioXPreviewData.vanity_url || 'https://patra.app/alex',
  };

  const updateCustomization = (updates: Partial<IDCardCustomization>) => {
    onCustomizationChange({ ...customization, ...updates });
  };

  const updateColors = (colorUpdates: Partial<IDCardCustomization['colors']>) => {
    updateCustomization({
      colors: { ...customization.colors, ...colorUpdates },
    });
  };

  const updateLayout = (layoutUpdates: Partial<IDCardCustomization['layout']>) => {
    updateCustomization({
      layout: { ...customization.layout, ...layoutUpdates },
    });
  };

  const updateTypography = (typographyUpdates: Partial<IDCardCustomization['typography']>) => {
    updateCustomization({
      typography: { ...customization.typography, ...typographyUpdates },
    });
  };

  const updateOptions = (optionUpdates: Partial<IDCardCustomization['options']>) => {
    updateCustomization({
      options: { ...customization.options, ...optionUpdates },
    });
  };

  const handleTemplateSelect = (template: IDCardTemplate) => {
    updateCustomization({
      templateId: template.id,
      colors: template.defaultColors,
    });
  };

  const handleSyncBrandColors = () => {
    if (brandColors) {
      onCustomizationChange(syncWithBrandColors(customization, brandColors));
    }
  };

  const handleResetToDefault = () => {
    const template = selectedTemplate || ID_CARD_TEMPLATES[0];
    updateCustomization({
      colors: template.defaultColors,
      layout: DEFAULT_CUSTOMIZATION.layout,
      typography: DEFAULT_CUSTOMIZATION.typography,
      options: DEFAULT_CUSTOMIZATION.options,
    });
  };

  return (
    <Card className="shadow-md border-none">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">ID Card Design Studio</CardTitle>
            <CardDescription>Customize your corporate ID cards with templates and brand colors</CardDescription>
          </div>
          {brandColors && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSyncBrandColors}
              className="gap-2"
            >
              <Wand2 className="w-4 h-4" />
              Sync Brand Colors
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="templates" className="gap-2">
              <Layout className="w-4 h-4" />
              <span className="hidden sm:inline">Templates</span>
            </TabsTrigger>
            <TabsTrigger value="studiox" className="gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Studio X</span>
            </TabsTrigger>
            <TabsTrigger value="colors" className="gap-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Colors</span>
            </TabsTrigger>
            <TabsTrigger value="layout" className="gap-2">
              <Type className="w-4 h-4" />
              <span className="hidden sm:inline">Layout</span>
            </TabsTrigger>
            <TabsTrigger value="options" className="gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Options</span>
            </TabsTrigger>
          </TabsList>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {ID_CARD_TEMPLATES.map((template) => (
                <TemplatePreview
                  key={template.id}
                  template={template}
                  isSelected={customization.templateId === template.id && !selectedStudioXTemplate}
                  onClick={() => {
                    handleTemplateSelect(template);
                    // Clear Studio X template when selecting a standard template
                    if (onStudioXTemplateChange) onStudioXTemplateChange(null);
                  }}
                  customization={customization}
                />
              ))}
            </div>

            {selectedTemplate && (
              <div className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-slate-900">{selectedTemplate.name}</h4>
                    <p className="text-sm text-slate-600">{selectedTemplate.description}</p>
                  </div>
                  <Badge variant="secondary" className="capitalize">
                    {selectedTemplate.category}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {selectedTemplate.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-xs bg-white rounded-full text-slate-600 border border-slate-200"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Studio X Tab */}
          <TabsContent value="studiox" className="space-y-6">
            {isLoadingStudioX ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="aspect-[1.6] rounded-xl" />
                ))}
              </div>
            ) : studioXTemplates.length === 0 ? (
              <div className="text-center py-12 bg-muted/30 rounded-xl">
                <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Studio X Templates</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  No community templates available yet. Create your own in the Design Studio!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Currently selected Studio X template */}
                {selectedStudioXTemplate && (
                  <div className="p-4 bg-primary/5 rounded-xl border-2 border-primary/20">
                    <div className="flex items-center gap-4">
                      <StudioXPreview
                        elements={selectedStudioXTemplate.elements}
                        background={selectedStudioXTemplate.background}
                        dimensions={selectedStudioXTemplate.card_dimensions}
                        previewData={samplePreviewData}
                        scale={0.35}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Check className="w-4 h-4 text-primary" />
                          <span className="font-medium text-sm text-primary">Active Template</span>
                        </div>
                        <h4 className="font-semibold">{selectedStudioXTemplate.name}</h4>
                        <p className="text-xs text-muted-foreground">{selectedStudioXTemplate.description}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleClearStudioXTemplate}>
                        Clear
                      </Button>
                    </div>
                  </div>
                )}

                {/* Template grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {studioXTemplates.map((template) => (
                    <div
                      key={template.id}
                      className={`relative group cursor-pointer rounded-xl overflow-hidden border-2 transition-all hover:ring-2 hover:ring-primary ${
                        selectedStudioXTemplate?.id === template.id 
                          ? 'border-primary ring-2 ring-primary' 
                          : 'border-muted hover:border-primary/50'
                      }`}
                      onClick={() => setPreviewStudioXTemplate(template)}
                    >
                      {/* Template preview */}
                      <div className="p-3 bg-muted/30 flex items-center justify-center">
                        <StudioXPreview
                          elements={template.elements}
                          background={template.background}
                          dimensions={template.card_dimensions}
                          previewData={samplePreviewData}
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
                      {selectedStudioXTemplate?.id === template.id && (
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
          </TabsContent>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Primary Color */}
              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="flex gap-2">
                  <div
                    className="w-12 h-10 rounded-lg border-2 border-slate-200 cursor-pointer"
                    style={{ backgroundColor: customization.colors.primary }}
                  />
                  <Input
                    type="text"
                    value={customization.colors.primary}
                    onChange={(e) => updateColors({ primary: e.target.value })}
                    className="font-mono"
                  />
                  <input
                    type="color"
                    value={customization.colors.primary}
                    onChange={(e) => updateColors({ primary: e.target.value })}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Secondary Color */}
              <div className="space-y-2">
                <Label>Secondary Color</Label>
                <div className="flex gap-2">
                  <div
                    className="w-12 h-10 rounded-lg border-2 border-slate-200"
                    style={{ backgroundColor: customization.colors.secondary }}
                  />
                  <Input
                    type="text"
                    value={customization.colors.secondary}
                    onChange={(e) => updateColors({ secondary: e.target.value })}
                    className="font-mono"
                  />
                  <input
                    type="color"
                    value={customization.colors.secondary}
                    onChange={(e) => updateColors({ secondary: e.target.value })}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Background Color */}
              <div className="space-y-2">
                <Label>Background Color</Label>
                <div className="flex gap-2">
                  <div
                    className="w-12 h-10 rounded-lg border-2 border-slate-200"
                    style={{ backgroundColor: customization.colors.background }}
                  />
                  <Input
                    type="text"
                    value={customization.colors.background}
                    onChange={(e) => updateColors({ background: e.target.value })}
                    className="font-mono"
                  />
                  <input
                    type="color"
                    value={customization.colors.background}
                    onChange={(e) => updateColors({ background: e.target.value })}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Text Color */}
              <div className="space-y-2">
                <Label>Text Color</Label>
                <div className="flex gap-2">
                  <div
                    className="w-12 h-10 rounded-lg border-2 border-slate-200"
                    style={{ backgroundColor: customization.colors.text }}
                  />
                  <Input
                    type="text"
                    value={customization.colors.text}
                    onChange={(e) => updateColors({ text: e.target.value })}
                    className="font-mono"
                  />
                  <input
                    type="color"
                    value={customization.colors.text}
                    onChange={(e) => updateColors({ text: e.target.value })}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Accent Color */}
              <div className="space-y-2 sm:col-span-2">
                <Label>Accent Color</Label>
                <div className="flex gap-2">
                  <div
                    className="w-12 h-10 rounded-lg border-2 border-slate-200"
                    style={{ backgroundColor: customization.colors.accent }}
                  />
                  <Input
                    type="text"
                    value={customization.colors.accent}
                    onChange={(e) => updateColors({ accent: e.target.value })}
                    className="font-mono flex-1"
                  />
                  <input
                    type="color"
                    value={customization.colors.accent}
                    onChange={(e) => updateColors({ accent: e.target.value })}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Reset Colors */}
            <Button variant="outline" onClick={handleResetToDefault} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Reset to Template Default
            </Button>
          </TabsContent>

          {/* Layout Tab */}
          <TabsContent value="layout" className="space-y-6">
            {/* Photo Size */}
            <div className="space-y-3">
              <Label>Photo Size</Label>
              <div className="flex gap-2">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <Button
                    key={size}
                    variant={customization.layout.photoSize === size ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateLayout({ photoSize: size })}
                    className="capitalize"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Photo Shape */}
            <div className="space-y-3">
              <Label>Photo Shape</Label>
              <div className="flex gap-2">
                {(['circle', 'square', 'rounded'] as const).map((shape) => (
                  <Button
                    key={shape}
                    variant={customization.layout.photoShape === shape ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateLayout({ photoShape: shape })}
                    className="capitalize"
                  >
                    {shape}
                  </Button>
                ))}
              </div>
            </div>

            {/* Toggle Options */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="font-medium text-slate-900">Show Pattern</p>
                  <p className="text-sm text-slate-500">Display decorative patterns on the card</p>
                </div>
                <Switch
                  checked={customization.layout.showPattern}
                  onCheckedChange={(checked) => updateLayout({ showPattern: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="font-medium text-slate-900">Show Company Logo</p>
                  <p className="text-sm text-slate-500">Display your company logo on cards</p>
                </div>
                <Switch
                  checked={customization.layout.showCompanyLogo}
                  onCheckedChange={(checked) => updateLayout({ showCompanyLogo: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="font-medium text-slate-900">Show QR Code</p>
                  <p className="text-sm text-slate-500">Display QR code on the back of the card</p>
                </div>
                <Switch
                  checked={customization.layout.showQRCode}
                  onCheckedChange={(checked) => updateLayout({ showQRCode: checked })}
                />
              </div>
            </div>
          </TabsContent>

          {/* Options Tab */}
          <TabsContent value="options" className="space-y-6">
            {/* Typography */}
            <div className="space-y-4">
              <h4 className="font-medium text-slate-900">Typography</h4>

              <div className="space-y-3">
                <Label>Font Family</Label>
                <div className="flex flex-wrap gap-2">
                  {(['inter', 'poppins', 'playfair', 'roboto', 'montserrat'] as const).map((font) => (
                    <Button
                      key={font}
                      variant={customization.typography.fontFamily === font ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateTypography({ fontFamily: font })}
                      className="capitalize"
                    >
                      {font}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Name Font Size</Label>
                <div className="flex gap-2">
                  {(['small', 'medium', 'large'] as const).map((size) => (
                    <Button
                      key={size}
                      variant={customization.typography.nameFontSize === size ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateTypography({ nameFontSize: size })}
                      className="capitalize"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Options */}
            <div className="space-y-4">
              <h4 className="font-medium text-slate-900">Additional Options</h4>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="font-medium text-slate-900">Show Role Badge</p>
                  <p className="text-sm text-slate-500">Display a custom badge/role on the card</p>
                </div>
                <Switch
                  checked={customization.options.showBadge}
                  onCheckedChange={(checked) => updateOptions({ showBadge: checked })}
                />
              </div>

              {customization.options.showBadge && (
                <div className="space-y-2 pl-4 border-l-2 border-indigo-200">
                  <Label>Badge Text</Label>
                  <Input
                    value={customization.options.badgeText}
                    onChange={(e) => updateOptions({ badgeText: e.target.value })}
                    placeholder="e.g., Speaker, VIP, Organizer"
                  />
                </div>
              )}

              <div className="space-y-3">
                <Label>Card Material Effect</Label>
                <div className="flex gap-2">
                  {(['matte', 'glossy', 'metallic'] as const).map((material) => (
                    <Button
                      key={material}
                      variant={customization.options.cardMaterial === material ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateOptions({ cardMaterial: material })}
                      className="capitalize"
                    >
                      {material}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        {onSave && (
          <div className="flex gap-3 pt-6 mt-6 border-t border-slate-100">
            <Button
              onClick={onSave}
              disabled={isSaving}
              className="bg-indigo-600 hover:bg-indigo-700 px-8"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Save Card Design
                </>
              )}
            </Button>
            <Button variant="outline" onClick={handleResetToDefault}>
              Reset All
            </Button>
          </div>
        )}
      </CardContent>

      {/* Studio X Preview Modal */}
      <Dialog open={!!previewStudioXTemplate} onOpenChange={() => setPreviewStudioXTemplate(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{previewStudioXTemplate?.name}</DialogTitle>
            <DialogDescription>
              {previewStudioXTemplate?.description || 'Preview this template before applying it to staff cards.'}
            </DialogDescription>
          </DialogHeader>
          
          {previewStudioXTemplate && (
            <div className="flex flex-col items-center py-4">
              <StudioXPreview
                elements={previewStudioXTemplate.elements}
                background={previewStudioXTemplate.background}
                dimensions={previewStudioXTemplate.card_dimensions}
                previewData={samplePreviewData}
                scale={0.9}
              />
              
              <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                <Eye className="w-4 h-4" />
                <span>Used {previewStudioXTemplate.use_count || 0} times</span>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewStudioXTemplate(null)}>
              Cancel
            </Button>
            <Button onClick={() => previewStudioXTemplate && handleSelectStudioXTemplate(previewStudioXTemplate)}>
              <Check className="w-4 h-4 mr-2" />
              Apply Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
