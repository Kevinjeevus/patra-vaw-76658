import React from 'react';
import { CardDimensions } from '@/types/design-studio';

interface CanvasRulerProps {
  dimensions: CardDimensions;
  scale: number;
  orientation: 'horizontal' | 'vertical';
}

export const CanvasRuler: React.FC<CanvasRulerProps> = ({
  dimensions,
  scale,
  orientation,
}) => {
  const size = orientation === 'horizontal' ? dimensions.width : dimensions.height;
  const step = 20;
  const marks: number[] = [];

  for (let i = 0; i <= size; i += step) {
    marks.push(i);
  }

  if (orientation === 'horizontal') {
    return (
      <div
        className="relative h-5 bg-muted/60 border-b overflow-hidden select-none"
        style={{ width: dimensions.width * scale }}
      >
        {marks.map(m => (
          <div
            key={m}
            className="absolute top-0 flex flex-col items-center"
            style={{ left: m * scale }}
          >
            <div className={`w-px ${m % 100 === 0 ? 'h-3 bg-foreground/50' : m % 50 === 0 ? 'h-2 bg-foreground/30' : 'h-1.5 bg-foreground/20'}`} />
            {m % 100 === 0 && (
              <span className="text-[8px] text-muted-foreground mt-0.5">{m}</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative w-5 bg-muted/60 border-r overflow-hidden select-none"
      style={{ height: dimensions.height * scale }}
    >
      {marks.map(m => (
        <div
          key={m}
          className="absolute left-0 flex items-center"
          style={{ top: m * scale }}
        >
          <div className={`h-px ${m % 100 === 0 ? 'w-3 bg-foreground/50' : m % 50 === 0 ? 'w-2 bg-foreground/30' : 'w-1.5 bg-foreground/20'}`} />
          {m % 100 === 0 && (
            <span className="text-[8px] text-muted-foreground ml-0.5 -rotate-90 origin-left whitespace-nowrap">{m}</span>
          )}
        </div>
      ))}
    </div>
  );
};
