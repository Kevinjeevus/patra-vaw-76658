import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, Layout, Type, Settings, 
  RefreshCw, Check, Wand2
} from 'lucide-react';
import { 
  IDCardCustomization, 
  IDCardTemplate, 
  ID_CARD_TEMPLATES, 
  DEFAULT_CUSTOMIZATION,
  syncWithBrandColors 
} from '@/types/id-card-templates';
import { TemplatePreview } from './IDCardRenderer';

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
}

export const IDCardCustomizer: React.FC<IDCardCustomizerProps> = ({
  customization,
  onCustomizationChange,
  brandColors,
  onSave,
  isSaving = false,
}) => {
  const [activeTab, setActiveTab] = useState('templates');

  const selectedTemplate = ID_CARD_TEMPLATES.find(t => t.id === customization.templateId);

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
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="templates" className="gap-2">
              <Layout className="w-4 h-4" />
              <span className="hidden sm:inline">Templates</span>
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
                  isSelected={customization.templateId === template.id}
                  onClick={() => handleTemplateSelect(template)}
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
                  <p className="font-medium text-slate-900">Show Verified Badge</p>
                  <p className="text-sm text-slate-500">Display company verification badge</p>
                </div>
                <Switch
                  checked={customization.options.showVerifiedIcon}
                  onCheckedChange={(checked) => updateOptions({ showVerifiedIcon: checked })}
                />
              </div>

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
    </Card>
  );
};
