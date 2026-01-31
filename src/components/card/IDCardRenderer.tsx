import React from 'react';
import { IDCardCustomization, IDCardTemplate, ID_CARD_TEMPLATES, DEFAULT_CUSTOMIZATION } from '@/types/id-card-templates';
import { GeometricModernCard, EventBadgeCard, MinimalLightCard, NeonDarkCard, BoldCreativeCard } from './templates';
import { CorporateIDCard } from './CorporateIDCard';

interface IDCardRendererProps {
  templateId: string;
  user: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone?: string;
    avatarUrl?: string;
    companyName?: string;
    vanityUrl?: string;
    staffId?: string;
    companyVanity?: string;
    badgeRole?: string;
  };
  companyLogo?: string;
  customization: IDCardCustomization;
  displayParameters?: string[];
  eventName?: string;
  eventDate?: string;
  isFlipped?: boolean;
  onFlip?: () => void;
  scale?: number;
}

export const IDCardRenderer: React.FC<IDCardRendererProps> = ({
  templateId,
  user,
  companyLogo,
  customization,
  displayParameters = ['display_name', 'email', 'job_title'],
  eventName,
  eventDate,
  isFlipped,
  onFlip,
  scale = 1,
}) => {
  const commonProps = {
    user,
    companyLogo,
    customization,
    displayParameters,
    isFlipped,
    onFlip,
    scale,
  };

  switch (templateId) {
    case 'geometric-modern':
      return <GeometricModernCard {...commonProps} />;
    
    case 'event-badge':
      return (
        <EventBadgeCard
          {...commonProps}
          eventName={eventName}
          eventDate={eventDate}
        />
      );
    
    case 'minimal-light':
      return <MinimalLightCard {...commonProps} />;
    
    case 'neon-dark':
      return <NeonDarkCard {...commonProps} />;
    
    case 'bold-creative':
      return <BoldCreativeCard {...commonProps} />;
    
    case 'corporate-classic':
    default:
      return (
        <CorporateIDCard
          user={user}
          companyLogo={companyLogo}
          displayParameters={displayParameters}
          isFlipped={isFlipped}
          onFlip={onFlip}
          scale={scale}
        />
      );
  }
};

// Preview component for template selection
interface TemplatePreviewProps {
  template: IDCardTemplate;
  isSelected: boolean;
  onClick: () => void;
  customization?: IDCardCustomization;
}

export const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  template,
  isSelected,
  onClick,
  customization,
}) => {
  const colors = customization?.colors || template.defaultColors;

  return (
    <button
      onClick={onClick}
      className={`
        relative p-3 rounded-xl border-2 transition-all duration-200
        ${isSelected
          ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
        }
      `}
    >
      {/* Mini preview */}
      <div className="w-24 h-36 mx-auto rounded-lg overflow-hidden shadow-sm mb-2 relative">
        {/* Template preview based on style */}
        <div
          className="w-full h-full flex flex-col"
          style={{ backgroundColor: colors.background }}
        >
          {/* Pattern indicator */}
          {template.style.hasPattern && (
            <div className="absolute inset-0 opacity-30">
              {template.style.patternType === 'geometric' && (
                <svg className="w-full h-full" viewBox="0 0 50 80">
                  <rect x="25" y="0" width="20" height="20" fill={colors.accent} />
                  <rect x="35" y="15" width="15" height="15" fill={colors.accent} opacity="0.6" />
                </svg>
              )}
              {template.style.patternType === 'grid' && (
                <svg className="w-full h-full" viewBox="0 0 50 80">
                  <defs>
                    <pattern id={`grid-${template.id}`} width="5" height="5" patternUnits="userSpaceOnUse">
                      <path d="M 5 0 L 0 0 0 5" fill="none" stroke={colors.accent} strokeWidth="0.2" />
                    </pattern>
                  </defs>
                  <rect width="50" height="80" fill={`url(#grid-${template.id})`} />
                </svg>
              )}
            </div>
          )}

          {/* Mini card content */}
          <div className="flex-1 flex flex-col items-center justify-center p-2">
            {/* Avatar placeholder */}
            <div
              className="w-8 h-8 rounded-full mb-1"
              style={{ backgroundColor: colors.secondary }}
            />
            {/* Name placeholder */}
            <div
              className="w-12 h-1.5 rounded-full mb-0.5"
              style={{ backgroundColor: colors.text, opacity: 0.8 }}
            />
            {/* Title placeholder */}
            <div
              className="w-8 h-1 rounded-full"
              style={{ backgroundColor: colors.text, opacity: 0.4 }}
            />
          </div>
        </div>
      </div>

      {/* Template name */}
      <p className="text-xs font-medium text-slate-900 text-center">{template.name}</p>
      
      {/* Premium badge */}
      {template.isPremium && (
        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[8px] font-bold bg-amber-400 text-amber-900 rounded-full">
          PRO
        </span>
      )}

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-1 left-1 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </button>
  );
};
