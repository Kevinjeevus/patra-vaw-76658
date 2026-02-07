import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CanvasElement, FONT_FAMILIES } from '@/types/design-studio';
import { 
  AlignLeft, AlignCenter, AlignRight, Bold, Lock, Unlock, 
  Trash2, Copy, EyeOff, Eye, ChevronUp, ChevronDown 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ElementPropertiesProps {
  element: CanvasElement | null;
  onUpdate: (updates: Partial<CanvasElement>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onBringForward: () => void;
  onSendBackward: () => void;
}

export const ElementProperties: React.FC<ElementPropertiesProps> = ({
  element,
  onUpdate,
  onDelete,
  onDuplicate,
  onBringForward,
  onSendBackward,
}) => {
  if (!element) {
    return (
      <Card className="h-full">
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-sm font-medium">Properties</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-40 text-muted-foreground text-sm">
          Select an element to edit
        </CardContent>
      </Card>
    );
  }

  const updateStyle = (styleUpdates: Partial<CanvasElement['style']>) => {
    onUpdate({ style: { ...element.style, ...styleUpdates } });
  };

  const isTextElement = ['name', 'designation', 'employee_id', 'department', 'email', 'phone', 'custom_text'].includes(element.type);

  return (
    <Card className="h-full">
      <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">{element.label}</CardTitle>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onUpdate({ visible: !element.visible })}
            title={element.visible ? 'Hide' : 'Show'}
          >
            {element.visible !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onUpdate({ locked: !element.locked })}
            title={element.locked ? 'Unlock' : 'Lock'}
          >
            {element.locked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-400px)]">
          <div className="px-4 pb-4 space-y-4">
            {/* Position & Size */}
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                Position & Size
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">X</Label>
                  <Input
                    type="number"
                    value={element.x}
                    onChange={(e) => onUpdate({ x: parseInt(e.target.value) || 0 })}
                    className="h-8 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs">Y</Label>
                  <Input
                    type="number"
                    value={element.y}
                    onChange={(e) => onUpdate({ y: parseInt(e.target.value) || 0 })}
                    className="h-8 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs">Width</Label>
                  <Input
                    type="number"
                    value={element.width}
                    onChange={(e) => onUpdate({ width: parseInt(e.target.value) || 10 })}
                    className="h-8 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs">Height</Label>
                  <Input
                    type="number"
                    value={element.height}
                    onChange={(e) => onUpdate({ height: parseInt(e.target.value) || 10 })}
                    className="h-8 text-xs"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Text Properties */}
            {isTextElement && (
              <>
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                    Typography
                  </h4>
                  
                  {element.type === 'custom_text' && (
                    <div className="mb-2">
                      <Label className="text-xs">Text Content</Label>
                      <Input
                        value={element.content || ''}
                        onChange={(e) => onUpdate({ content: e.target.value })}
                        className="h-8 text-xs"
                        placeholder="Enter text..."
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <div>
                      <Label className="text-xs">Font Family</Label>
                      <Select
                        value={element.style.fontFamily || 'Inter'}
                        onValueChange={(value) => updateStyle({ fontFamily: value })}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {FONT_FAMILIES.map((font) => (
                            <SelectItem key={font.value} value={font.value}>
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">Font Size</Label>
                        <Input
                          type="number"
                          value={element.style.fontSize || 14}
                          onChange={(e) => updateStyle({ fontSize: parseInt(e.target.value) || 14 })}
                          className="h-8 text-xs"
                          min={8}
                          max={72}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Weight</Label>
                        <Select
                          value={element.style.fontWeight || 'normal'}
                          onValueChange={(value: any) => updateStyle({ fontWeight: value })}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="semibold">Semibold</SelectItem>
                            <SelectItem value="bold">Bold</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs">Text Align</Label>
                      <div className="flex gap-1 mt-1">
                        {(['left', 'center', 'right'] as const).map((align) => (
                          <Button
                            key={align}
                            variant={element.style.textAlign === align ? 'default' : 'outline'}
                            size="sm"
                            className="flex-1 h-8"
                            onClick={() => updateStyle({ textAlign: align })}
                          >
                            {align === 'left' && <AlignLeft className="w-4 h-4" />}
                            {align === 'center' && <AlignCenter className="w-4 h-4" />}
                            {align === 'right' && <AlignRight className="w-4 h-4" />}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs">Text Color</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          type="color"
                          value={element.style.color || '#1e293b'}
                          onChange={(e) => updateStyle({ color: e.target.value })}
                          className="h-8 w-12 p-1 cursor-pointer"
                        />
                        <Input
                          type="text"
                          value={element.style.color || '#1e293b'}
                          onChange={(e) => updateStyle({ color: e.target.value })}
                          className="h-8 text-xs flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Appearance */}
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                Appearance
              </h4>
              <div className="space-y-2">
            {element.type === 'qr_code' && (
                  <div>
                    <Label className="text-xs">QR Code Content</Label>
                    <Select
                      value={element.qrContentType || 'url'}
                      onValueChange={(value: 'url' | 'employee_id') => onUpdate({ qrContentType: value })}
                    >
                      <SelectTrigger className="h-8 text-xs mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="url">Profile URL</SelectItem>
                        <SelectItem value="employee_id">Employee ID</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {element.qrContentType === 'employee_id' ? 'QR will encode the employee ID' : 'QR will encode the profile URL'}
                    </p>
                  </div>
                )}

                {(element.type === 'shape' || element.type === 'divider' || element.type === 'qr_code') && (
                  <div>
                    <Label className="text-xs">Background Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type="color"
                        value={element.style.backgroundColor || '#3b82f6'}
                        onChange={(e) => updateStyle({ backgroundColor: e.target.value })}
                        className="h-8 w-12 p-1 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={element.style.backgroundColor || '#3b82f6'}
                        onChange={(e) => updateStyle({ backgroundColor: e.target.value })}
                        className="h-8 text-xs flex-1"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-xs">Border Radius</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Slider
                      value={[element.style.borderRadius || 0]}
                      onValueChange={([value]) => updateStyle({ borderRadius: value })}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-xs w-8 text-right">{element.style.borderRadius || 0}</span>
                  </div>
                </div>

                {element.type === 'shape' && (
                  <div>
                    <Label className="text-xs">Opacity</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Slider
                        value={[(element.style.opacity || 1) * 100]}
                        onValueChange={([value]) => updateStyle({ opacity: value / 100 })}
                        max={100}
                        step={5}
                        className="flex-1"
                      />
                      <span className="text-xs w-8 text-right">{Math.round((element.style.opacity || 1) * 100)}%</span>
                    </div>
                  </div>
                )}

                {(element.type === 'profile_photo' || element.type === 'company_logo') && (
                  <div>
                    <Label className="text-xs">Border</Label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <Input
                        type="number"
                        value={element.style.borderWidth || 0}
                        onChange={(e) => updateStyle({ borderWidth: parseInt(e.target.value) || 0 })}
                        className="h-8 text-xs"
                        placeholder="Width"
                        min={0}
                        max={10}
                      />
                      <Input
                        type="color"
                        value={element.style.borderColor || '#3b82f6'}
                        onChange={(e) => updateStyle({ borderColor: e.target.value })}
                        className="h-8 p-1 cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Layer Actions */}
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                Layer
              </h4>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" className="flex-1 h-8" onClick={onBringForward}>
                  <ChevronUp className="w-3 h-3 mr-1" />
                  <span className="text-xs">Forward</span>
                </Button>
                <Button variant="outline" size="sm" className="flex-1 h-8" onClick={onSendBackward}>
                  <ChevronDown className="w-3 h-3 mr-1" />
                  <span className="text-xs">Back</span>
                </Button>
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={onDuplicate}>
                <Copy className="w-3 h-3 mr-1" />
                Duplicate
              </Button>
              <Button variant="destructive" size="sm" className="flex-1" onClick={onDelete}>
                <Trash2 className="w-3 h-3 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
