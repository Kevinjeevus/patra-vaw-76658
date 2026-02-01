import React, { useRef, useState, useCallback } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { CanvasElement, CanvasBackground, CardDimensions } from '@/types/design-studio';
import { DraggableCanvasElement } from './DraggableCanvasElement';
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
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setIsDragging(true);
    onSelectElement(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    const { active, delta } = event;
    
    const element = elements.find(el => el.id === active.id);
    if (element && !element.locked) {
      const newX = Math.max(0, Math.min(dimensions.width - element.width, element.x + delta.x / scale));
      const newY = Math.max(0, Math.min(dimensions.height - element.height, element.y + delta.y / scale));
      
      onUpdateElement(active.id as string, {
        x: Math.round(newX),
        y: Math.round(newY),
      });
    }
  };

  const getBackgroundStyle = useCallback((): React.CSSProperties => {
    switch (background.type) {
      case 'color':
        return { backgroundColor: background.value };
      case 'gradient':
        return {
          background: `linear-gradient(${background.gradientDirection || '135deg'}, ${background.value}, ${background.secondaryValue || background.value})`,
        };
      case 'image':
        return {
          backgroundImage: `url(${background.value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      case 'pattern':
        // Add pattern backgrounds
        return {
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
      default:
        return 'none';
    }
  };

  const renderElementContent = (element: CanvasElement) => {
    const value = element.dataField ? previewData[element.dataField] : element.content;

    switch (element.type) {
      case 'company_logo':
        return value ? (
          <img 
            src={value} 
            alt="Company Logo" 
            className="w-full h-full object-contain"
            style={{ borderRadius: element.style.borderRadius }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-xs rounded">
            Logo
          </div>
        );

      case 'profile_photo':
        return value ? (
          <img 
            src={value} 
            alt="Profile" 
            className="w-full h-full object-cover"
            style={{ 
              borderRadius: element.style.borderRadius,
              border: element.style.borderWidth ? `${element.style.borderWidth}px solid ${element.style.borderColor}` : undefined,
            }}
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-xs"
            style={{ borderRadius: element.style.borderRadius }}
          >
            Photo
          </div>
        );

      case 'qr_code':
        return (
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{ 
              backgroundColor: element.style.backgroundColor,
              padding: element.style.padding,
              borderRadius: element.style.borderRadius,
            }}
          >
            <QRCode 
              value={value || 'https://patra.app'} 
              size={Math.min(element.width, element.height) - (element.style.padding || 0) * 2}
              level="M"
            />
          </div>
        );

      case 'shape':
        return (
          <div 
            className="w-full h-full"
            style={{
              backgroundColor: element.style.backgroundColor,
              borderRadius: element.style.borderRadius,
              opacity: element.style.opacity,
            }}
          />
        );

      case 'divider':
        return (
          <div 
            className="w-full"
            style={{
              height: element.height,
              backgroundColor: element.style.backgroundColor,
            }}
          />
        );

      default:
        // Text elements
        return (
          <div
            className="w-full h-full flex items-center overflow-hidden"
            style={{
              fontSize: element.style.fontSize,
              fontFamily: element.style.fontFamily,
              fontWeight: element.style.fontWeight === 'bold' ? 700 : 
                         element.style.fontWeight === 'semibold' ? 600 :
                         element.style.fontWeight === 'medium' ? 500 : 400,
              color: element.style.color,
              textAlign: element.style.textAlign,
              justifyContent: element.style.textAlign === 'center' ? 'center' : 
                             element.style.textAlign === 'right' ? 'flex-end' : 'flex-start',
              backgroundColor: element.style.backgroundColor,
              borderRadius: element.style.borderRadius,
              padding: element.style.padding,
            }}
          >
            <span className="truncate w-full" style={{ textAlign: element.style.textAlign }}>
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
    <div className="relative flex items-center justify-center p-8 bg-muted/30 rounded-lg overflow-auto">
      <DndContext 
        sensors={sensors} 
        onDragStart={handleDragStart} 
        onDragEnd={handleDragEnd}
      >
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
            if (e.target === e.currentTarget) {
              onSelectElement(null);
            }
          }}
        >
          {/* Grid overlay for alignment */}
          {selectedElementId && (
            <div 
              className="absolute inset-0 pointer-events-none opacity-20"
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
  );
};
