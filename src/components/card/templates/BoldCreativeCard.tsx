import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { Mail, Phone } from 'lucide-react';
import { IDCardCustomization } from '@/types/id-card-templates';

interface BoldCreativeCardProps {
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

export const BoldCreativeCard: React.FC<BoldCreativeCardProps> = ({
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
    small: 'w-24 h-32',
    medium: 'w-32 h-44',
    large: 'w-40 h-52',
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
        {/* Front Side - Bold Creative */}
        <div
          className="card-face card-front overflow-hidden"
          style={{ background: colors.background }}
        >
          {/* Top Section with Photo */}
          <div className="relative h-3/5 overflow-hidden">
            {/* Accent color block */}
            <div
              className="absolute top-0 left-0 w-2/3 h-full"
              style={{ backgroundColor: colors.accent }}
            />
            
            {/* Photo positioned at intersection */}
            <div className="absolute bottom-0 right-4 translate-y-1/4 z-10">
              <div
                className={`${photoSizeClasses[layout.photoSize]} ${photoShapeClasses[layout.photoShape]} overflow-hidden border-4 shadow-xl`}
                style={{ borderColor: colors.background }}
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
                    <svg className="w-16 h-16" fill={colors.text} viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Company Logo on accent block */}
            {layout.showCompanyLogo && (
              <div className="absolute top-6 left-6">
                {companyLogo ? (
                  <img
                    src={companyLogo}
                    alt="Company Logo"
                    className="max-h-10 max-w-[120px] object-contain"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                ) : (
                  <h3 className="text-lg font-bold" style={{ color: '#ffffff' }}>
                    {user.companyName || 'COMPANY'}
                  </h3>
                )}
              </div>
            )}
          </div>

          {/* Bottom Section - Info */}
          <div className="h-2/5 px-6 pt-16 pb-6 flex flex-col">
            {/* Name */}
            <h2 className="text-2xl font-black mb-1" style={{ color: colors.text }}>
              {user.fullName || 'Employee Name'}
            </h2>

            {/* Designation */}
            <p className="text-sm font-medium mb-4" style={{ color: colors.secondary }}>
              {user.jobTitle || 'Designation'}
            </p>

            {/* Contact Info */}
            <div className="mt-auto space-y-2">
              {displayParameters.includes('email') && (
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3" style={{ color: colors.accent }} />
                  <span className="text-xs" style={{ color: colors.secondary }}>
                    {user.email}
                  </span>
                </div>
              )}
              {displayParameters.includes('phone') && user.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3 h-3" style={{ color: colors.accent }} />
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
          className="card-face card-back overflow-hidden"
          style={{ background: colors.primary }}
        >
          {/* Geometric Pattern */}
          {layout.showPattern && (
            <div className="absolute inset-0 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 100 150" preserveAspectRatio="xMidYMid slice">
                <rect x="-5" y="-5" width="35" height="50" fill={colors.accent} opacity="0.8" />
                <rect x="30" y="10" width="30" height="40" fill={colors.accent} opacity="0.6" />
                <rect x="60" y="-10" width="50" height="60" fill={colors.accent} opacity="0.4" />
                <rect x="-10" y="45" width="40" height="35" fill={colors.accent} opacity="0.5" />
                <rect x="30" y="50" width="35" height="45" fill={colors.accent} opacity="0.7" />
                <rect x="65" y="45" width="45" height="40" fill={colors.accent} opacity="0.3" />
                <rect x="0" y="85" width="30" height="30" fill={colors.accent} opacity="0.6" />
                <rect x="30" y="95" width="40" height="55" fill={colors.accent} opacity="0.5" />
                <rect x="70" y="85" width="35" height="40" fill={colors.accent} opacity="0.4" />
              </svg>
            </div>
          )}

          <div className="relative h-full flex flex-col items-center justify-center p-8">
            {/* Company Logo */}
            {layout.showCompanyLogo && (
              <div className="mb-8">
                {companyLogo ? (
                  <img
                    src={companyLogo}
                    alt="Company Logo"
                    className="max-h-12 max-w-[180px] object-contain"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                ) : (
                  <h3 className="text-xl font-bold" style={{ color: '#ffffff' }}>
                    {user.companyName || 'COMPANY'}
                  </h3>
                )}
              </div>
            )}

            {/* QR Code */}
            {layout.showQRCode && (
              <div className="bg-white p-5 rounded-2xl shadow-2xl">
                <QRCode
                  value={cardUrl}
                  size={150}
                  level="H"
                  fgColor={colors.primary}
                  bgColor="#ffffff"
                />
              </div>
            )}

            {/* Employee Info */}
            <div className="mt-8 text-center">
              <p className="text-lg font-bold" style={{ color: '#ffffff' }}>
                {user.fullName}
              </p>
              <p className="text-sm opacity-80" style={{ color: '#ffffff' }}>
                {user.jobTitle}
              </p>
            </div>

            {/* Branding */}
            <div className="mt-6 text-center">
              <p className="text-xl font-bold italic opacity-70" style={{ color: '#ffffff' }}>
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
