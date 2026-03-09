import React from 'react';
import { CanvasElement, CardDimensions } from '@/types/design-studio';

interface AlignmentGuidesProps {
  elements: CanvasElement[];
  activeElementId: string | null;
  dimensions: CardDimensions;
  scale: number;
  snapThreshold?: number;
}

export interface SnapResult {
  x: number | null;
  y: number | null;
  guides: Guide[];
}

export interface Guide {
  type: 'horizontal' | 'vertical';
  position: number;
}

export function calculateSnapGuides(
  activeElement: CanvasElement,
  otherElements: CanvasElement[],
  dimensions: CardDimensions,
  newX: number,
  newY: number,
  threshold = 5,
): SnapResult {
  const guides: Guide[] = [];
  let snapX: number | null = null;
  let snapY: number | null = null;

  const activeCenterX = newX + activeElement.width / 2;
  const activeCenterY = newY + activeElement.height / 2;
  const activeRight = newX + activeElement.width;
  const activeBottom = newY + activeElement.height;

  // Canvas center guides
  const canvasCenterX = dimensions.width / 2;
  const canvasCenterY = dimensions.height / 2;

  if (Math.abs(activeCenterX - canvasCenterX) < threshold) {
    snapX = canvasCenterX - activeElement.width / 2;
    guides.push({ type: 'vertical', position: canvasCenterX });
  }
  if (Math.abs(activeCenterY - canvasCenterY) < threshold) {
    snapY = canvasCenterY - activeElement.height / 2;
    guides.push({ type: 'horizontal', position: canvasCenterY });
  }

  // Edge snap to canvas bounds
  if (Math.abs(newX) < threshold) {
    snapX = 0;
    guides.push({ type: 'vertical', position: 0 });
  }
  if (Math.abs(activeRight - dimensions.width) < threshold) {
    snapX = dimensions.width - activeElement.width;
    guides.push({ type: 'vertical', position: dimensions.width });
  }
  if (Math.abs(newY) < threshold) {
    snapY = 0;
    guides.push({ type: 'horizontal', position: 0 });
  }
  if (Math.abs(activeBottom - dimensions.height) < threshold) {
    snapY = dimensions.height - activeElement.height;
    guides.push({ type: 'horizontal', position: dimensions.height });
  }

  // Snap to other elements
  for (const el of otherElements) {
    if (el.id === activeElement.id) continue;
    
    const elCenterX = el.x + el.width / 2;
    const elCenterY = el.y + el.height / 2;
    const elRight = el.x + el.width;
    const elBottom = el.y + el.height;

    // Vertical alignment
    if (Math.abs(newX - el.x) < threshold) {
      snapX = el.x;
      guides.push({ type: 'vertical', position: el.x });
    }
    if (Math.abs(activeRight - elRight) < threshold) {
      snapX = elRight - activeElement.width;
      guides.push({ type: 'vertical', position: elRight });
    }
    if (Math.abs(activeCenterX - elCenterX) < threshold) {
      snapX = elCenterX - activeElement.width / 2;
      guides.push({ type: 'vertical', position: elCenterX });
    }

    // Horizontal alignment
    if (Math.abs(newY - el.y) < threshold) {
      snapY = el.y;
      guides.push({ type: 'horizontal', position: el.y });
    }
    if (Math.abs(activeBottom - elBottom) < threshold) {
      snapY = elBottom - activeElement.height;
      guides.push({ type: 'horizontal', position: elBottom });
    }
    if (Math.abs(activeCenterY - elCenterY) < threshold) {
      snapY = elCenterY - activeElement.height / 2;
      guides.push({ type: 'horizontal', position: elCenterY });
    }
  }

  return { x: snapX, y: snapY, guides };
}

export const AlignmentGuides: React.FC<AlignmentGuidesProps> = ({
  elements,
  activeElementId,
  dimensions,
  scale,
}) => {
  // Render guides overlay - this is just the visual guides, logic is in calculateSnapGuides
  return null; // Guides are rendered inline in DesignCanvas
};
