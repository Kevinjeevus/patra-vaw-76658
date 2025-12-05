import React, { useState } from 'react';
import { Nfc, Mail, Phone } from 'lucide-react';
import QRCode from 'react-qr-code';

export interface CardData {
    fullName: string;
    jobTitle: string;
    company: string;
    email: string;
    phone: string;
    avatarUrl: string;
    vanityUrl: string;
    cardConfig?: any;
    bannerType?: 'gradient' | 'color' | 'image' | 'blurred' | 'pattern';
    bannerValue?: string;
}

interface DigitalCardProps {
    cardData: CardData;
    username: string;
    isFlipped?: boolean;
    onFlip?: () => void;
    width?: number;
    height?: number;
    scale?: number;
}

export const DigitalCard: React.FC<DigitalCardProps> = ({
    cardData,
    username,
    isFlipped: controlledFlipped,
    onFlip,
    width = 400,
    height = 250,
    scale = 1
}) => {
    const [internalFlipped, setInternalFlipped] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const isFlipped = controlledFlipped !== undefined ? controlledFlipped : internalFlipped;
    const handleFlip = () => {
        if (onFlip) {
            onFlip();
        } else {
            setInternalFlipped(!internalFlipped);
        }
    };

    const cardUrl = `${window.location.origin}/${username}`;

    // Helper function to generate card background styles from cardConfig
    const getCardBackgroundStyle = (config: any, isBack = false) => {
        const base: React.CSSProperties = {
            borderRadius: `${config?.borderRadius || 12}px`,
        };

        const bgImage = isBack ? config?.backBackgroundImage : config?.backgroundImage;
        const bgColor = isBack ? config?.backBackgroundColor : config?.backgroundColor;
        const bgPattern = isBack ? config?.backBackgroundPattern : config?.backgroundPattern;
        const useGrad = isBack ? config?.backUseGradient : config?.useGradient;
        const gradColors = isBack ? config?.backGradientColors : config?.gradientColors;
        const gradDir = isBack ? config?.backGradientDirection : config?.gradientDirection;

        // Priority: Image > Gradient > Solid Color + Pattern
        if (bgImage) {
            return {
                ...base,
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            };
        }

        if (useGrad && gradColors?.length >= 2) {
            const direction = {
                'to-r': 'to right',
                'to-br': 'to bottom right',
                'to-b': 'to bottom',
                'to-bl': 'to bottom left'
            }[gradDir] || 'to bottom right';

            return {
                ...base,
                backgroundImage: `linear-gradient(${direction}, ${gradColors.join(', ')})`,
            };
        }

        const patterns: Record<string, string> = {
            none: '',
            dots: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            grid: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            waves: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)`,
        };

        return {
            ...base,
            backgroundColor: bgColor || '#1e293b',
            backgroundImage: bgPattern && bgPattern !== 'none' ? patterns[bgPattern] : undefined,
            backgroundSize: bgPattern === 'dots' || bgPattern === 'grid' ? '20px 20px' : undefined,
        };
    };

    return (
        <div className="perspective-card" style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
            <div
                className={`card-container ${isFlipped ? 'flipped' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleFlip}
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    transform: isHovered && !isFlipped ? 'translateY(-8px) rotateX(2deg) rotateY(-2deg)' :
                        isHovered && isFlipped ? 'translateY(-8px) rotateX(2deg) rotateY(182deg)' :
                            isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
            >
                {/* Front Side */}
                <div className="card-face card-front">
                    <div
                        className="absolute inset-0 rounded-xl overflow-hidden"
                        style={getCardBackgroundStyle(cardData.cardConfig, false)}
                    >
                        {/* Subtle texture overlay */}
                        <div className="absolute inset-0 opacity-5" style={{
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\\"100\\" height=\\"100\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cfilter id=\\"noise\\"%3E%3CfeTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.9\\" numOctaves=\\"4\\" /%3E%3C/filter%3E%3Crect width=\\"100\\" height=\\"100\\" filter=\\"url(%23noise)\\" opacity=\\"0.4\\"/%3E%3C/svg%3E")'
                        }}></div>

                        {/* Logo top left */}
                        <div className="absolute top-4 left-4 text-white/90 text-xs font-semibold tracking-wide">
                            Patra
                        </div>

                        {/* NFC Icon top right */}
                        <div className="absolute top-4 right-4">
                            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                                <Nfc className="w-4 h-4 text-white/80" />
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="relative h-full p-6" style={{ position: 'relative' }}>
                            {(() => {
                                const config = cardData.cardConfig || {};
                                const positions = config.positions || {
                                    avatar: { x: 20, y: 60 },
                                    name: { x: 140, y: 60 },
                                    jobTitle: { x: 140, y: 90 },
                                    company: { x: 140, y: 115 },
                                    email: { x: 140, y: 150 },
                                    phone: { x: 140, y: 175 },
                                };

                                // Scale positions based on width/height if needed, but for now assume fixed 400x250
                                // If width/height changes, we might need to scale the positions or use percentages

                                return (
                                    <>
                                        {/* Avatar */}
                                        {cardData.avatarUrl && (
                                            <div style={{ position: 'absolute', left: `${positions.avatar?.x || 20}px`, top: `${positions.avatar?.y || 60}px` }}>
                                                <img
                                                    src={cardData.avatarUrl}
                                                    alt={cardData.fullName}
                                                    className="rounded-lg object-cover border-2 border-white/20 shadow-xl"
                                                    style={{ width: `${config.avatarSize || 96}px`, height: `${config.avatarSize || 96}px` }}
                                                />
                                            </div>
                                        )}

                                        {/* Name */}
                                        <div style={{ position: 'absolute', left: `${positions.name?.x || 140}px`, top: `${positions.name?.y || 60}px` }}>
                                            <h2 className="font-bold" style={{
                                                fontSize: `${(config.fontSize || 16) + 4}px`,
                                                color: config.textColor || '#ffffff',
                                                fontFamily: config.fontFamily || 'Inter',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {cardData.fullName}
                                            </h2>
                                        </div>

                                        {/* Job Title */}
                                        {cardData.jobTitle && (config.showJobTitle !== false) && (
                                            <div style={{ position: 'absolute', left: `${positions.jobTitle?.x || 140}px`, top: `${positions.jobTitle?.y || 90}px` }}>
                                                <p style={{
                                                    fontSize: `${(config.fontSize || 16) - 2}px`,
                                                    color: config.textColor || '#ffffff',
                                                    fontFamily: config.fontFamily || 'Inter',
                                                    opacity: 0.8,
                                                    whiteSpace: 'nowrap'
                                                }}>
                                                    {cardData.jobTitle}
                                                </p>
                                            </div>
                                        )}

                                        {/* Company */}
                                        {cardData.company && (config.showCompany !== false) && (
                                            <div style={{ position: 'absolute', left: `${positions.company?.x || 140}px`, top: `${positions.company?.y || 115}px` }}>
                                                <p style={{
                                                    fontSize: `${(config.fontSize || 16) - 4}px`,
                                                    color: config.textColor || '#ffffff',
                                                    fontFamily: config.fontFamily || 'Inter',
                                                    opacity: 0.6,
                                                    whiteSpace: 'nowrap'
                                                }}>
                                                    {cardData.company}
                                                </p>
                                            </div>
                                        )}

                                        {/* Email */}
                                        {cardData.email && (config.showEmail !== false) && (
                                            <div style={{ position: 'absolute', left: `${positions.email?.x || 140}px`, top: `${positions.email?.y || 150}px` }} className="flex items-center gap-2">
                                                <Mail className="w-3 h-3 flex-shrink-0" style={{ color: config.textColor || '#ffffff', opacity: 0.9 }} />
                                                <span style={{
                                                    fontSize: `${(config.fontSize || 16) - 4}px`,
                                                    color: config.textColor || '#ffffff',
                                                    fontFamily: config.fontFamily || 'Inter',
                                                    opacity: 0.9,
                                                    whiteSpace: 'nowrap'
                                                }}>{cardData.email}</span>
                                            </div>
                                        )}

                                        {/* Phone */}
                                        {cardData.phone && (config.showPhone !== false) && (
                                            <div style={{ position: 'absolute', left: `${positions.phone?.x || 140}px`, top: `${positions.phone?.y || 175}px` }} className="flex items-center gap-2">
                                                <Phone className="w-3 h-3 flex-shrink-0" style={{ color: config.textColor || '#ffffff', opacity: 0.9 }} />
                                                <span style={{
                                                    fontSize: `${(config.fontSize || 16) - 4}px`,
                                                    color: config.textColor || '#ffffff',
                                                    fontFamily: config.fontFamily || 'Inter',
                                                    opacity: 0.9,
                                                    whiteSpace: 'nowrap'
                                                }}>{cardData.phone}</span>
                                            </div>
                                        )}
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                </div>

                {/* Back Side */}
                <div className="card-face card-back">
                    <div
                        className="absolute inset-0 rounded-xl overflow-hidden"
                        style={getCardBackgroundStyle(cardData.cardConfig, true)}
                    >
                        {/* Subtle texture overlay */}
                        <div className="absolute inset-0 opacity-5" style={{
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\\"100\\" height=\\"100\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cfilter id=\\"noise\\"%3E%3CfeTurbulance type=\\"fractalNoise\\" baseFrequency=\\"0.9\\" numOctaves=\\"4\\" /%3E%3C/filter%3E%3Crect width=\\"100\\" height=\\"100\\" filter=\\"url(%23noise)\\" opacity=\\"0.4\\"/%3E%3C/svg%3E")'
                        }}></div>

                        {/* Logo top left */}
                        <div className="absolute top-4 left-4 text-white/90 text-xs font-semibold tracking-wide">
                            Patra
                        </div>

                        {/* QR Code with saved position */}
                        <div className="relative h-full flex flex-col items-center justify-center p-6">
                            {(() => {
                                const qrPos = cardData.cardConfig?.backPositions?.qrCode || { x: 0, y: 0 };
                                const qrSize = cardData.cardConfig?.qrCodeSize || 110;
                                const qrStyle = cardData.cardConfig?.qrCodeStyle || 'square';

                                return (
                                    <div style={{
                                        position: qrPos.x !== 0 || qrPos.y !== 0 ? 'absolute' : 'relative',
                                        left: qrPos.x !== 0 ? `${qrPos.x}px` : undefined,
                                        top: qrPos.y !== 0 ? `${qrPos.y}px` : undefined,
                                    }}>
                                        <div className={`bg-white p-4 shadow-2xl ${qrStyle === 'rounded' ? 'rounded-2xl' : 'rounded-lg'}`}>
                                            <QRCode
                                                value={cardUrl}
                                                size={qrSize}
                                                level="M"
                                                fgColor="#000000"
                                                bgColor="#ffffff"
                                            />
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* Thermochromic ink effect username */}
                            <p className="mt-4 text-xs text-white/30 font-mono tracking-wider" style={{
                                textShadow: '0 0 10px rgba(255,255,255,0.1)',
                                letterSpacing: '0.15em'
                            }}>
                                {username}
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
          transition: transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1);
          transform-style: preserve-3d;
        }

        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 
                      0 0 0 1px rgba(255, 255, 255, 0.1) inset;
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

        /* Matte finish effect */
        .card-face::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 12px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(255, 255, 255, 0) 50%,
            rgba(0, 0, 0, 0.05) 100%
          );
          pointer-events: none;
        }
      `}</style>
        </div>
    );
};
