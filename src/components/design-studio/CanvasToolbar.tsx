import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Undo, Redo, Copy, Trash2, Lock, Unlock,
  AlignStartVertical, AlignEndVertical, AlignCenterVertical,
  AlignStartHorizontal, AlignEndHorizontal, AlignCenterHorizontal,
  LayoutGrid, Grid3X3, Maximize, ZoomIn, ZoomOut, Ruler
} from 'lucide-react';
import { CanvasElement } from '@/types/design-studio';

interface CanvasToolbarProps {
  selectedElement: CanvasElement | null;
  elements: CanvasElement[];
  scale: number;
  showGrid: boolean;
  showRuler: boolean;
  snapToGrid: boolean;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onToggleLock: () => void;
  onToggleGrid: () => void;
  onToggleRuler: () => void;
  onToggleSnap: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitToScreen: () => void;
  onSetScale: (scale: number) => void;
  onAlignElements: (alignment: string) => void;
  onDistributeElements: (direction: 'horizontal' | 'vertical') => void;
}

export const CanvasToolbar: React.FC<CanvasToolbarProps> = ({
  selectedElement,
  elements,
  scale,
  showGrid,
  showRuler,
  snapToGrid,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onDuplicate,
  onDelete,
  onToggleLock,
  onToggleGrid,
  onToggleRuler,
  onToggleSnap,
  onZoomIn,
  onZoomOut,
  onFitToScreen,
  onSetScale,
  onAlignElements,
  onDistributeElements,
}) => {
  const ToolBtn = ({ icon: Icon, label, onClick, active, disabled }: {
    icon: React.ComponentType<any>; label: string; onClick: () => void; active?: boolean; disabled?: boolean;
  }) => (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={active ? 'secondary' : 'ghost'}
            size="icon"
            className="h-8 w-8"
            onClick={onClick}
            disabled={disabled}
          >
            <Icon className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="flex items-center gap-1 px-3 py-1.5 border-b bg-card overflow-x-auto">
      {/* History */}
      <ToolBtn icon={Undo} label="Undo (Ctrl+Z)" onClick={onUndo} disabled={!canUndo} />
      <ToolBtn icon={Redo} label="Redo (Ctrl+Y)" onClick={onRedo} disabled={!canRedo} />

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Element actions */}
      <ToolBtn icon={Copy} label="Duplicate" onClick={onDuplicate} disabled={!selectedElement} />
      <ToolBtn icon={Trash2} label="Delete" onClick={onDelete} disabled={!selectedElement} />
      <ToolBtn icon={selectedElement?.locked ? Unlock : Lock} label={selectedElement?.locked ? "Unlock" : "Lock"} onClick={onToggleLock} disabled={!selectedElement} />

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Alignment */}
      <ToolBtn icon={AlignStartVertical} label="Align Left" onClick={() => onAlignElements('left')} disabled={!selectedElement} />
      <ToolBtn icon={AlignCenterVertical} label="Align Center H" onClick={() => onAlignElements('centerH')} disabled={!selectedElement} />
      <ToolBtn icon={AlignEndVertical} label="Align Right" onClick={() => onAlignElements('right')} disabled={!selectedElement} />
      <ToolBtn icon={AlignStartHorizontal} label="Align Top" onClick={() => onAlignElements('top')} disabled={!selectedElement} />
      <ToolBtn icon={AlignCenterHorizontal} label="Align Center V" onClick={() => onAlignElements('centerV')} disabled={!selectedElement} />
      <ToolBtn icon={AlignEndHorizontal} label="Align Bottom" onClick={() => onAlignElements('bottom')} disabled={!selectedElement} />

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Canvas controls */}
      <ToolBtn icon={Grid3X3} label="Toggle Grid" onClick={onToggleGrid} active={showGrid} />
      <ToolBtn icon={Ruler} label="Toggle Ruler" onClick={onToggleRuler} active={showRuler} />
      <ToolBtn icon={Distribute} label="Snap to Grid" onClick={onToggleSnap} active={snapToGrid} />

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Zoom */}
      <ToolBtn icon={ZoomOut} label="Zoom Out" onClick={onZoomOut} />
      <div className="flex items-center gap-1 mx-1">
        {[50, 75, 100, 125, 150, 200].map(z => (
          <Button
            key={z}
            variant={Math.round(scale * 100) === z ? 'secondary' : 'ghost'}
            size="sm"
            className="h-6 px-1.5 text-[10px]"
            onClick={() => onSetScale(z / 100)}
          >
            {z}%
          </Button>
        ))}
      </div>
      <ToolBtn icon={ZoomIn} label="Zoom In" onClick={onZoomIn} />
      <ToolBtn icon={Maximize} label="Fit to Screen" onClick={onFitToScreen} />
    </div>
  );
};
