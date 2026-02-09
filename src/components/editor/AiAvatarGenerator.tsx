import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sparkles, Loader2, Check, ChevronDown, Wand2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const PRESET_PROMPTS = [
  { label: '🎨 Artistic Portrait', prompt: 'A colorful artistic portrait with abstract brush strokes and vibrant colors, professional headshot style' },
  { label: '🌌 Futuristic Neon', prompt: 'A futuristic cyberpunk-style portrait with neon lights, glowing edges, and a dark tech background' },
  { label: '📸 Studio Professional', prompt: 'A clean studio-quality professional headshot with soft lighting, neutral background, corporate look' },
  { label: '🎮 3D Avatar', prompt: 'A stylized 3D cartoon avatar, Pixar-style rendering, friendly expression, clean background' },
  { label: '✏️ Pencil Sketch', prompt: 'A detailed pencil sketch portrait, black and white, artistic hand-drawn style' },
  { label: '🌿 Natural Outdoors', prompt: 'A professional portrait with a natural outdoor background, warm golden hour lighting, bokeh effect' },
  { label: '🏢 Corporate Minimal', prompt: 'A minimalist corporate headshot with a solid gradient background, sharp professional attire' },
  { label: '🎭 Pop Art', prompt: 'A bold pop art style portrait inspired by Andy Warhol, vivid colors, halftone dots' },
];

interface AiAvatarGeneratorProps {
  userId: string;
  currentName: string;
  onImageGenerated: (imageUrl: string) => void;
  baseImageUrl?: string | null;
}

export const AiAvatarGenerator: React.FC<AiAvatarGeneratorProps> = ({
  userId,
  currentName,
  onImageGenerated,
  baseImageUrl
}) => {
  const [customPrompt, setCustomPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [showPresets, setShowPresets] = useState(false);

  const handleGenerate = async (prompt: string) => {
    if (!prompt.trim()) {
      toast({ title: "Enter a prompt", description: "Describe how you want your profile image to look.", variant: "destructive" });
      return;
    }

    setGenerating(true);
    setGeneratedUrl(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-avatar', {
        body: { prompt, userId, baseImageUrl },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setGeneratedUrl(data.imageUrl);
      toast({ title: "Image generated!", description: "Preview your AI-generated avatar below." });
    } catch (err: any) {
      console.error('AI avatar generation error:', err);
      toast({ title: "Generation failed", description: err.message || "Something went wrong", variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const handleApply = () => {
    if (generatedUrl) {
      onImageGenerated(generatedUrl);
      toast({ title: "Avatar applied!", description: "Your AI-generated avatar is now set." });
    }
  };

  return (
    <div className="space-y-4">
      {/* Pre-written Prompts */}
      <div>
        <button
          onClick={() => setShowPresets(!showPresets)}
          className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors w-full"
        >
          <Wand2 className="w-4 h-4" />
          <span>Quick Styles</span>
          <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${showPresets ? 'rotate-180' : ''}`} />
        </button>

        {showPresets && (
          <div className="grid grid-cols-2 gap-2 mt-3">
            {PRESET_PROMPTS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  setCustomPrompt(preset.prompt);
                  handleGenerate(preset.prompt);
                }}
                disabled={generating}
                className="text-left text-xs p-2.5 rounded-lg border border-border bg-card hover:bg-accent/50 hover:border-primary/30 transition-all disabled:opacity-50"
              >
                {preset.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Custom Prompt */}
      <div>
        <Label className="text-xs font-medium">Custom Prompt</Label>
        <Textarea
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="Describe your ideal profile image... e.g., 'A professional headshot with a blue gradient background and soft studio lighting'"
          className="mt-1 text-sm min-h-[80px]"
          disabled={generating}
        />
      </div>

      <Button
        onClick={() => handleGenerate(customPrompt)}
        disabled={generating || !customPrompt.trim()}
        className="w-full gap-2"
      >
        {generating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Generate with AI
          </>
        )}
      </Button>

      {/* Generated Preview */}
      {generatedUrl && (
        <div className="flex flex-col items-center gap-3 p-4 rounded-lg border border-primary/20 bg-primary/5 animate-fade-in">
          <p className="text-xs font-medium text-muted-foreground">AI Generated Preview</p>
          <Avatar className="w-32 h-32 border-4 border-primary/30 shadow-lg">
            <AvatarImage src={generatedUrl} />
            <AvatarFallback className="text-2xl">
              {currentName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'AI'}
            </AvatarFallback>
          </Avatar>
          <Button onClick={handleApply} className="gap-2" size="sm">
            <Check className="w-4 h-4" />
            Use This Image
          </Button>
        </div>
      )}
    </div>
  );
};
