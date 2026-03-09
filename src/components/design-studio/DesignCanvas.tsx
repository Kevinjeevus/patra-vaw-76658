import React, { useRef, useState, useCallback } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { CanvasElement, CanvasBackground, CardDimensions } from '@/types/design-studio';
import { DraggableCanvasElement } from './DraggableCanvasElement';
import { CanvasRuler } from './CanvasRuler';
import { calculateSnapGuides, Guide } from './AlignmentGuides';
import { cn } from '@/lib/utils';
import QRCode from 'react-qr-code';

interface DesignCanvasProps {
  elements: CanvasElement[];
  background: CanvasBackground;
  dimensions: CardDimensions;
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: Partial<CanvasElement>) => void;
  previewData?: Record<string, any>;
  scale?: number;
  showGrid?: boolean;
  showRuler?: boolean;
  snapToGrid?: boolean;
  gridSize?: number;
}

export const DesignCanvas: React.FC<DesignCanvasProps> = ({
  elements,
  background,
  dimensions,
  selectedElementId,
  onSelectElement,
  onUpdateElement,
  previewData = {},
  scale = 1,
  showGrid = false,
  showRuler = false,
  snapToGrid = false,
  gridSize = 10,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeGuides, setActiveGuides] = useState<Guide[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 3 },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setIsDragging(true);
    onSelectElement(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    setActiveGuides([]);
    const { active, delta } = event;
    
    const element = elements.find(el => el.id === active.id);
    if (element && !element.locked) {
      let newX = element.x + delta.x / scale;
      let newY = element.y + delta.y / scale;

      // Snap to grid
      if (snapToGrid) {
        newX = Math.round(newX / gridSize) * gridSize;
        newY = Math.round(newY / gridSize) * gridSize;
      }

      // Smart snap guides
      const snapResult = calculateSnapGuides(element, elements, dimensions, newX, newY, 8);
      if (snapResult.x !== null) newX = snapResult.x;
      if (snapResult.y !== null) newY = snapResult.y;

      newX = Math.max(0, Math.min(dimensions.width - element.width, newX));
      newY = Math.max(0, Math.min(dimensions.height - element.height, newY));
      
      onUpdateElement(active.id as string, {
        x: Math.round(newX),
        y: Math.round(newY),
      });
    }
  };

  const getBackgroundStyle = useCallback((): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {};
    
    if (background.overlayColor) {
      baseStyle.position = 'relative';
    }

    switch (background.type) {
      case 'color':
        return { ...baseStyle, backgroundColor: background.value };
      case 'gradient':
        return {
          ...baseStyle,
          background: `linear-gradient(${background.gradientDirection || '135deg'}, ${background.value}, ${background.secondaryValue || background.value})`,
        };
      case 'image':
        return {
          ...baseStyle,
          backgroundImage: `url(${background.value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          ...(background.blur ? { filter: `blur(${background.blur}px)` } : {}),
        };
      case 'pattern':
        return {
          ...baseStyle,
          backgroundColor: background.value,
          backgroundImage: getPatternCSS(background.patternType),
        };
      default:
        return { backgroundColor: '#ffffff' };
    }
  }, [background]);

  const getPatternCSS = (patternType?: string): string => {
    switch (patternType) {
      case 'dots':
        return 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)';
      case 'grid':
        return 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)';
      case 'diagonal':
        return 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.03) 10px, rgba(0,0,0,0.03) 20px)';
      case 'crosshatch':
        return 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.02) 5px, rgba(0,0,0,0.02) 10px), repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(0,0,0,0.02) 5px, rgba(0,0,0,0.02) 10px)';
      default:
        return 'none';
    }
  };

  const renderElementContent = (element: CanvasElement) => {
    const value = element.dataField ? previewData[element.dataField] : element.content;

    switch (element.type) {
      case 'company_logo':
        return value ? (
          <img src={value} alt="Company Logo" className="w-full h-full object-contain" style={{ borderRadius: element.style.borderRadius }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-xs rounded">Logo</div>
        );

      case 'profile_photo':
        return value ? (
          <img src={value} alt="Profile" className="w-full h-full object-cover"
            style={{ borderRadius: element.style.borderRadius, border: element.style.borderWidth ? `${element.style.borderWidth}px solid ${element.style.borderColor}` : undefined }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-xs" style={{ borderRadius: element.style.borderRadius }}>Photo</div>
        );

      case 'signature':
        return value ? (
          <img src={value} alt="Signature" className="w-full h-full object-contain" style={{ borderRadius: element.style.borderRadius }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted/50 text-muted-foreground text-[10px] border border-dashed border-muted-foreground/30 rounded" style={{ borderRadius: element.style.borderRadius }}>Signature</div>
        );

      case 'image':
        return element.imageUrl ? (
          <img src={element.imageUrl} alt={element.label} className="w-full h-full object-cover" style={{ borderRadius: element.style.borderRadius, opacity: element.style.opacity }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted/50 text-muted-foreground text-[10px] border border-dashed border-muted-foreground/30 rounded">Image</div>
        );

      case 'qr_code':
        return (
          <div className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: element.style.backgroundColor, padding: element.style.padding, borderRadius: element.style.borderRadius }}>
            <QRCode value={value || 'https://patra.app'} size={Math.min(element.width, element.height) - (element.style.padding || 0) * 2} level="M" />
          </div>
        );

      case 'barcode':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-white" style={{ padding: element.style.padding, borderRadius: element.style.borderRadius }}>
            <div className="flex-1 w-full flex items-center justify-center">
              <div className="flex h-full w-full items-end justify-center gap-px">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={i} className="bg-black" style={{ width: Math.random() > 0.3 ? 2 : 1, height: `${60 + Math.random() * 40}%` }} />
                ))}
              </div>
            </div>
            <span className="text-[8px] mt-1 font-mono">{value || 'EMP-001'}</span>
          </div>
        );

      case 'badge':
        return (
          <div className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: element.style.backgroundColor, color: element.style.color, borderRadius: element.style.borderRadius, fontSize: element.style.fontSize, fontWeight: 700, padding: element.style.padding }}>
            {element.content || 'BADGE'}
          </div>
        );

      case 'icon':
        return (
          <div className="w-full h-full flex items-center justify-center" style={{ color: element.style.color, fontSize: Math.min(element.width, element.height) * 0.7 }}>
            ★
          </div>
        );

      case 'shape':
        return (
          <div className="w-full h-full" style={{ backgroundColor: element.style.backgroundColor, borderRadius: element.style.borderRadius, opacity: element.style.opacity }} />
        );

      case 'divider':
      case 'line':
        return (
          <div className="w-full" style={{ height: element.height, backgroundColor: element.style.backgroundColor }} />
        );

      default:
        // Text elements
        const textStyle: React.CSSProperties = {
          fontSize: element.style.fontSize,
          fontFamily: element.style.fontFamily,
          fontWeight: element.style.fontWeight === 'bold' ? 700 : element.style.fontWeight === 'semibold' ? 600 : element.style.fontWeight === 'medium' ? 500 : 400,
          color: element.style.color,
          textAlign: element.style.textAlign,
          letterSpacing: element.style.letterSpacing ? `${element.style.letterSpacing}px` : undefined,
          lineHeight: element.style.lineHeight ? `${element.style.lineHeight}` : undefined,
          textShadow: element.style.textShadow,
          WebkitTextStroke: element.style.textStroke,
          backgroundColor: element.style.backgroundColor,
          borderRadius: element.style.borderRadius,
          padding: element.style.padding,
        };

        if (element.style.gradientText && element.style.gradientTextColors) {
          Object.assign(textStyle, {
            background: element.style.gradientTextColors,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          });
        }

        return (
          <div className="w-full h-full flex items-center overflow-hidden" style={{
            justifyContent: element.style.textAlign === 'center' ? 'center' : element.style.textAlign === 'right' ? 'flex-end' : 'flex-start',
          }}>
            <span className="truncate w-full" style={textStyle}>
              {value || element.label}
            </span>
          </div>
        );
    }
  };

  const sortedElements = [...elements]
    .filter(el => el.visible !== false)
    .sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div className="relative flex flex-col items-center justify-center p-8 bg-muted/30 rounded-lg overflow-auto min-h-full">
      {/* Ruler + Canvas wrapper */}
      <div className="flex flex-col items-start">
        {showRuler && (
          <div className="flex">
            <div className="w-5 h-5 bg-muted/60 border-b border-r" /> {/* Corner */}
            <CanvasRuler dimensions={dimensions} scale={scale} orientation="horizontal" />
          </div>
        )}
        <div className="flex">
          {showRuler && (
            <CanvasRuler dimensions={dimensions} scale={scale} orientation="vertical" />
          )}
          <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div
              ref={canvasRef}
              className={cn(
                "relative shadow-xl rounded-lg overflow-hidden transition-shadow",
                isDragging && "shadow-2xl"
              )}
              style={{
                width: dimensions.width * scale,
                height: dimensions.height * scale,
                ...getBackgroundStyle(),
              }}
              onClick={(e) => {
                if (e.target === e.currentTarget) onSelectElement(null);
              }}
            >
              {/* Grid overlay */}
              {showGrid && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)`,
                    backgroundSize: `${gridSize * scale}px ${gridSize * scale}px`,
                  }}
                />
              )}

              {/* Smart alignment guides */}
              {activeGuides.map((guide, i) => (
                <div
                  key={i}
                  className="absolute pointer-events-none"
                  style={guide.type === 'vertical'
                    ? { left: guide.position * scale, top: 0, width: 1, height: '100%', backgroundColor: 'hsl(var(--primary))' }
                    : { top: guide.position * scale, left: 0, height: 1, width: '100%', backgroundColor: 'hsl(var(--primary))' }
                  }
                />
              ))}

              {/* Selection grid overlay */}
              {selectedElementId && !showGrid && (
                <div
                  className="absolute inset-0 pointer-events-none opacity-10"
                  style={{
                    backgroundImage: 'linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)',
                    backgroundSize: `${20 * scale}px ${20 * scale}px`,
                  }}
                />
              )}

              {sortedElements.map((element) => (
                <DraggableCanvasElement
                  key={element.id}
                  element={element}
                  scale={scale}
                  isSelected={selectedElementId === element.id}
                  onSelect={() => onSelectElement(element.id)}
                >
                  {renderElementContent(element)}
                </DraggableCanvasElement>
              ))}
            </div>
          </DndContext>
        </div>
      </div>

      {/* Canvas info */}
      <div className="mt-3 text-[10px] text-muted-foreground flex items-center gap-3">
        <span>{dimensions.width} × {dimensions.height} px</span>
        <span>{Math.round(scale * 100)}%</span>
        <span>{elements.length} elements</span>
      </div>
    </div>
  );
};
