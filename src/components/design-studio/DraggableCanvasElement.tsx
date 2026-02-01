import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { CanvasElement } from '@/types/design-studio';
import { cn } from '@/lib/utils';
import { Lock, Move } from 'lucide-react';

interface DraggableCanvasElementProps {
  element: CanvasElement;
  scale: number;
  isSelected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}

export const DraggableCanvasElement: React.FC<DraggableCanvasElementProps> = ({
  element,
  scale,
  isSelected,
  onSelect,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: element.id,
    disabled: element.locked,
  });

  const style: React.CSSProperties = {
    position: 'absolute',
    left: element.x * scale,
    top: element.y * scale,
    width: element.width * scale,
    height: element.height * scale,
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    cursor: element.locked ? 'not-allowed' : isDragging ? 'grabbing' : 'grab',
    opacity: isDragging ? 0.8 : 1,
    zIndex: isSelected ? 1000 : element.zIndex,
    transformOrigin: 'center center',
    transition: isDragging ? 'none' : 'box-shadow 0.15s ease',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(element.locked ? {} : { ...listeners, ...attributes })}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      className={cn(
        "group relative",
        isSelected && "ring-2 ring-primary ring-offset-1",
        !element.locked && !isDragging && "hover:ring-2 hover:ring-primary/50"
      )}
    >
      {/* Content */}
      <div className="w-full h-full overflow-hidden">
        {children}
      </div>

      {/* Selection handles */}
      {isSelected && !element.locked && (
        <>
          {/* Corner handles for resize (visual only for now) */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary rounded-full border border-background" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full border border-background" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary rounded-full border border-background" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary rounded-full border border-background" />
          
          {/* Move indicator */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1 shadow-sm">
            <Move className="w-2.5 h-2.5" />
            <span>{element.label}</span>
          </div>
        </>
      )}

      {/* Lock indicator */}
      {element.locked && isSelected && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-muted text-muted-foreground text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
          <Lock className="w-2.5 h-2.5" />
          <span>Locked</span>
        </div>
      )}
    </div>
  );
};
