import React from 'react';
import { DesignTemplate, CanvasElement, CanvasBackground, CardDimensions } from '@/types/design-studio';
import QRCode from 'react-qr-code';

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
}

export const StudioXCardRenderer: React.FC<StudioXCardRendererProps> = ({
  template,
  userData,
  scale = 1,
}) => {
  const { elements, background, card_dimensions: dimensions } = template;

  const getBackgroundStyle = (): React.CSSProperties => {
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
      default:
        return { backgroundColor: '#ffffff' };
    }
  };

  const renderElement = (element: CanvasElement) => {
    const value = element.dataField ? userData[element.dataField as keyof typeof userData] : element.content;

    if (element.type === 'company_logo' || element.type === 'profile_photo') {
      return value ? (
        <img 
          src={value as string} 
          alt={element.label}
          className="w-full h-full object-cover"
          style={{ borderRadius: element.style.borderRadius }}
        />
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
      const qrValue = (value as string) || 'https://patra.app';
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

  const sortedElements = [...elements]
    .filter(el => el.visible !== false)
    .sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-lg"
      style={{
        width: dimensions.width * scale,
        height: dimensions.height * scale,
        ...getBackgroundStyle(),
      }}
    >
      {sortedElements.map((element) => (
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
