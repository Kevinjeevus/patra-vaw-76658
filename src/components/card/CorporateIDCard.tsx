import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { Mail, Phone } from 'lucide-react';

export interface CorporateIDCardProps {
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
        [key: string]: any;
    };
    companyLogo?: string;
    displayParameters?: string[];
    isFlipped?: boolean;
    onFlip?: () => void;
    scale?: number;
}

export const CorporateIDCard: React.FC<CorporateIDCardProps> = ({
    user,
    companyLogo,
    displayParameters = ['display_name', 'email', 'job_title'],
    isFlipped: controlledFlipped,
    onFlip,
    scale = 1
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

    // Card dimensions for vertical layout
    const width = 320;
    const height = 500;

    // Link QR code to company staff card page: /companyVanity/staffId
    const cardUrl = user.staffId && user.companyVanity
        ? `${window.location.origin}/${user.companyVanity}/${user.staffId}`
        : `${window.location.origin}/${user.vanityUrl || ''}`;

    return (
        <div
            className="perspective-card"
            style={{
                transform: `scale(${scale})`,
                transformOrigin: 'center center',
                width: `${width}px`,
                height: `${height}px`
            }}
        >
            <div
                className={`card-container ${isFlipped ? 'flipped' : ''}`}
                onClick={handleFlip}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                {/* Front Side - Clean White Theme */}
                <div className="card-face card-front bg-white border-2 border-slate-200">
                    <div className="h-full flex flex-col items-center pt-12 pb-8 px-8">

                        {/* Company Name at Top */}
                        <div className="mb-10 text-center">
                            {companyLogo ? (
                                <img src={companyLogo} alt="Company Logo" className="max-h-12 max-w-[200px] object-contain mx-auto" />
                            ) : (
                                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                                    {user.companyName || 'COMPANY'}
                                </h3>
                            )}
                        </div>

                        {/* Profile Picture in Squircle */}
                        <div className="mb-8">
                            <div className="w-32 h-32 rounded-3xl overflow-hidden bg-slate-100 border-2 border-slate-200">
                                {user.avatarUrl ? (
                                    <img src={user.avatarUrl} alt={user.fullName} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Full Name */}
                        <h2 className="text-xl font-bold text-slate-900 mb-2 text-center">
                            {user.fullName || 'Employee Name'}
                        </h2>

                        {/* Designation */}
                        <p className="text-sm text-slate-600 font-medium mb-6 text-center">
                            {user.jobTitle || 'Designation'}
                        </p>

                        {/* Contact Information */}
                        <div className="space-y-3 w-full">
                            {displayParameters.includes('email') && (
                                <div className="flex items-center gap-2 text-slate-700">
                                    <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
                                    <span className="text-xs truncate">{user.email}</span>
                                </div>
                            )}
                            {displayParameters.includes('phone') && user.phone && (
                                <div className="flex items-center gap-2 text-slate-700">
                                    <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
                                    <span className="text-xs">{user.phone}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Back Side - Same White Theme */}
                <div className="card-face card-back bg-white border-2 border-slate-200">
                    <div className="h-full flex flex-col items-center justify-between py-12 px-8">

                        {/* Company Name at Top */}
                        <div className="text-center">
                            {companyLogo ? (
                                <img src={companyLogo} alt="Company Logo" className="max-h-12 max-w-[200px] object-contain mx-auto" />
                            ) : (
                                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                                    {user.companyName || 'COMPANY'}
                                </h3>
                            )}
                        </div>

                        {/* QR Code - Simple, No Decorations */}
                        <div className="flex flex-col items-center">
                            <div className="bg-white p-4">
                                <QRCode
                                    value={cardUrl}
                                    size={160}
                                    level="H"
                                    fgColor="#1e293b"
                                    bgColor="#ffffff"
                                />
                            </div>
                        </div>

                        {/* Patra Branding */}
                        <div className="text-center">
                            <p className="text-2xl font-bold text-slate-900 tracking-tight italic">
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
