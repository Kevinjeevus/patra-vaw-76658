import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  DesignCanvas,
  ElementToolbox,
  ElementProperties,
  BackgroundSettings,
  TemplateGallery,
  LayerManager,
  CanvasToolbar,
} from '@/components/design-studio';
import {
  CanvasElement,
  CanvasBackground,
  CardDimensions,
  ElementType,
  DEFAULT_ELEMENTS,
  DEFAULT_CARD_DIMENSIONS,
  CARD_SIZE_PRESETS,
  DesignTemplate,
  DesignSnapshot,
} from '@/types/design-studio';
import { arrayMove } from '@dnd-kit/sortable';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import {
  Save, Download, Upload, ArrowLeft, Globe, Lock, Sparkles, FlipHorizontal,
  Monitor, Smartphone, Printer, FileJson, FileUp
} from 'lucide-react';

type CardSide = 'front' | 'back';

interface CardSideData {
  elements: CanvasElement[];
  background: CanvasBackground;
}

const MAX_UNDO = 50;

const IDCardDesignStudio: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [activeSide, setActiveSide] = useState<CardSide>('front');
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

  // Canvas controls
  const [showGrid, setShowGrid] = useState(false);
  const [showRuler, setShowRuler] = useState(false);
  const [snapToGrid, setSnapToGrid] = useState(true);

  // Undo/Redo
  const [undoStack, setUndoStack] = useState<DesignSnapshot[]>([]);
  const [redoStack, setRedoStack] = useState<DesignSnapshot[]>([]);
  const isUndoRedoRef = useRef(false);

  // Template state
  const [templateName, setTemplateName] = useState('Untitled Design');
  const [templateDescription, setTemplateDescription] = useState('');
  const [currentTemplateId, setCurrentTemplateId] = useState<string | null>(null);

  // UI state
  const [isSaving, setIsSaving] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [activeTab, setActiveTab] = useState('elements');
  const [previewMode, setPreviewMode] = useState<'card' | 'mobile' | 'print' | null>(null);
  const [showExportDialog, setShowExportDialog] = useState(false);

  // Autosave timer
  const autosaveRef = useRef<NodeJS.Timeout | null>(null);

  const currentSideData = activeSide === 'front' ? frontData : backData;
  const setCurrentSideData = activeSide === 'front' ? setFrontData : setBackData;
  const elements = currentSideData.elements;
  const background = currentSideData.background;

  const [previewData, setPreviewData] = useState({
    company_logo_url: '',
    avatar_url: '',
    display_name: 'John Doe',
    job_title: 'Software Engineer',
    employee_display_id: 'EMP-001',
    department: 'Engineering',
    email: 'john.doe@company.com',
    phone: '+1 234 567 890',
    vanity_url: 'https://patra.app/johndoe',
    address: '123 Tech Park, Silicon Valley',
    blood_group: 'O+',
    joining_date: '2024-01-15',
    expiry_date: '2026-01-15',
    signature_url: '',
  });

  const selectedElement = elements.find(el => el.id === selectedElementId) || null;

  // Push current state to undo stack
  const pushUndoState = useCallback(() => {
    if (isUndoRedoRef.current) return;
    const snapshot: DesignSnapshot = {
      elements: JSON.parse(JSON.stringify(currentSideData.elements)),
      background: JSON.parse(JSON.stringify(currentSideData.background)),
    };
    setUndoStack(prev => [...prev.slice(-MAX_UNDO), snapshot]);
    setRedoStack([]);
  }, [currentSideData]);

  const handleUndo = useCallback(() => {
    if (undoStack.length === 0) return;
    isUndoRedoRef.current = true;
    const prev = undoStack[undoStack.length - 1];
    setRedoStack(r => [...r, { elements: JSON.parse(JSON.stringify(elements)), background: JSON.parse(JSON.stringify(background)) }]);
    setUndoStack(u => u.slice(0, -1));
    setCurrentSideData({ elements: prev.elements, background: prev.background });
    setTimeout(() => { isUndoRedoRef.current = false; }, 50);
  }, [undoStack, elements, background, setCurrentSideData]);

  const handleRedo = useCallback(() => {
    if (redoStack.length === 0) return;
    isUndoRedoRef.current = true;
    const next = redoStack[redoStack.length - 1];
    setUndoStack(u => [...u, { elements: JSON.parse(JSON.stringify(elements)), background: JSON.parse(JSON.stringify(background)) }]);
    setRedoStack(r => r.slice(0, -1));
    setCurrentSideData({ elements: next.elements, background: next.background });
    setTimeout(() => { isUndoRedoRef.current = false; }, 50);
  }, [redoStack, elements, background, setCurrentSideData]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z' && !e.shiftKey) { e.preventDefault(); handleUndo(); }
        if (e.key === 'z' && e.shiftKey) { e.preventDefault(); handleRedo(); }
        if (e.key === 'y') { e.preventDefault(); handleRedo(); }
        if (e.key === 'd') { e.preventDefault(); handleDuplicateElement(); }
        if (e.key === 's') { e.preventDefault(); handleSave(); }
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedElementId && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
          e.preventDefault();
          handleDeleteElement();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo, selectedElementId]);

  // Autosave every 30 seconds
  useEffect(() => {
    if (!user || !currentTemplateId) return;
    autosaveRef.current = setInterval(() => {
      handleSave(true);
    }, 30000);
    return () => { if (autosaveRef.current) clearInterval(autosaveRef.current); };
  }, [user, currentTemplateId, frontData, backData]);

  const handleSideChange = (side: CardSide) => {
    setSelectedElementId(null);
    setActiveSide(side);
  };

  const handleAddElement = useCallback((type: ElementType) => {
    pushUndoState();
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
  }, [elements.length, activeSide, setCurrentSideData, pushUndoState]);

  const handleUpdateElement = useCallback((id: string, updates: Partial<CanvasElement>) => {
    pushUndoState();
    setCurrentSideData(prev => ({
      ...prev,
      elements: prev.elements.map(el => el.id === id ? { ...el, ...updates } : el),
    }));
  }, [setCurrentSideData, pushUndoState]);

  const handleUpdateBackground = useCallback((bg: CanvasBackground) => {
    pushUndoState();
    setCurrentSideData(prev => ({ ...prev, background: bg }));
  }, [setCurrentSideData, pushUndoState]);

  const handleDeleteElement = useCallback(() => {
    if (!selectedElementId) return;
    pushUndoState();
    setCurrentSideData(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== selectedElementId),
    }));
    setSelectedElementId(null);
    toast({ title: 'Element deleted' });
  }, [selectedElementId, setCurrentSideData, pushUndoState]);

  const handleDeleteElementById = useCallback((id: string) => {
    pushUndoState();
    setCurrentSideData(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== id),
    }));
    if (selectedElementId === id) setSelectedElementId(null);
  }, [selectedElementId, setCurrentSideData, pushUndoState]);

  const handleDuplicateElement = useCallback(() => {
    if (!selectedElement) return;
    pushUndoState();
    const newElement: CanvasElement = {
      ...selectedElement,
      id: `${selectedElement.type}-${Date.now()}`,
      x: selectedElement.x + 20,
      y: selectedElement.y + 20,
      zIndex: elements.length + 1,
    };
    setCurrentSideData(prev => ({ ...prev, elements: [...prev.elements, newElement] }));
    setSelectedElementId(newElement.id);
    toast({ title: 'Element duplicated' });
  }, [selectedElement, elements.length, setCurrentSideData, pushUndoState]);

  const handleDuplicateById = useCallback((id: string) => {
    const el = elements.find(e => e.id === id);
    if (!el) return;
    pushUndoState();
    const newElement: CanvasElement = {
      ...el,
      id: `${el.type}-${Date.now()}`,
      x: el.x + 20,
      y: el.y + 20,
      zIndex: elements.length + 1,
    };
    setCurrentSideData(prev => ({ ...prev, elements: [...prev.elements, newElement] }));
    setSelectedElementId(newElement.id);
  }, [elements, setCurrentSideData, pushUndoState]);

  // Alignment
  const handleAlignElements = useCallback((alignment: string) => {
    if (!selectedElement) return;
    pushUndoState();
    let updates: Partial<CanvasElement> = {};
    switch (alignment) {
      case 'left': updates = { x: 0 }; break;
      case 'right': updates = { x: dimensions.width - selectedElement.width }; break;
      case 'centerH': updates = { x: (dimensions.width - selectedElement.width) / 2 }; break;
      case 'top': updates = { y: 0 }; break;
      case 'bottom': updates = { y: dimensions.height - selectedElement.height }; break;
      case 'centerV': updates = { y: (dimensions.height - selectedElement.height) / 2 }; break;
    }
    handleUpdateElement(selectedElement.id, updates);
  }, [selectedElement, dimensions, handleUpdateElement, pushUndoState]);

  const handleDistributeElements = useCallback((direction: 'horizontal' | 'vertical') => {
    // Distribute all visible elements evenly
    if (elements.length < 3) return;
    pushUndoState();
    const sorted = [...elements].sort((a, b) => direction === 'horizontal' ? a.x - b.x : a.y - b.y);
    const totalSpace = direction === 'horizontal' ? dimensions.width : dimensions.height;
    const totalElementSize = sorted.reduce((sum, el) => sum + (direction === 'horizontal' ? el.width : el.height), 0);
    const gap = (totalSpace - totalElementSize) / (sorted.length - 1);
    
    let pos = 0;
    sorted.forEach((el, i) => {
      const update = direction === 'horizontal' ? { x: Math.round(pos) } : { y: Math.round(pos) };
      handleUpdateElement(el.id, update);
      pos += (direction === 'horizontal' ? el.width : el.height) + gap;
    });
  }, [elements, dimensions, handleUpdateElement, pushUndoState]);

  // Layer operations
  const normalizeZIndices = useCallback((elements: CanvasElement[]): CanvasElement[] => {
    return [...elements].map((el, index) => ({ ...el, zIndex: index + 1 }));
  }, []);

  const handleReorder = useCallback((id: string, action: 'front' | 'back' | 'forward' | 'backward') => {
    pushUndoState();
    setCurrentSideData(prev => {
      const element = prev.elements.find(el => el.id === id);
      if (!element) return prev;

      let newElements = [...prev.elements].sort((a, b) => a.zIndex - b.zIndex);
      const currentIndex = newElements.findIndex(el => el.id === id);

      switch (action) {
        case 'front':
          newElements.splice(currentIndex, 1);
          newElements.push(element);
          break;
        case 'back':
          newElements.splice(currentIndex, 1);
          newElements.unshift(element);
          break;
        case 'forward':
          if (currentIndex < newElements.length - 1) {
            [newElements[currentIndex], newElements[currentIndex + 1]] = [newElements[currentIndex + 1], newElements[currentIndex]];
          }
          break;
        case 'backward':
          if (currentIndex > 0) {
            [newElements[currentIndex], newElements[currentIndex - 1]] = [newElements[currentIndex - 1], newElements[currentIndex]];
          }
          break;
      }

      return { ...prev, elements: normalizeZIndices(newElements) };
    });
  }, [setCurrentSideData, normalizeZIndices, pushUndoState]);

  const handleBringForward = useCallback(() => { if (selectedElementId) handleReorder(selectedElementId, 'forward'); }, [selectedElementId, handleReorder]);
  const handleSendBackward = useCallback(() => { if (selectedElementId) handleReorder(selectedElementId, 'backward'); }, [selectedElementId, handleReorder]);
  const handleBringToFront = useCallback(() => { if (selectedElementId) handleReorder(selectedElementId, 'front'); }, [selectedElementId, handleReorder]);
  const handleSendToBack = useCallback(() => { if (selectedElementId) handleReorder(selectedElementId, 'back'); }, [selectedElementId, handleReorder]);

  const handleMoveLayer = useCallback((activeId: string, overId: string) => {
    pushUndoState();
    setCurrentSideData(prev => {
      const oldIndex = prev.elements.findIndex(el => el.id === activeId);
      const newIndex = prev.elements.findIndex(el => el.id === overId);
      if (oldIndex === -1 || newIndex === -1) return prev;
      return { ...prev, elements: normalizeZIndices(arrayMove(prev.elements, oldIndex, newIndex)) };
    });
  }, [setCurrentSideData, normalizeZIndices, pushUndoState]);

  // Save
  const handleSave = async (silent = false) => {
    if (!user) {
      if (!silent) toast({ title: 'Please log in to save', variant: 'destructive' });
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
        const { error } = await supabase.from('custom_id_templates').update(templateData).eq('id', currentTemplateId);
        if (error) throw error;
        if (!silent) toast({ title: 'Design saved!' });
      } else {
        const { data, error } = await supabase.from('custom_id_templates').insert(templateData).select().single();
        if (error) throw error;
        setCurrentTemplateId(data.id);
        if (!silent) toast({ title: 'Design saved!' });
      }
    } catch (error: any) {
      if (!silent) toast({ title: 'Failed to save', description: error.message, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!user || !currentTemplateId) {
      toast({ title: 'Please save your design first', variant: 'destructive' });
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase.from('custom_id_templates').update({
        is_published: true,
        is_public: isPublic,
        name: templateName,
        description: templateDescription,
      }).eq('id', currentTemplateId);

      if (error) throw error;
      setShowPublishDialog(false);
      toast({ title: 'Design published!', description: isPublic ? 'Others can now use your template.' : 'Only you can see this.' });
    } catch (error: any) {
      toast({ title: 'Failed to publish', description: error.message, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUseTemplate = (template: DesignTemplate) => {
    setFrontData({
      elements: template.elements || [],
      background: template.background || { type: 'color', value: '#ffffff' },
    });
    const canvasConfig = template.canvas_config as { back_elements?: CanvasElement[]; back_background?: CanvasBackground } | null;
    setBackData({
      elements: canvasConfig?.back_elements || [],
      background: canvasConfig?.back_background || { type: 'color', value: '#f8fafc' },
    });
    setDimensions(template.card_dimensions || DEFAULT_CARD_DIMENSIONS);
    setTemplateName(`${template.name} (Copy)`);
    setTemplateDescription(template.description || '');
    setCurrentTemplateId(null);
    setActiveTab('elements');
    setActiveSide('front');
    setUndoStack([]);
    setRedoStack([]);
    toast({ title: 'Template loaded!' });
  };

  // Export JSON
  const handleExportJSON = () => {
    const data = {
      name: templateName,
      dimensions,
      front: frontData,
      back: backData,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${templateName.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Design exported as JSON' });
  };

  // Import JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (data.front) setFrontData(data.front);
        if (data.back) setBackData(data.back);
        if (data.dimensions) setDimensions(data.dimensions);
        if (data.name) setTemplateName(data.name);
        setCurrentTemplateId(null);
        setUndoStack([]);
        setRedoStack([]);
        toast({ title: 'Design imported!' });
      } catch {
        toast({ title: 'Invalid JSON file', variant: 'destructive' });
      }
    };
    reader.readAsText(file);
  };

  // Card size preset handler
  const handleCardSizePreset = (presetName: string) => {
    const preset = CARD_SIZE_PRESETS.find(p => p.name === presetName);
    if (!preset || preset.name === 'Custom') return;
    setDimensions({
      width: preset.width,
      height: preset.height,
      orientation: preset.width > preset.height ? 'horizontal' : 'vertical',
      unit: 'px',
    });
  };

  const handleFitToScreen = useCallback(() => {
    const maxW = (window.innerWidth - 600) * 0.85;
    const maxH = (window.innerHeight - 200) * 0.85;
    const fitScale = Math.min(maxW / dimensions.width, maxH / dimensions.height);
    setScale(Math.max(0.5, Math.min(3, fitScale)));
  }, [dimensions]);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-card px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Input
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="h-8 text-lg font-semibold border-none bg-transparent focus-visible:ring-1 px-0 w-48"
            placeholder="Untitled Design"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Card size preset */}
          <Select onValueChange={handleCardSizePreset}>
            <SelectTrigger className="h-8 w-36 text-xs">
              <SelectValue placeholder="Card Size" />
            </SelectTrigger>
            <SelectContent>
              {CARD_SIZE_PRESETS.map(p => (
                <SelectItem key={p.name} value={p.name}>
                  <span className="text-xs">{p.name}</span>
                  <span className="text-[10px] text-muted-foreground ml-1">({p.description})</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Import/Export */}
          <div className="relative">
            <input type="file" accept=".json" className="absolute inset-0 w-8 opacity-0 cursor-pointer" onChange={handleImportJSON} />
            <Button variant="ghost" size="icon" className="h-8 w-8" title="Import JSON">
              <FileUp className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleExportJSON} title="Export JSON">
            <FileJson className="w-4 h-4" />
          </Button>

          <Button variant="outline" size="sm" onClick={() => handleSave(false)} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save'}
          </Button>

          <Button size="sm" onClick={() => setShowPublishDialog(true)}>
            <Globe className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </div>
      </header>

      {/* Toolbar */}
      <CanvasToolbar
        selectedElement={selectedElement}
        elements={elements}
        scale={scale}
        showGrid={showGrid}
        showRuler={showRuler}
        snapToGrid={snapToGrid}
        canUndo={undoStack.length > 0}
        canRedo={redoStack.length > 0}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onDuplicate={handleDuplicateElement}
        onDelete={handleDeleteElement}
        onToggleLock={() => selectedElement && handleUpdateElement(selectedElement.id, { locked: !selectedElement.locked })}
        onToggleGrid={() => setShowGrid(!showGrid)}
        onToggleRuler={() => setShowRuler(!showRuler)}
        onToggleSnap={() => setSnapToGrid(!snapToGrid)}
        onZoomIn={() => setScale(Math.min(3, scale + 0.25))}
        onZoomOut={() => setScale(Math.max(0.5, scale - 0.25))}
        onFitToScreen={handleFitToScreen}
        onSetScale={setScale}
        onAlignElements={handleAlignElements}
        onDistributeElements={handleDistributeElements}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 border-r bg-card flex flex-col shrink-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="mx-2 mt-2 grid grid-cols-4">
              <TabsTrigger value="elements" className="px-0 text-[10px]">Elements</TabsTrigger>
              <TabsTrigger value="layers" className="px-0 text-[10px]">Layers</TabsTrigger>
              <TabsTrigger value="background" className="px-0 text-[10px]">Style</TabsTrigger>
              <TabsTrigger value="gallery" className="px-0 text-[10px]">Gallery</TabsTrigger>
            </TabsList>

            <TabsContent value="elements" className="flex-1 m-0">
              <ElementToolbox onAddElement={handleAddElement} existingElements={elements.map(el => el.type)} />
            </TabsContent>

            <TabsContent value="layers" className="flex-1 m-0">
              <LayerManager
                elements={elements}
                selectedElementId={selectedElementId}
                onSelectElement={setSelectedElementId}
                onUpdateElement={handleUpdateElement}
                onReorder={handleReorder}
                onMoveLayer={handleMoveLayer}
                onDuplicate={handleDuplicateById}
                onDelete={handleDeleteElementById}
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
          {/* Side Toggle + Preview modes */}
          <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Editing:</span>
              <div className="flex items-center gap-1 bg-background rounded-lg p-1 border">
                <Button variant={activeSide === 'front' ? 'default' : 'ghost'} size="sm" className="h-7 text-xs" onClick={() => handleSideChange('front')}>
                  Front
                </Button>
                <Button variant={activeSide === 'back' ? 'default' : 'ghost'} size="sm" className="h-7 text-xs" onClick={() => handleSideChange('back')}>
                  Back
                </Button>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleSideChange(activeSide === 'front' ? 'back' : 'front')} title="Flip card">
                <FlipHorizontal className="w-4 h-4" />
              </Button>
            </div>

            {/* Preview Modes */}
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" title="Card Preview">
                <Monitor className="w-3.5 h-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" title="Mobile Preview">
                <Smartphone className="w-3.5 h-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" title="Print Preview">
                <Printer className="w-3.5 h-3.5" />
              </Button>
            </div>
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
              showGrid={showGrid}
              showRuler={showRuler}
              snapToGrid={snapToGrid}
            />
          </div>
        </main>

        {/* Right Sidebar - Properties */}
        <aside className="w-72 border-l bg-card shrink-0">
          <ElementProperties
            element={selectedElement}
            user={user}
            previewData={previewData}
            onUpdatePreview={(updates) => setPreviewData(prev => ({ ...prev, ...updates }))}
            onUpdate={(updates) => {
              if (selectedElement) {
                pushUndoState();
                handleUpdateElement(selectedElement.id, updates);
              }
            }}
            onDelete={handleDeleteElement}
            onDuplicate={handleDuplicateElement}
            onBringForward={handleBringForward}
            onSendBackward={handleSendBackward}
            onBringToFront={handleBringToFront}
            onSendToBack={handleSendToBack}
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
            <DialogDescription>Share your design with others or keep it private.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label>Template Name</Label>
              <Input value={templateName} onChange={(e) => setTemplateName(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={templateDescription} onChange={(e) => setTemplateDescription(e.target.value)} placeholder="Describe your template..." className="mt-1" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isPublic ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                <div>
                  <Label>Make Public</Label>
                  <p className="text-xs text-muted-foreground">{isPublic ? 'Anyone can use this template' : 'Only you can see this'}</p>
                </div>
              </div>
              <Switch checked={isPublic} onCheckedChange={setIsPublic} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPublishDialog(false)}>Cancel</Button>
            <Button onClick={handlePublish} disabled={isSaving}>{isSaving ? 'Publishing...' : 'Publish'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IDCardDesignStudio;
