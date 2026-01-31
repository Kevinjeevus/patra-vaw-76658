import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { Mail, Phone } from 'lucide-react';
import { IDCardCustomization } from '@/types/id-card-templates';

interface NeonDarkCardProps {
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

export const NeonDarkCard: React.FC<NeonDarkCardProps> = ({
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
        {/* Front Side - Neon Dark */}
        <div
          className="card-face card-front overflow-hidden"
          style={{ background: colors.background }}
        >
          {/* Grid Pattern Background */}
          {layout.showPattern && (
            <div className="absolute inset-0 overflow-hidden opacity-20">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path
                      d="M 10 0 L 0 0 0 10"
                      fill="none"
                      stroke={colors.accent}
                      strokeWidth="0.3"
                    />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>
          )}

          {/* Glow effect */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: colors.accent }}
          />

          <div className="relative h-full flex flex-col items-center pt-10 pb-8 px-8">
            {/* Company Logo */}
            {layout.showCompanyLogo && (
              <div className="mb-8">
                {companyLogo ? (
                  <img
                    src={companyLogo}
                    alt="Company Logo"
                    className="max-h-10 max-w-[160px] object-contain"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                ) : (
                  <h3 className="text-lg font-bold tracking-tight" style={{ color: colors.text }}>
                    {user.companyName || 'COMPANY'}
                  </h3>
                )}
              </div>
            )}

            {/* Profile Photo with Neon Border */}
            <div className="mb-8 relative">
              <div
                className={`${photoSizeClasses[layout.photoSize]} ${photoShapeClasses[layout.photoShape]} overflow-hidden border-2 relative z-10`}
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
                    <svg className="w-14 h-14" fill={colors.text} viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                )}
              </div>
              {/* Neon glow behind photo */}
              <div
                className={`absolute inset-0 ${photoShapeClasses[layout.photoShape]} blur-md opacity-50`}
                style={{ backgroundColor: colors.accent }}
              />
            </div>

            {/* Name with Neon Effect */}
            <h2
              className="text-2xl font-black text-center mb-2"
              style={{
                color: colors.text,
                textShadow: `0 0 20px ${colors.accent}40`,
              }}
            >
              {user.fullName || 'Employee Name'}
            </h2>

            {/* Designation */}
            <p
              className="text-sm font-medium text-center mb-6 px-3 py-1 rounded-full"
              style={{
                color: colors.accent,
                backgroundColor: `${colors.accent}20`,
              }}
            >
              {user.jobTitle || 'Designation'}
            </p>

            {/* Contact Info */}
            <div className="mt-auto space-y-3 w-full">
              {displayParameters.includes('email') && (
                <div className="flex items-center gap-3 p-2 rounded-lg" style={{ backgroundColor: `${colors.secondary}50` }}>
                  <Mail className="w-4 h-4" style={{ color: colors.accent }} />
                  <span className="text-xs" style={{ color: colors.text }}>
                    {user.email}
                  </span>
                </div>
              )}
              {displayParameters.includes('phone') && user.phone && (
                <div className="flex items-center gap-3 p-2 rounded-lg" style={{ backgroundColor: `${colors.secondary}50` }}>
                  <Phone className="w-4 h-4" style={{ color: colors.accent }} />
                  <span className="text-xs" style={{ color: colors.text }}>
                    {user.phone}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="card-face card-back overflow-hidden"
          style={{ background: colors.background }}
        >
          {/* Grid Pattern */}
          {layout.showPattern && (
            <div className="absolute inset-0 overflow-hidden opacity-20">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid-back" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path
                      d="M 10 0 L 0 0 0 10"
                      fill="none"
                      stroke={colors.accent}
                      strokeWidth="0.3"
                    />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid-back)" />
              </svg>
            </div>
          )}

          {/* Glow effect */}
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: colors.accent }}
          />

          <div className="relative h-full flex flex-col items-center justify-center p-8">
            {/* Company Logo */}
            {layout.showCompanyLogo && (
              <div className="mb-8">
                {companyLogo ? (
                  <img
                    src={companyLogo}
                    alt="Company Logo"
                    className="max-h-10 max-w-[160px] object-contain"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                ) : (
                  <h3 className="text-lg font-bold" style={{ color: colors.text }}>
                    {user.companyName || 'COMPANY'}
                  </h3>
                )}
              </div>
            )}

            {/* QR Code with Neon Border */}
            {layout.showQRCode && (
              <div
                className="relative p-5 rounded-2xl"
                style={{
                  backgroundColor: '#ffffff',
                  boxShadow: `0 0 30px ${colors.accent}40`,
                }}
              >
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
              <p
                className="text-2xl font-bold italic"
                style={{
                  color: colors.accent,
                  textShadow: `0 0 20px ${colors.accent}60`,
                }}
              >
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
