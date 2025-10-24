import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Sparkles, RefreshCw, Save } from 'lucide-react';

interface OGMetaEditorProps {
  userId: string;
}

export const OGMetaEditor: React.FC<OGMetaEditorProps> = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [cardId, setCardId] = useState<string | null>(null);
  const [customTitle, setCustomTitle] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [autoGenerate, setAutoGenerate] = useState(true);
  const [aiDescription, setAiDescription] = useState('');

  useEffect(() => {
    fetchCardData();
  }, [userId]);

  const fetchCardData = async () => {
    try {
      const { data, error } = await supabase
        .from('digital_cards')
        .select('id, custom_og_title, custom_og_description, og_auto_generate, og_description')
        .eq('owner_user_id', userId)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      if (data) {
        setCardId(data.id);
        setCustomTitle(data.custom_og_title || '');
        setCustomDescription(data.custom_og_description || '');
        setAutoGenerate(data.og_auto_generate ?? true);
        setAiDescription(data.og_description || '');
      }
    } catch (error: any) {
      console.error('Error fetching card data:', error);
    }
  };

  const handleSave = async () => {
    if (!cardId) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('digital_cards')
        .update({
          custom_og_title: customTitle || null,
          custom_og_description: customDescription || null,
          og_auto_generate: autoGenerate
        })
        .eq('id', cardId);

      if (error) throw error;

      toast({
        title: "Saved",
        description: "Open Graph settings updated successfully"
      });
    } catch (error: any) {
      console.error('Error saving OG settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerateAI = async () => {
    if (!cardId) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-og-description', {
        body: { cardId }
      });

      if (error) throw error;

      toast({
        title: "Generated",
        description: "New AI description generated successfully"
      });

      // Refresh to show new AI description
      await fetchCardData();
    } catch (error: any) {
      console.error('Error generating description:', error);
      toast({
        title: "Error",
        description: "Failed to generate description",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-border/50 shadow-lg shadow-black/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Open Graph Meta Tags
        </CardTitle>
        <CardDescription>
          Control how your profile appears when shared on social media
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Auto-generate toggle */}
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div className="space-y-1">
            <Label className="text-sm font-medium">Auto-generate descriptions</Label>
            <p className="text-xs text-muted-foreground">
              Generate a fresh AI description on each share
            </p>
          </div>
          <Switch
            checked={autoGenerate}
            onCheckedChange={setAutoGenerate}
          />
        </div>

        {/* Current AI Description */}
        {aiDescription && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Current AI Description</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRegenerateAI}
                disabled={loading}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground border border-border/50">
              {aiDescription}
            </div>
          </div>
        )}

        {/* Custom overrides */}
        <div className="space-y-4 pt-4 border-t border-border/50">
          <div className="space-y-2">
            <Label htmlFor="og-title" className="text-sm font-medium">
              Custom Title (Optional)
            </Label>
            <Input
              id="og-title"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="Leave empty to use your name"
              maxLength={60}
            />
            <p className="text-xs text-muted-foreground">
              {customTitle.length}/60 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="og-description" className="text-sm font-medium">
              Custom Description (Optional)
            </Label>
            <Textarea
              id="og-description"
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
              placeholder="Leave empty to use AI-generated description"
              maxLength={200}
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              {customDescription.length}/200 characters
            </p>
          </div>

          <p className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
            💡 Custom values override AI-generated content. Leave empty to use AI descriptions.
          </p>
        </div>

        <Button
          onClick={handleSave}
          disabled={loading}
          className="w-full"
        >
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Saving...' : 'Save Settings'}
        </Button>
      </CardContent>
    </Card>
  );
};
