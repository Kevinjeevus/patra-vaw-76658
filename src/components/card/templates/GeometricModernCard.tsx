import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { IDCardCustomization } from '@/types/id-card-templates';

interface GeometricModernCardProps {
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
  };
  companyLogo?: string;
  customization: IDCardCustomization;
  displayParameters?: string[];
  isFlipped?: boolean;
  onFlip?: () => void;
  scale?: number;
}

export const GeometricModernCard: React.FC<GeometricModernCardProps> = ({
  user,
  companyLogo,
  customization,
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

  const { colors, layout } = customization;
  const width = 320;
  const height = 500;

  const cardUrl = user.staffId && user.companyVanity
    ? `${window.location.origin}/${user.companyVanity}/${user.staffId}`
    : `${window.location.origin}/${user.vanityUrl || ''}`;

  const photoSizeClasses = {
    small: 'w-20 h-20',
    medium: 'w-28 h-28',
    large: 'w-36 h-36',
  };

  const photoShapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-2xl',
  };

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
        {/* Front Side - Geometric Modern */}
        <div
          className="card-face card-front overflow-hidden"
          style={{ background: colors.background }}
        >
          {/* Geometric Pattern Background */}
          <div className="absolute inset-0 overflow-hidden">
            <svg className="absolute top-0 right-0 w-48 h-48" viewBox="0 0 100 100">
              <rect x="10" y="10" width="30" height="30" fill={colors.accent} />
              <rect x="50" y="0" width="25" height="25" fill={colors.accent} opacity="0.7" />
              <rect x="80" y="30" width="20" height="20" fill={colors.accent} opacity="0.5" />
              <rect x="60" y="50" width="15" height="15" fill={colors.accent} opacity="0.8" />
              <rect x="85" y="60" width="12" height="12" fill={colors.accent} opacity="0.6" />
            </svg>
            {/* Decorative shapes */}
            <div 
              className="absolute top-12 left-4 w-16 h-16 rotate-45"
              style={{ backgroundColor: colors.accent, opacity: 0.3 }}
            />
          </div>

          <div className="relative h-full flex flex-col pt-8 pb-8 px-6">
            {/* Company Logo */}
            {layout.showCompanyLogo && (
              <div className="mb-6">
                {companyLogo ? (
                  <img
                    src={companyLogo}
                    alt="Company Logo"
                    className="max-h-10 max-w-[160px] object-contain"
                  />
                ) : (
                  <h3 className="text-lg font-bold tracking-tight" style={{ color: colors.text }}>
                    {user.companyName || 'COMPANY'}
                  </h3>
                )}
              </div>
            )}

            {/* Profile Photo */}
            <div className="mb-6 relative">
              <div
                className={`${photoSizeClasses[layout.photoSize]} ${photoShapeClasses[layout.photoShape]} overflow-hidden border-4`}
                style={{ borderColor: colors.accent }}
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: colors.secondary }}
                  >
                    <svg className="w-12 h-12" fill={colors.text} viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Name & Title */}
            <div className="flex-1">
              <h2 className="text-2xl font-black mb-1" style={{ color: colors.text }}>
                {user.fullName || 'Employee Name'}
              </h2>
              <p className="text-sm font-medium mb-4" style={{ color: colors.secondary }}>
                {user.jobTitle || 'Designation'}
              </p>

              {/* Tagline */}
              <p
                className="text-sm italic font-medium mb-6 border-l-4 pl-3"
                style={{ color: colors.accent, borderColor: colors.accent }}
              >
                "Explore New Horizons"
              </p>

              {/* Contact Info */}
              <div className="space-y-2">
                {displayParameters.includes('email') && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: colors.secondary }}>
                      {user.email}
                    </span>
                  </div>
                )}
                {displayParameters.includes('phone') && user.phone && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: colors.secondary }}>
                      {user.phone}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="card-face card-back overflow-hidden"
          style={{ background: colors.background }}
        >
          {/* Geometric Pattern - Full Coverage */}
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 100 150" preserveAspectRatio="xMidYMid slice">
              {/* Large geometric shapes */}
              <rect x="0" y="0" width="40" height="40" fill={colors.accent} />
              <rect x="40" y="20" width="30" height="30" fill={colors.accent} opacity="0.8" />
              <rect x="70" y="0" width="30" height="50" fill={colors.accent} opacity="0.6" />
              <rect x="0" y="40" width="25" height="35" fill={colors.accent} opacity="0.7" />
              <rect x="25" y="50" width="35" height="25" fill={colors.accent} opacity="0.5" />
              <rect x="60" y="50" width="40" height="30" fill={colors.accent} opacity="0.4" />
              <rect x="0" y="75" width="30" height="25" fill={colors.accent} opacity="0.6" />
              <rect x="30" y="80" width="25" height="30" fill={colors.accent} opacity="0.7" />
            </svg>
          </div>

          <div className="relative h-full flex flex-col items-center justify-center p-8">
            {/* Company Logo */}
            {layout.showCompanyLogo && (
              <div className="mb-8">
                {companyLogo ? (
                  <img
                    src={companyLogo}
                    alt="Company Logo"
                    className="max-h-12 max-w-[200px] object-contain"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                ) : (
                  <h3 className="text-xl font-bold" style={{ color: colors.text }}>
                    {user.companyName || 'COMPANY'}
                  </h3>
                )}
              </div>
            )}

            {/* QR Code */}
            {layout.showQRCode && (
              <div className="bg-white p-4 rounded-xl shadow-lg">
                <QRCode
                  value={cardUrl}
                  size={140}
                  level="H"
                  fgColor={colors.primary}
                  bgColor="#ffffff"
                />
              </div>
            )}

            {/* Branding */}
            <div className="mt-8 text-center">
              <p className="text-xl font-bold italic" style={{ color: colors.text }}>
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
