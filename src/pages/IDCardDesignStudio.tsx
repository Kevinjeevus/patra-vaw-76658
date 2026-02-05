import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  DesignCanvas, 
  ElementToolbox, 
  ElementProperties, 
  BackgroundSettings,
  TemplateGallery 
} from '@/components/design-studio';
import { 
  CanvasElement, 
  CanvasBackground, 
  CardDimensions,
  ElementType,
  DEFAULT_ELEMENTS,
  DEFAULT_CARD_DIMENSIONS,
  DesignTemplate
} from '@/types/design-studio';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { 
  Save, Download, Upload, Undo, Redo, ZoomIn, ZoomOut, 
  LayoutGrid, Eye, ArrowLeft, Globe, Lock, Sparkles, FlipHorizontal
} from 'lucide-react';

type CardSide = 'front' | 'back';

interface CardSideData {
  elements: CanvasElement[];
  background: CanvasBackground;
}

const IDCardDesignStudio: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Current side being edited
  const [activeSide, setActiveSide] = useState<CardSide>('front');
  
  // Separate state for front and back
  const [frontData, setFrontData] = useState<CardSideData>({
    elements: [],
    background: { type: 'color', value: '#ffffff' },
  });
  const [backData, setBackData] = useState<CardSideData>({
    elements: [],
    background: { type: 'color', value: '#f8fafc' },
  });
  
  const [dimensions, setDimensions] = useState<CardDimensions>(DEFAULT_CARD_DIMENSIONS);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [scale, setScale] = useState(1.5);
  
  // Template state
  const [templateName, setTemplateName] = useState('Untitled Design');
  const [templateDescription, setTemplateDescription] = useState('');
  const [currentTemplateId, setCurrentTemplateId] = useState<string | null>(null);
  
  // UI state
  const [isSaving, setIsSaving] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [activeTab, setActiveTab] = useState('elements');
  
  // Get current side data
  const currentSideData = activeSide === 'front' ? frontData : backData;
  const setCurrentSideData = activeSide === 'front' ? setFrontData : setBackData;
  
  // Convenience accessors
  const elements = currentSideData.elements;
  const background = currentSideData.background;
  
  // Preview data (sample data for preview)
  const [previewData] = useState({
    company_logo_url: '',
    avatar_url: '',
    display_name: 'John Doe',
    job_title: 'Software Engineer',
    employee_display_id: 'EMP-001',
    department: 'Engineering',
    email: 'john.doe@company.com',
    phone: '+1 234 567 890',
    vanity_url: 'https://patra.app/johndoe',
  });

  // Get selected element
  const selectedElement = elements.find(el => el.id === selectedElementId) || null;

  // Clear selection when switching sides
  const handleSideChange = (side: CardSide) => {
    setSelectedElementId(null);
    setActiveSide(side);
  };

  // Add element
  const handleAddElement = useCallback((type: ElementType) => {
    const defaultConfig = DEFAULT_ELEMENTS[type];
    if (!defaultConfig) return;

    const newElement: CanvasElement = {
      ...defaultConfig,
      id: `${type}-${Date.now()}`,
      zIndex: elements.length + 1,
      visible: true,
      locked: false,
    } as CanvasElement;

    setCurrentSideData(prev => ({
      ...prev,
      elements: [...prev.elements, newElement],
    }));
    setSelectedElementId(newElement.id);
    toast({ title: `${defaultConfig.label} added to ${activeSide}` });
  }, [elements.length, activeSide, setCurrentSideData]);

  // Update element
  const handleUpdateElement = useCallback((id: string, updates: Partial<CanvasElement>) => {
    setCurrentSideData(prev => ({
      ...prev,
      elements: prev.elements.map(el => el.id === id ? { ...el, ...updates } : el),
    }));
  }, [setCurrentSideData]);

  // Update background
  const handleUpdateBackground = useCallback((bg: CanvasBackground) => {
    setCurrentSideData(prev => ({
      ...prev,
      background: bg,
    }));
  }, [setCurrentSideData]);

  // Delete element
  const handleDeleteElement = useCallback(() => {
    if (!selectedElementId) return;
    setCurrentSideData(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== selectedElementId),
    }));
    setSelectedElementId(null);
    toast({ title: 'Element deleted' });
  }, [selectedElementId, setCurrentSideData]);

  // Duplicate element
  const handleDuplicateElement = useCallback(() => {
    if (!selectedElement) return;
    const newElement: CanvasElement = {
      ...selectedElement,
      id: `${selectedElement.type}-${Date.now()}`,
      x: selectedElement.x + 20,
      y: selectedElement.y + 20,
      zIndex: elements.length + 1,
    };
    setCurrentSideData(prev => ({
      ...prev,
      elements: [...prev.elements, newElement],
    }));
    setSelectedElementId(newElement.id);
    toast({ title: 'Element duplicated' });
  }, [selectedElement, elements.length, setCurrentSideData]);

  // Layer operations
  const handleBringForward = useCallback(() => {
    if (!selectedElement) return;
    const maxZ = Math.max(...elements.map(el => el.zIndex));
    if (selectedElement.zIndex < maxZ) {
      handleUpdateElement(selectedElement.id, { zIndex: selectedElement.zIndex + 1 });
    }
  }, [selectedElement, elements, handleUpdateElement]);

  const handleSendBackward = useCallback(() => {
    if (!selectedElement) return;
    if (selectedElement.zIndex > 1) {
      handleUpdateElement(selectedElement.id, { zIndex: selectedElement.zIndex - 1 });
    }
  }, [selectedElement, handleUpdateElement]);

  // Save template (saves both front and back)
  const handleSave = async () => {
    if (!user) {
      toast({ title: 'Please log in to save', variant: 'destructive' });
      return;
    }

    setIsSaving(true);
    try {
      const templateData = {
        name: templateName,
        description: templateDescription,
        elements: JSON.parse(JSON.stringify(frontData.elements)),
        background: JSON.parse(JSON.stringify(frontData.background)),
        card_dimensions: JSON.parse(JSON.stringify(dimensions)),
        canvas_config: {
          back_elements: JSON.parse(JSON.stringify(backData.elements)),
          back_background: JSON.parse(JSON.stringify(backData.background)),
        },
        is_published: false,
        is_public: false,
        created_by: user.id,
      };

      if (currentTemplateId) {
        // Update existing
        const { error } = await supabase
          .from('custom_id_templates')
          .update(templateData)
          .eq('id', currentTemplateId);

        if (error) throw error;
        toast({ title: 'Design saved!' });
      } else {
        // Create new
        const { data, error } = await supabase
          .from('custom_id_templates')
          .insert(templateData)
          .select()
          .single();

        if (error) throw error;
        setCurrentTemplateId(data.id);
        toast({ title: 'Design saved!' });
      }
    } catch (error: any) {
      toast({ title: 'Failed to save', description: error.message, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };
  // Publish template
  const handlePublish = async () => {
    if (!user || !currentTemplateId) {
      toast({ title: 'Please save your design first', variant: 'destructive' });
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('custom_id_templates')
        .update({ 
          is_published: true, 
          is_public: isPublic,
          name: templateName,
          description: templateDescription,
        })
        .eq('id', currentTemplateId);

      if (error) throw error;
      
      setShowPublishDialog(false);
      toast({ 
        title: 'Design published!', 
        description: isPublic ? 'Others can now use your template.' : 'Only you can see this template.',
      });
    } catch (error: any) {
      toast({ title: 'Failed to publish', description: error.message, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  // Use template from gallery
  const handleUseTemplate = (template: DesignTemplate) => {
    // Load front side data
    setFrontData({
      elements: template.elements || [],
      background: template.background || { type: 'color', value: '#ffffff' },
    });
    
    // Load back side data from canvas_config if available
    const canvasConfig = template.canvas_config as { back_elements?: CanvasElement[]; back_background?: CanvasBackground } | null;
    setBackData({
      elements: canvasConfig?.back_elements || [],
      background: canvasConfig?.back_background || { type: 'color', value: '#f8fafc' },
    });
    
    setDimensions(template.card_dimensions || DEFAULT_CARD_DIMENSIONS);
    setTemplateName(`${template.name} (Copy)`);
    setTemplateDescription(template.description || '');
    setCurrentTemplateId(null); // This is a new copy
    setActiveTab('elements');
    setActiveSide('front');
    toast({ title: 'Template loaded!', description: 'Customize it as you like.' });
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-card px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <Input
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="h-8 text-lg font-semibold border-none bg-transparent focus-visible:ring-1 px-0"
              placeholder="Untitled Design"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center gap-1 mr-4 bg-muted rounded-md p-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7"
              onClick={() => setScale(Math.max(0.5, scale - 0.25))}
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </Button>
            <span className="text-xs w-12 text-center">{Math.round(scale * 100)}%</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7"
              onClick={() => setScale(Math.min(3, scale + 0.25))}
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </Button>
          </div>

          <Button variant="outline" size="sm" onClick={handleSave} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
          
          <Button size="sm" onClick={() => setShowPublishDialog(true)}>
            <Globe className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 border-r bg-card flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="mx-2 mt-2 grid grid-cols-3">
              <TabsTrigger value="elements" className="text-xs">Elements</TabsTrigger>
              <TabsTrigger value="background" className="text-xs">Background</TabsTrigger>
              <TabsTrigger value="gallery" className="text-xs">Gallery</TabsTrigger>
            </TabsList>
            
            <TabsContent value="elements" className="flex-1 m-0">
              <ElementToolbox 
                onAddElement={handleAddElement}
                existingElements={elements.map(el => el.type)}
              />
            </TabsContent>
            
            <TabsContent value="background" className="flex-1 m-0">
              <BackgroundSettings
                background={background}
                dimensions={dimensions}
                onUpdateBackground={handleUpdateBackground}
                onUpdateDimensions={setDimensions}
              />
            </TabsContent>
            
            <TabsContent value="gallery" className="flex-1 m-0 p-4 overflow-auto">
              <TemplateGallery onUseTemplate={handleUseTemplate} />
            </TabsContent>
          </Tabs>
        </aside>

        {/* Canvas Area */}
        <main className="flex-1 overflow-auto flex flex-col">
          {/* Side Toggle */}
          <div className="flex items-center justify-center gap-2 py-3 border-b bg-muted/30">
            <span className="text-xs text-muted-foreground mr-2">Editing:</span>
            <div className="flex items-center gap-1 bg-background rounded-lg p-1 border">
              <Button
                variant={activeSide === 'front' ? 'default' : 'ghost'}
                size="sm"
                className="h-7 text-xs"
                onClick={() => handleSideChange('front')}
              >
                Front
              </Button>
              <Button
                variant={activeSide === 'back' ? 'default' : 'ghost'}
                size="sm"
                className="h-7 text-xs"
                onClick={() => handleSideChange('back')}
              >
                Back
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 ml-2"
              onClick={() => handleSideChange(activeSide === 'front' ? 'back' : 'front')}
              title="Flip card"
            >
              <FlipHorizontal className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-auto">
            <DesignCanvas
              elements={elements}
              background={background}
              dimensions={dimensions}
              selectedElementId={selectedElementId}
              onSelectElement={setSelectedElementId}
              onUpdateElement={handleUpdateElement}
              previewData={previewData}
              scale={scale}
            />
          </div>
        </main>

        {/* Right Sidebar - Properties */}
        <aside className="w-72 border-l bg-card">
          <ElementProperties
            element={selectedElement}
            onUpdate={(updates) => selectedElement && handleUpdateElement(selectedElement.id, updates)}
            onDelete={handleDeleteElement}
            onDuplicate={handleDuplicateElement}
            onBringForward={handleBringForward}
            onSendBackward={handleSendBackward}
          />
        </aside>
      </div>

      {/* Publish Dialog */}
      <Dialog open={showPublishDialog} onOpenChange={setShowPublishDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Publish Template
            </DialogTitle>
            <DialogDescription>
              Share your design with others or keep it private.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label>Template Name</Label>
              <Input 
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea 
                value={templateDescription}
                onChange={(e) => setTemplateDescription(e.target.value)}
                placeholder="Describe your template..."
                className="mt-1"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isPublic ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                <div>
                  <Label>Make Public</Label>
                  <p className="text-xs text-muted-foreground">
                    {isPublic ? 'Anyone can use this template' : 'Only you can see this'}
                  </p>
                </div>
              </div>
              <Switch checked={isPublic} onCheckedChange={setIsPublic} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPublishDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handlePublish} disabled={isSaving}>
              {isSaving ? 'Publishing...' : 'Publish'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IDCardDesignStudio;
