import React, { useState, useEffect } from 'react';
import { CardData } from './types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    Palette,
    LayoutGrid,
    ArrowRight,
    ArrowDown,
    ArrowDownRight,
    ArrowUpRight,
    Plus,
    Trash2,
    Upload,
    Image as ImageIcon,
    Grid3X3,
    Waves,
    MoreHorizontal,
    Maximize
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface ThemeSelectorProps {
    cardData: CardData;
    setCardData: (data: CardData) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ cardData, setCardData }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState(cardData.bannerType || 'gradient');

    // Sync active tab with cardData
    useEffect(() => {
        if (cardData.bannerType) {
            setActiveTab(cardData.bannerType);
        }
    }, [cardData.bannerType]);

    const handleTabChange = (val: string) => {
        setActiveTab(val);
        // Set default values when switching tabs if empty
        let newValue = cardData.bannerValue;

        if (val === 'gradient' && (!newValue || !newValue.includes('#'))) {
            newValue = 'to bottom right|#3b82f6,#8b5cf6';
        } else if (val === 'pattern' && (!newValue || newValue.includes('#') && !newValue.includes('|'))) {
            newValue = 'dots|hsl(var(--primary) / 0.3)|transparent';
        } else if (val === 'color' && (!newValue || newValue.includes('|'))) {
            newValue = '#3b82f6';
        }

        setCardData({
            ...cardData,
            bannerType: val as any,
            bannerValue: newValue
        });
    };

    // --- Gradient Helpers ---
    const getGradientState = () => {
        const val = cardData.bannerValue || 'to bottom right|#3b82f6,#8b5cf6';
        const parts = val.includes('|') ? val.split('|') : ['to bottom right', val];
        return {
            direction: parts[0],
            colors: (parts[1] || '').split(',').filter(Boolean)
        };
    };

    const updateGradient = (direction: string, colors: string[]) => {
        setCardData({
            ...cardData,
            bannerType: 'gradient',
            bannerValue: `${direction}|${colors.join(',')}`
        });
    };

    // --- Pattern Helpers ---
    const getPatternState = () => {
        const val = cardData.bannerValue || 'dots|hsl(var(--primary) / 0.3)|transparent';
        const parts = val.includes('|') ? val.split('|') : [val, 'hsl(var(--primary) / 0.3)', 'transparent'];
        return {
            pattern: parts[0],
            fg: parts[1] || 'hsl(var(--primary) / 0.3)',
            bg: parts[2] || 'transparent'
        };
    };

    const updatePattern = (pattern: string, fg: string, bg: string) => {
        setCardData({
            ...cardData,
            bannerType: 'pattern',
            bannerValue: `${pattern}|${fg}|${bg}`
        });
    };

    const gradientState = getGradientState();
    const patternState = getPatternState();

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-bold mb-2">Design</h2>
                <p className="text-muted-foreground text-sm mb-6">
                    Customize your profile banner and appearance
                </p>
            </div>

            {/* Template Browse Button */}
            <div className="p-4 border border-border rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 transition-colors">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <h3 className="font-semibold">Template Gallery</h3>
                        <p className="text-sm text-muted-foreground">
                            Browse professional designs
                        </p>
                    </div>
                    <div className="p-2 bg-background rounded-lg shadow-sm">
                        <Palette className="w-5 h-5 text-primary" />
                    </div>
                </div>
                <Button
                    onClick={() => navigate('/templates')}
                    className="w-full"
                    variant="outline"
                >
                    <LayoutGrid className="w-4 h-4 mr-2" />
                    Browse Templates
                </Button>
            </div>

            {/* Banner Customization */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">Banner Style</h3>
                </div>

                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                    <TabsList className="grid w-full grid-cols-5 mb-6">
                        <TabsTrigger value="gradient" className="text-xs">Gradient</TabsTrigger>
                        <TabsTrigger value="pattern" className="text-xs">Pattern</TabsTrigger>
                        <TabsTrigger value="color" className="text-xs">Color</TabsTrigger>
                        <TabsTrigger value="image" className="text-xs">Image</TabsTrigger>
                        <TabsTrigger value="blurred" className="text-xs">Blur</TabsTrigger>
                    </TabsList>

                    {/* GRADIENT TAB */}
                    <TabsContent value="gradient" className="space-y-6">
                        <div className="space-y-4 p-4 border border-border rounded-xl bg-card">
                            <div className="space-y-3">
                                <Label>Direction</Label>
                                <div className="flex gap-2">
                                    {[
                                        { val: 'to right', icon: ArrowRight, label: 'Right' },
                                        { val: 'to bottom', icon: ArrowDown, label: 'Down' },
                                        { val: 'to bottom right', icon: ArrowDownRight, label: 'Diagonal' },
                                        { val: 'to top right', icon: ArrowUpRight, label: 'Up Right' },
                                    ].map((dir) => (
                                        <Button
                                            key={dir.val}
                                            variant={gradientState.direction === dir.val ? 'default' : 'outline'}
                                            size="icon"
                                            onClick={() => updateGradient(dir.val, gradientState.colors)}
                                            className="w-10 h-10"
                                            title={dir.label}
                                        >
                                            <dir.icon className="w-4 h-4" />
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label>Colors</Label>
                                    <span className="text-xs text-muted-foreground">{gradientState.colors.length} / 4</span>
                                </div>
                                <div className="space-y-3">
                                    {gradientState.colors.map((color, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="relative flex-1">
                                                <Input
                                                    type="color"
                                                    value={color}
                                                    onChange={(e) => {
                                                        const newColors = [...gradientState.colors];
                                                        newColors[index] = e.target.value;
                                                        updateGradient(gradientState.direction, newColors);
                                                    }}
                                                    className="w-full h-10 p-1 cursor-pointer"
                                                />
                                            </div>
                                            {gradientState.colors.length > 2 && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => {
                                                        const newColors = gradientState.colors.filter((_, i) => i !== index);
                                                        updateGradient(gradientState.direction, newColors);
                                                    }}
                                                    className="text-muted-foreground hover:text-destructive"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {gradientState.colors.length < 4 && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => updateGradient(gradientState.direction, [...gradientState.colors, '#ffffff'])}
                                        className="w-full border-dashed"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Color
                                    </Button>
                                )}
                            </div>
                        </div>
                    </TabsContent>

                    {/* PATTERN TAB */}
                    <TabsContent value="pattern" className="space-y-6">
                        <div className="space-y-4 p-4 border border-border rounded-xl bg-card">
                            <div className="space-y-3">
                                <Label>Pattern Style</Label>
                                <div className="grid grid-cols-4 gap-2">
                                    {[
                                        { id: 'dots', icon: Grid3X3, label: 'Dots' },
                                        { id: 'lines', icon: MoreHorizontal, label: 'Lines' },
                                        { id: 'waves', icon: Waves, label: 'Waves' },
                                        { id: 'grid', icon: LayoutGrid, label: 'Grid' },
                                        { id: 'checker', icon: Maximize, label: 'Check' },
                                    ].map((pat) => (
                                        <button
                                            key={pat.id}
                                            onClick={() => updatePattern(pat.id, patternState.fg, patternState.bg)}
                                            className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${patternState.pattern === pat.id
                                                    ? 'border-primary bg-primary/5 text-primary'
                                                    : 'border-border hover:bg-muted text-muted-foreground'
                                                }`}
                                        >
                                            <pat.icon className="w-5 h-5 mb-1" />
                                            <span className="text-[10px] font-medium">{pat.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-xs">Pattern Color</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            type="color"
                                            value={patternState.fg.startsWith('hsl') ? '#000000' : patternState.fg}
                                            onChange={(e) => updatePattern(patternState.pattern, e.target.value, patternState.bg)}
                                            className="h-9 w-full p-1 cursor-pointer"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs">Background</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            type="color"
                                            value={patternState.bg === 'transparent' ? '#ffffff' : patternState.bg}
                                            onChange={(e) => updatePattern(patternState.pattern, patternState.fg, e.target.value)}
                                            className="h-9 w-full p-1 cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* COLOR TAB */}
                    <TabsContent value="color" className="space-y-6">
                        <div className="space-y-4 p-4 border border-border rounded-xl bg-card">
                            <div className="space-y-3">
                                <Label>Solid Color</Label>
                                <div className="grid grid-cols-6 gap-2 mb-2">
                                    {['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#06b6d4', '#6366f1', '#1e293b', '#000000', '#ffffff', '#94a3b8'].map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setCardData({ ...cardData, bannerType: 'color', bannerValue: color })}
                                            className={`w-full aspect-square rounded-full border shadow-sm transition-transform hover:scale-110 ${cardData.bannerValue === color ? 'ring-2 ring-primary ring-offset-2' : ''
                                                }`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                                <Input
                                    type="color"
                                    value={cardData.bannerValue && !cardData.bannerValue.includes('|') ? cardData.bannerValue : '#3b82f6'}
                                    onChange={(e) => setCardData({ ...cardData, bannerType: 'color', bannerValue: e.target.value })}
                                    className="w-full h-12 p-1 cursor-pointer"
                                />
                            </div>
                        </div>
                    </TabsContent>

                    {/* IMAGE TAB */}
                    <TabsContent value="image" className="space-y-6">
                        <div className="space-y-4 p-4 border border-border rounded-xl bg-card">
                            <div className="space-y-4">
                                {cardData.bannerValue && !cardData.bannerValue.includes('|') && (
                                    <div className="relative w-full aspect-video rounded-lg border overflow-hidden bg-muted">
                                        <img
                                            src={cardData.bannerValue}
                                            alt="Banner"
                                            className="w-full h-full object-cover"
                                        />
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 h-8 w-8 rounded-full"
                                            onClick={() => setCardData({ ...cardData, bannerValue: '' })}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                )}

                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="banner-upload">Upload Image</Label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            id="banner-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;

                                                try {
                                                    const fileExt = file.name.split('.').pop();
                                                    const fileName = `${user?.id}-banner-${Date.now()}.${fileExt}`;
                                                    const filePath = `${user?.id}/${fileName}`;

                                                    const { error: uploadError } = await supabase.storage
                                                        .from('avatars')
                                                        .upload(filePath, file);

                                                    if (uploadError) throw uploadError;

                                                    const { data: { publicUrl } } = supabase.storage
                                                        .from('avatars')
                                                        .getPublicUrl(filePath);

                                                    setCardData({ ...cardData, bannerType: 'image', bannerValue: publicUrl });

                                                    toast({
                                                        title: 'Success',
                                                        description: 'Banner image uploaded!',
                                                    });
                                                } catch (error: any) {
                                                    toast({
                                                        title: 'Error',
                                                        description: error.message,
                                                        variant: 'destructive',
                                                    });
                                                }
                                            }}
                                            className="cursor-pointer"
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Recommended size: 1200x400px. Max 5MB.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* BLURRED TAB */}
                    <TabsContent value="blurred" className="space-y-6">
                        <div className="space-y-4 p-6 border border-border rounded-xl bg-card text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                                <ImageIcon className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Blurred Profile Photo</h3>
                                <p className="text-sm text-muted-foreground">
                                    Automatically uses your profile photo as a blurred background for a sleek, modern look.
                                </p>
                            </div>
                            <div className="pt-2">
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                    Auto-generated
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};
