import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { CanvasBackground, CardDimensions, DEFAULT_CARD_DIMENSIONS, VERTICAL_CARD_DIMENSIONS, CARD_SIZE_PRESETS } from '@/types/design-studio';
import { Upload, Image as ImageIcon, Palette, Sparkles, Grid3X3 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface BackgroundSettingsProps {
  background: CanvasBackground;
  dimensions: CardDimensions;
  onUpdateBackground: (bg: CanvasBackground) => void;
  onUpdateDimensions: (dim: CardDimensions) => void;
}

const GRADIENT_PRESETS = [
  { name: 'Ocean', value: '#667eea', secondary: '#764ba2', direction: '135deg' },
  { name: 'Sunset', value: '#f093fb', secondary: '#f5576c', direction: '135deg' },
  { name: 'Forest', value: '#11998e', secondary: '#38ef7d', direction: '135deg' },
  { name: 'Night', value: '#0f0c29', secondary: '#302b63', direction: '135deg' },
  { name: 'Fire', value: '#f12711', secondary: '#f5af19', direction: '135deg' },
  { name: 'Arctic', value: '#00c6ff', secondary: '#0072ff', direction: '135deg' },
  { name: 'Royal', value: '#141e30', secondary: '#243b55', direction: '135deg' },
  { name: 'Mint', value: '#00b09b', secondary: '#96c93d', direction: '135deg' },
];

const COLOR_PRESETS = [
  '#ffffff', '#f8fafc', '#f1f5f9', '#e2e8f0', 
  '#1e293b', '#0f172a', '#020617', '#000000',
  '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af',
  '#10b981', '#059669', '#047857', '#065f46',
  '#f59e0b', '#d97706', '#b45309', '#92400e',
  '#ef4444', '#dc2626', '#b91c1c', '#991b1b',
  '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6',
  '#ec4899', '#db2777', '#be185d', '#9d174d',
];

const PATTERN_TYPES = [
  { value: 'dots', label: 'Dots' },
  { value: 'grid', label: 'Grid' },
  { value: 'diagonal', label: 'Diagonal' },
  { value: 'crosshatch', label: 'Crosshatch' },
];

export const BackgroundSettings: React.FC<BackgroundSettingsProps> = ({
  background,
  dimensions,
  onUpdateBackground,
  onUpdateDimensions,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/id-backgrounds/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);
      onUpdateBackground({ ...background, type: 'image', value: publicUrl });
      toast({ title: 'Background uploaded!' });
    } catch (error: any) {
      toast({ title: 'Upload failed', description: error.message, variant: 'destructive' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="h-full border-0 rounded-none">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-sm font-medium">Background & Size</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-400px)]">
          <div className="px-4 pb-4 space-y-4">
            {/* Card Size Presets */}
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Card Size</Label>
              <Select onValueChange={(val) => {
                const preset = CARD_SIZE_PRESETS.find(p => p.name === val);
                if (preset && preset.name !== 'Custom') {
                  onUpdateDimensions({
                    width: preset.width,
                    height: preset.height,
                    orientation: preset.width > preset.height ? 'horizontal' : 'vertical',
                    unit: 'px',
                  });
                }
              }}>
                <SelectTrigger className="h-8 text-xs mt-1">
                  <SelectValue placeholder="Select preset..." />
                </SelectTrigger>
                <SelectContent>
                  {CARD_SIZE_PRESETS.map(p => (
                    <SelectItem key={p.name} value={p.name}>
                      {p.name} <span className="text-muted-foreground">({p.description})</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Card Orientation */}
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Orientation</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  variant={dimensions.orientation === 'horizontal' ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1"
                  onClick={() => onUpdateDimensions(DEFAULT_CARD_DIMENSIONS)}
                >
                  Horizontal
                </Button>
                <Button
                  variant={dimensions.orientation === 'vertical' ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1"
                  onClick={() => onUpdateDimensions(VERTICAL_CARD_DIMENSIONS)}
                >
                  Vertical
                </Button>
              </div>
            </div>

            {/* Custom Dimensions */}
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Custom Dimensions</Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div>
                  <Label className="text-[10px]">Width (px)</Label>
                  <Input
                    type="number"
                    value={dimensions.width}
                    onChange={(e) => onUpdateDimensions({ ...dimensions, width: parseInt(e.target.value) || 100 })}
                    className="h-7 text-xs"
                    min={100}
                    max={1000}
                  />
                </div>
                <div>
                  <Label className="text-[10px]">Height (px)</Label>
                  <Input
                    type="number"
                    value={dimensions.height}
                    onChange={(e) => onUpdateDimensions({ ...dimensions, height: parseInt(e.target.value) || 100 })}
                    className="h-7 text-xs"
                    min={100}
                    max={1000}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Background Type Tabs */}
            <Tabs defaultValue="color" className="w-full">
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="color" className="text-[10px]">
                  <Palette className="w-3 h-3 mr-0.5" />
                  Color
                </TabsTrigger>
                <TabsTrigger value="gradient" className="text-[10px]">
                  <Sparkles className="w-3 h-3 mr-0.5" />
                  Gradient
                </TabsTrigger>
                <TabsTrigger value="image" className="text-[10px]">
                  <ImageIcon className="w-3 h-3 mr-0.5" />
                  Image
                </TabsTrigger>
                <TabsTrigger value="pattern" className="text-[10px]">
                  <Grid3X3 className="w-3 h-3 mr-0.5" />
                  Pattern
                </TabsTrigger>
              </TabsList>

              <TabsContent value="color" className="mt-3 space-y-3">
                <div>
                  <Label className="text-xs">Pick Color</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="color"
                      value={background.type === 'color' ? background.value : '#ffffff'}
                      onChange={(e) => onUpdateBackground({ type: 'color', value: e.target.value })}
                      className="h-10 w-14 p-1 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={background.type === 'color' ? background.value : '#ffffff'}
                      onChange={(e) => onUpdateBackground({ type: 'color', value: e.target.value })}
                      className="flex-1"
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Presets</Label>
                  <div className="grid grid-cols-8 gap-1 mt-1">
                    {COLOR_PRESETS.map((color) => (
                      <button
                        key={color}
                        className="w-full aspect-square rounded border border-border hover:ring-2 hover:ring-primary transition-all"
                        style={{ backgroundColor: color }}
                        onClick={() => onUpdateBackground({ type: 'color', value: color })}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="gradient" className="mt-3 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Start</Label>
                    <Input
                      type="color"
                      value={background.value || '#667eea'}
                      onChange={(e) => onUpdateBackground({ 
                        type: 'gradient', value: e.target.value,
                        secondaryValue: background.secondaryValue || '#764ba2',
                        gradientDirection: background.gradientDirection || '135deg',
                      })}
                      className="h-10 w-full p-1 cursor-pointer"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">End</Label>
                    <Input
                      type="color"
                      value={background.secondaryValue || '#764ba2'}
                      onChange={(e) => onUpdateBackground({ 
                        type: 'gradient', value: background.value || '#667eea',
                        secondaryValue: e.target.value,
                        gradientDirection: background.gradientDirection || '135deg',
                      })}
                      className="h-10 w-full p-1 cursor-pointer"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Direction</Label>
                  <Select
                    value={background.gradientDirection || '135deg'}
                    onValueChange={(val) => onUpdateBackground({ ...background, type: 'gradient', gradientDirection: val })}
                  >
                    <SelectTrigger className="h-8 text-xs mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {['0deg', '45deg', '90deg', '135deg', '180deg', '225deg', '270deg', '315deg'].map(d => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Presets</Label>
                  <div className="grid grid-cols-4 gap-2 mt-1">
                    {GRADIENT_PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        className="h-10 rounded border border-border hover:ring-2 hover:ring-primary transition-all text-xs text-white font-medium"
                        style={{ background: `linear-gradient(${preset.direction}, ${preset.value}, ${preset.secondary})` }}
                        onClick={() => onUpdateBackground({ 
                          type: 'gradient', value: preset.value,
                          secondaryValue: preset.secondary, gradientDirection: preset.direction,
                        })}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="image" className="mt-3 space-y-3">
                <div>
                  <Label className="text-xs">Upload Image</Label>
                  <div className="mt-1">
                    <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                      <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                      <span className="text-xs text-muted-foreground">{isUploading ? 'Uploading...' : 'Click to upload'}</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                    </label>
                  </div>
                </div>
                {background.type === 'image' && background.value && (
                  <>
                    <div>
                      <Label className="text-xs">Current Background</Label>
                      <div className="mt-1 relative rounded-lg overflow-hidden aspect-video">
                        <img src={background.value} alt="Background" className="w-full h-full object-cover" />
                        <Button variant="secondary" size="sm" className="absolute bottom-2 right-2"
                          onClick={() => onUpdateBackground({ type: 'color', value: '#ffffff' })}>
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label className="text-[10px]">Blur</Label>
                      <Slider
                        value={[background.blur || 0]}
                        onValueChange={([v]) => onUpdateBackground({ ...background, blur: v })}
                        max={20}
                        step={1}
                        className="mt-1"
                      />
                    </div>
                  </>
                )}
                <div>
                  <Label className="text-xs">Or enter URL</Label>
                  <Input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    className="mt-1"
                    onChange={(e) => { if (e.target.value) onUpdateBackground({ type: 'image', value: e.target.value }); }}
                  />
                </div>
              </TabsContent>

              <TabsContent value="pattern" className="mt-3 space-y-3">
                <div>
                  <Label className="text-xs">Base Color</Label>
                  <Input
                    type="color"
                    value={background.value || '#f8fafc'}
                    onChange={(e) => onUpdateBackground({ ...background, type: 'pattern', value: e.target.value })}
                    className="h-10 w-full p-1 cursor-pointer mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Pattern Type</Label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {PATTERN_TYPES.map(pt => (
                      <Button
                        key={pt.value}
                        variant={background.patternType === pt.value ? 'default' : 'outline'}
                        size="sm"
                        className="text-xs"
                        onClick={() => onUpdateBackground({ ...background, type: 'pattern', patternType: pt.value })}
                      >
                        {pt.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Separator />

            {/* Overlay */}
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Overlay Color</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  type="color"
                  value={background.overlayColor || '#000000'}
                  onChange={(e) => onUpdateBackground({ ...background, overlayColor: e.target.value })}
                  className="h-8 w-12 p-1 cursor-pointer"
                />
                <Input
                  type="text"
                  value={background.overlayColor || ''}
                  onChange={(e) => onUpdateBackground({ ...background, overlayColor: e.target.value || undefined })}
                  className="h-8 text-xs flex-1"
                  placeholder="None"
                />
                {background.overlayColor && (
                  <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => onUpdateBackground({ ...background, overlayColor: undefined })}>
                    Clear
                  </Button>
                )}
              </div>
              {background.overlayColor && (
                <div className="mt-2">
                  <Label className="text-[10px]">Overlay Opacity</Label>
                  <Slider
                    value={[(background.opacity || 0.3) * 100]}
                    onValueChange={([v]) => onUpdateBackground({ ...background, opacity: v / 100 })}
                    max={100}
                    step={5}
                    className="mt-1"
                  />
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
