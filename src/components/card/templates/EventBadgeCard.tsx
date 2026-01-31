import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { IDCardCustomization } from '@/types/id-card-templates';

interface EventBadgeCardProps {
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
  eventName?: string;
  eventDate?: string;
  displayParameters?: string[];
  isFlipped?: boolean;
  onFlip?: () => void;
  scale?: number;
}

export const EventBadgeCard: React.FC<EventBadgeCardProps> = ({
  user,
  companyLogo,
  customization,
  eventName = 'Company Event',
  eventDate = '',
  displayParameters = ['display_name', 'email', 'job_title'],
  isFlipped: controlledFlipped,
  onFlip,
  scale = 1,
}) => {
  const [internalFlipped, setInternalFlipped] = useState(false);
  const isFlipped = controlledFlipped !== undefined ? controlledFlipped : internalFlipped;

  const handleFlip = () => {
    if (onFlip) {
      onFlip();
    } else {
      setInternalFlipped(!internalFlipped);
    }
  };

  const { colors, layout, options } = customization;
  const width = 320;
  const height = 460;

  const cardUrl = user.staffId && user.companyVanity
    ? `${window.location.origin}/${user.companyVanity}/${user.staffId}`
    : `${window.location.origin}/${user.vanityUrl || ''}`;

  // Badge role determines the color scheme
  const badgeRole = options.badgeText || user.badgeRole || user.jobTitle || 'Team Member';
  
  // Role-based styling
  const getRoleStyle = (role: string) => {
    const roleLower = role.toLowerCase();
    if (roleLower.includes('organizer') || roleLower.includes('admin')) {
      return { bg: colors.background, text: colors.text };
    } else if (roleLower.includes('speaker') || roleLower.includes('presenter')) {
      return { bg: colors.primary, text: '#ffffff' };
    } else if (roleLower.includes('vip') || roleLower.includes('executive')) {
      return { bg: '#fbbf24', text: '#1e1e1e' };
    }
    return { bg: colors.background, text: colors.text };
  };

  const roleStyle = getRoleStyle(badgeRole);

  return (
    <div
      className="perspective-card"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <div
        className={`card-container ${isFlipped ? 'flipped' : ''}`}
        onClick={handleFlip}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Front Side - Event Badge Style */}
        <div
          className="card-face card-front shadow-xl"
          style={{ background: roleStyle.bg }}
        >
          {/* Lanyard hole */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div
              className="w-8 h-8 rounded-full border-4 flex items-center justify-center"
              style={{ backgroundColor: roleStyle.bg, borderColor: colors.secondary }}
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.secondary }} />
            </div>
          </div>

          <div className="h-full flex flex-col pt-12 pb-8 px-8">
            {/* Company/Event Logo */}
            {layout.showCompanyLogo && (
              <div className="mb-4">
                {companyLogo ? (
                  <img
                    src={companyLogo}
                    alt="Logo"
                    className="max-h-8 max-w-[120px] object-contain"
                  />
                ) : (
                  <h4
                    className="text-sm font-medium tracking-wider"
                    style={{ color: roleStyle.text, opacity: 0.7 }}
                  >
                    {user.companyName || 'COMPANY'}
                  </h4>
                )}
              </div>
            )}

            {/* Event Info */}
            <div className="mb-8">
              <p className="text-xs opacity-70 mb-1" style={{ color: roleStyle.text }}>
                {eventDate || 'Event Date'}
              </p>
              <p className="text-sm font-medium" style={{ color: roleStyle.text }}>
                {eventName}
              </p>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Role Badge */}
            <div className="mb-6">
              <h2
                className="text-4xl font-black tracking-tight leading-none"
                style={{ color: roleStyle.text }}
              >
                {badgeRole}
              </h2>
              <p className="text-sm uppercase tracking-widest mt-2 opacity-60" style={{ color: roleStyle.text }}>
                {user.jobTitle !== badgeRole ? user.jobTitle : 'ACCESS GRANTED'}
              </p>
            </div>

            {/* Name */}
            <div className="mb-4">
              <h3 className="text-lg font-bold" style={{ color: roleStyle.text }}>
                {user.fullName}
              </h3>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: `${roleStyle.text}20` }}>
              <span className="text-xs opacity-50" style={{ color: roleStyle.text }}>
                {user.companyName || 'patra.app'}
              </span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.accent }} />
              </div>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="card-face card-back shadow-xl"
          style={{ background: colors.primary }}
        >
          {/* Lanyard hole */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div
              className="w-8 h-8 rounded-full border-4 flex items-center justify-center"
              style={{ backgroundColor: colors.primary, borderColor: colors.secondary }}
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.secondary }} />
            </div>
          </div>

          <div className="h-full flex flex-col items-center justify-center p-8">
            {/* QR Code */}
            {layout.showQRCode && (
              <div className="bg-white p-5 rounded-2xl shadow-lg mb-6">
                <QRCode
                  value={cardUrl}
                  size={160}
                  level="H"
                  fgColor={colors.primary}
                  bgColor="#ffffff"
                />
              </div>
            )}

            {/* Scan instruction */}
            <p className="text-sm text-center opacity-80 mb-6" style={{ color: '#ffffff' }}>
              Scan to connect
            </p>

            {/* Branding */}
            <div className="text-center">
              <p className="text-2xl font-bold italic" style={{ color: '#ffffff' }}>
                Patra
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .perspective-card {
          perspective: 2000px;
          cursor: pointer;
        }
        .card-container {
          position: relative;
          transition: transform 0.7s ease;
          transform-style: preserve-3d;
        }
        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 16px;
        }
        .card-front {
          transform: rotateY(0deg);
        }
        .card-back {
          transform: rotateY(180deg);
        }
        .card-container.flipped {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};
