import React, { useState } from 'react';
import { DesignTemplate, CanvasElement, CanvasBackground, CardDimensions } from '@/types/design-studio';
import QRCode from 'react-qr-code';

// Default back side elements when template doesn't have back configured
const getDefaultBackElements = (dimensions: CardDimensions): CanvasElement[] => [
  {
    id: 'default-back-logo',
    type: 'company_logo',
    label: 'Company Logo',
    dataField: 'company_logo_url',
    x: dimensions.width / 2 - 30,
    y: 20,
    width: 60,
    height: 60,
    zIndex: 1,
    visible: true,
    style: { borderRadius: 8 },
  },
  {
    id: 'default-back-qr',
    type: 'qr_code',
    label: 'QR Code',
    dataField: 'vanity_url',
    x: dimensions.width / 2 - 50,
    y: 90,
    width: 100,
    height: 100,
    zIndex: 2,
    visible: true,
    style: { backgroundColor: '#ffffff', borderRadius: 8, padding: 8 },
  },
  {
    id: 'default-back-brand',
    type: 'custom_text',
    label: 'Patra',
    content: 'Patra',
    x: dimensions.width / 2 - 30,
    y: dimensions.height - 30,
    width: 60,
    height: 20,
    zIndex: 3,
    visible: true,
    style: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#1e293b',
      textAlign: 'center',
      fontFamily: 'serif',
    },
  },
];

const DEFAULT_BACK_BACKGROUND: CanvasBackground = { type: 'color', value: '#f8fafc' };

interface StudioXCardRendererProps {
  template: DesignTemplate;
  userData: {
    company_logo_url?: string;
    avatar_url?: string;
    display_name?: string;
    job_title?: string;
    employee_display_id?: string;
    department?: string;
    email?: string;
    phone?: string;
    vanity_url?: string;
  };
  scale?: number;
  isFlipped?: boolean;
  onFlip?: () => void;
}

export const StudioXCardRenderer: React.FC<StudioXCardRendererProps> = ({
  template,
  userData,
  scale = 1,
  isFlipped: controlledFlipped,
  onFlip,
}) => {
  const [internalFlipped, setInternalFlipped] = useState(false);
  const isFlipped = controlledFlipped !== undefined ? controlledFlipped : internalFlipped;

  const { elements, background, card_dimensions: dimensions } = template;

  // Extract back side data from canvas_config
  const canvasConfig = template.canvas_config as any;
  const backElements: CanvasElement[] = canvasConfig?.backElements || getDefaultBackElements(dimensions);
  const backBackground: CanvasBackground = canvasConfig?.backBackground || DEFAULT_BACK_BACKGROUND;

  const handleFlip = () => {
    if (onFlip) {
      onFlip();
    } else {
      setInternalFlipped(!internalFlipped);
    }
  };

  const getBackgroundStyle = (bg: CanvasBackground): React.CSSProperties => {
    switch (bg.type) {
      case 'color':
        return { backgroundColor: bg.value };
      case 'gradient':
        return {
          background: `linear-gradient(${bg.gradientDirection || '135deg'}, ${bg.value}, ${bg.secondaryValue || bg.value})`,
        };
      case 'image':
        return {
          backgroundImage: `url(${bg.value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      default:
        return { backgroundColor: '#ffffff' };
    }
  };

  const renderElement = (element: CanvasElement) => {
    const value = element.dataField ? userData[element.dataField as keyof typeof userData] : element.content;

    if (element.type === 'company_logo' || element.type === 'profile_photo') {
      const isAiStylized = element.type === 'profile_photo' && element.aiStylizationEnabled;
      const displayValue = isAiStylized ? (userData as any).stylized_avatar_url || value : value;

      return displayValue ? (
        <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: element.style.borderRadius }}>
          <img
            src={displayValue as string}
            alt={element.label}
            className={`w-full h-full object-cover transition-opacity duration-300 ${isAiStylized && !(userData as any).stylized_avatar_url ? 'opacity-40 grayscale' : 'opacity-100'}`}
          />
          {isAiStylized && !(userData as any).stylized_avatar_url && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/5 animate-pulse">
              <span className="text-[8px] font-bold text-primary px-1 bg-white/80 rounded tracking-tighter uppercase">AI Processing</span>
            </div>
          )}
        </div>
      ) : (
        <div
          className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400"
          style={{ borderRadius: element.style.borderRadius, fontSize: 10 * scale }}
        >
          {element.type === 'company_logo' ? '🏢' : '👤'}
        </div>
      );
    }

    if (element.type === 'qr_code') {
      let qrValue: string;
      if (element.qrContentType === 'employee_id') {
        qrValue = (userData.employee_display_id as string) || 'EMP-000';
      } else {
        qrValue = (userData.vanity_url as string) || 'https://patra.app';
      }
      return (
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            backgroundColor: element.style.backgroundColor || '#ffffff',
            borderRadius: element.style.borderRadius,
            padding: (element.style.padding || 4) * scale,
          }}
        >
          <QRCode
            value={qrValue}
            size={Math.min(element.width, element.height) * scale - ((element.style.padding || 4) * scale * 2)}
            level="M"
          />
        </div>
      );
    }

    if (element.type === 'shape') {
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
    }

    if (element.type === 'divider') {
      return <div className="w-full h-full" style={{ backgroundColor: element.style.backgroundColor }} />;
    }

    // Text elements
    return (
      <div
        className="w-full h-full flex items-center overflow-hidden"
        style={{
          fontSize: (element.style.fontSize || 14) * scale,
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
          padding: element.style.padding ? element.style.padding * scale : undefined,
        }}
      >
        <span className="truncate w-full" style={{ textAlign: element.style.textAlign }}>
          {(value as string) || element.label}
        </span>
      </div>
    );
  };

  const renderSide = (sideElements: CanvasElement[], bg: CanvasBackground) => {
    const sorted = [...sideElements]
      .filter(el => el.visible !== false)
      .sort((a, b) => a.zIndex - b.zIndex);

    return (
      <div
        className="absolute inset-0 rounded-xl overflow-hidden"
        style={getBackgroundStyle(bg)}
      >
        {sorted.map((element) => (
          <div
            key={element.id}
            className="absolute"
            style={{
              left: element.x * scale,
              top: element.y * scale,
              width: element.width * scale,
              height: element.height * scale,
            }}
          >
            {renderElement(element)}
          </div>
        ))}
      </div>
    );
  };

  const width = dimensions.width * scale;
  const height = dimensions.height * scale;

  return (
    <div
      className="perspective-card-sx"
      onClick={handleFlip}
      style={{
        width,
        height,
        cursor: 'pointer',
      }}
    >
      <div
        className={`card-container-sx ${isFlipped ? 'flipped-sx' : ''}`}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Front */}
        <div className="card-face-sx card-front-sx shadow-lg">
          {renderSide(elements, background)}
        </div>

        {/* Back */}
        <div className="card-face-sx card-back-sx shadow-lg">
          {renderSide(backElements, backBackground)}
        </div>
      </div>

      <style>{`
        .perspective-card-sx {
          perspective: 2000px;
        }
        .card-container-sx {
          position: relative;
          transition: transform 0.7s ease;
          transform-style: preserve-3d;
        }
        .card-face-sx {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 12px;
        }
        .card-front-sx {
          transform: rotateY(0deg);
        }
        .card-back-sx {
          transform: rotateY(180deg);
        }
        .card-container-sx.flipped-sx {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};
