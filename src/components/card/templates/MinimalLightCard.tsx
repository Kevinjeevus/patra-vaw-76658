import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { Mail, Phone } from 'lucide-react';
import { IDCardCustomization } from '@/types/id-card-templates';

interface MinimalLightCardProps {
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

export const MinimalLightCard: React.FC<MinimalLightCardProps> = ({
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
    small: 'w-24 h-24',
    medium: 'w-32 h-32',
    large: 'w-40 h-40',
  };

  const photoShapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-xl',
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
        {/* Front Side - Minimal Light */}
        <div
          className="card-face card-front border-2"
          style={{ background: colors.background, borderColor: `${colors.text}15` }}
        >
          <div className="h-full flex flex-col items-center pt-14 pb-10 px-8">
            {/* Company Logo */}
            {layout.showCompanyLogo && (
              <div className="mb-10">
                {companyLogo ? (
                  <img
                    src={companyLogo}
                    alt="Company Logo"
                    className="max-h-8 max-w-[140px] object-contain"
                  />
                ) : (
                  <h4 className="text-sm font-medium tracking-widest uppercase" style={{ color: colors.secondary }}>
                    {user.companyName || 'COMPANY'}
                  </h4>
                )}
              </div>
            )}

            {/* Profile Photo */}
            <div className="mb-8">
              <div
                className={`${photoSizeClasses[layout.photoSize]} ${photoShapeClasses[layout.photoShape]} overflow-hidden bg-gray-100`}
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
                    <svg className="w-16 h-16" fill={colors.text} opacity={0.3} viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Name */}
            <h2 className="text-2xl font-semibold text-center mb-2" style={{ color: colors.text }}>
              {user.fullName || 'Employee Name'}
            </h2>

            {/* Designation */}
            <p className="text-sm font-medium text-center mb-8" style={{ color: colors.secondary }}>
              {user.jobTitle || 'Designation'}
            </p>

            {/* Divider */}
            <div className="w-16 h-px mb-8" style={{ backgroundColor: colors.secondary }} />

            {/* Contact Info */}
            <div className="space-y-3 text-center w-full">
              {displayParameters.includes('email') && (
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" style={{ color: colors.secondary }} />
                  <span className="text-xs" style={{ color: colors.secondary }}>
                    {user.email}
                  </span>
                </div>
              )}
              {displayParameters.includes('phone') && user.phone && (
                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" style={{ color: colors.secondary }} />
                  <span className="text-xs" style={{ color: colors.secondary }}>
                    {user.phone}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="card-face card-back border-2"
          style={{ background: colors.background, borderColor: `${colors.text}15` }}
        >
          <div className="h-full flex flex-col items-center justify-center p-8">
            {/* Company Logo */}
            {layout.showCompanyLogo && (
              <div className="mb-10">
                {companyLogo ? (
                  <img
                    src={companyLogo}
                    alt="Company Logo"
                    className="max-h-10 max-w-[160px] object-contain"
                  />
                ) : (
                  <h3 className="text-lg font-semibold tracking-tight" style={{ color: colors.text }}>
                    {user.companyName || 'COMPANY'}
                  </h3>
                )}
              </div>
            )}

            {/* QR Code */}
            {layout.showQRCode && (
              <div className="p-4">
                <QRCode
                  value={cardUrl}
                  size={160}
                  level="H"
                  fgColor={colors.text}
                  bgColor={colors.background}
                />
              </div>
            )}

            {/* Branding */}
            <div className="mt-10 text-center">
              <p className="text-xl font-semibold italic" style={{ color: colors.text }}>
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
