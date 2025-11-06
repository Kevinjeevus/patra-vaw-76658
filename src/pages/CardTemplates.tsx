import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface BackgroundTemplate {
  id: string;
  name: string;
  thumbnail: string;
  backgroundColor: string;
  backgroundPattern: 'none' | 'dots' | 'grid' | 'waves';
  backgroundImage?: string;
}

const templates: BackgroundTemplate[] = [
  {
    id: 'classic-dark',
    name: 'Classic Dark',
    thumbnail: '/templates/minimal.png',
    backgroundColor: '#1e293b',
    backgroundPattern: 'none',
  },
  {
    id: 'blue-gradient',
    name: 'Blue Gradient',
    thumbnail: '/templates/modern.png',
    backgroundColor: '#1e40af',
    backgroundPattern: 'none',
  },
  {
    id: 'purple-dots',
    name: 'Purple Dots',
    thumbnail: '/templates/creative.png',
    backgroundColor: '#7c3aed',
    backgroundPattern: 'dots',
  },
  {
    id: 'green-grid',
    name: 'Green Grid',
    thumbnail: '/templates/magazine.png',
    backgroundColor: '#059669',
    backgroundPattern: 'grid',
  },
  {
    id: 'red-waves',
    name: 'Red Waves',
    thumbnail: '/templates/bento.png',
    backgroundColor: '#dc2626',
    backgroundPattern: 'waves',
  },
  {
    id: 'navy-dots',
    name: 'Navy Dots',
    thumbnail: '/templates/classic.png',
    backgroundColor: '#1e3a8a',
    backgroundPattern: 'dots',
  },
  {
    id: 'teal-solid',
    name: 'Teal Solid',
    thumbnail: '/templates/minimal.png',
    backgroundColor: '#0d9488',
    backgroundPattern: 'none',
  },
  {
    id: 'orange-grid',
    name: 'Orange Grid',
    thumbnail: '/templates/modern.png',
    backgroundColor: '#ea580c',
    backgroundPattern: 'grid',
  },
];

export const CardTemplates: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [cardData, setCardData] = useState<any>(null);

  useEffect(() => {
    if (user) {
      fetchCardData();
    }
  }, [user]);

  const fetchCardData = async () => {
    try {
      const { data, error } = await supabase
        .from('digital_cards')
        .select('*')
        .eq('owner_user_id', user?.id)
        .single();

      if (error) throw error;
      
      if (data) {
        setCardData(data);
      }
    } catch (error) {
      console.error('Error fetching card:', error);
      toast({
        title: 'Error',
        description: 'Failed to load card data.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApplyTemplate = async (template: BackgroundTemplate) => {
    if (!cardData) return;
    
    setSaving(true);
    setSelectedTemplate(template.id);
    
    try {
      const currentContent = cardData.content_json || {};
      const currentConfig = currentContent.cardConfig || {};
      
      const { error } = await supabase
        .from('digital_cards')
        .update({
          content_json: {
            ...currentContent,
            cardConfig: {
              ...currentConfig,
              backgroundColor: template.backgroundColor,
              backgroundPattern: template.backgroundPattern,
              backgroundImage: template.backgroundImage || '',
            },
          },
          updated_at: new Date().toISOString(),
        })
        .eq('id', cardData.id);

      if (error) throw error;

      toast({
        title: 'Template Applied!',
        description: `"${template.name}" has been applied to your card.`,
      });

      // Refresh card data
      await fetchCardData();
    } catch (error: any) {
      console.error('Error applying template:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to apply template.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
      setSelectedTemplate(null);
    }
  };

  const getPatternPreview = (pattern: 'none' | 'dots' | 'grid' | 'waves', bgColor: string) => {
    const patterns: Record<string, React.CSSProperties> = {
      none: { backgroundColor: bgColor },
      dots: {
        backgroundColor: bgColor,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      },
      grid: {
        backgroundColor: bgColor,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      },
      waves: {
        backgroundColor: bgColor,
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
      },
    };

    return patterns[pattern] || patterns.none;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading templates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Background Templates</h1>
                <p className="text-sm text-muted-foreground">
                  Choose a pre-designed background for your card
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-muted-foreground">
            Select a template below to instantly update your card's background. Your content will remain unchanged.
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => handleApplyTemplate(template)}
            >
              {/* Template Preview */}
              <div
                className="h-40 flex items-center justify-center relative"
                style={getPatternPreview(template.backgroundPattern, template.backgroundColor)}
              >
                {saving && selectedTemplate === template.id && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                )}
                <div className="text-white text-center">
                  <div className="text-4xl font-bold mb-2">Aa</div>
                  <div className="text-sm opacity-80">Preview</div>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-4 bg-card">
                <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground capitalize">
                    {template.backgroundPattern === 'none' ? 'Solid' : template.backgroundPattern}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApplyTemplate(template);
                    }}
                    disabled={saving && selectedTemplate === template.id}
                  >
                    {saving && selectedTemplate === template.id ? (
                      'Applying...'
                    ) : (
                      <>
                        <Check className="w-3 h-3 mr-1" />
                        Apply
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Card */}
        <Card className="mt-8 p-6 bg-muted">
          <h3 className="font-semibold mb-3">Need more control?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            These templates provide quick styling options. If you need to customize layout and position elements, use the advanced Card Editor.
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate('/card-editor')}
            >
              Go to Basic Editor
            </Button>
            <Button
              onClick={() => navigate('/card-editor-new')}
            >
              Go to Advanced Editor
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
