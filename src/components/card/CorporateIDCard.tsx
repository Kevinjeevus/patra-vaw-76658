import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export interface CorporateIDCardProps {
    user: {
        fullName: string;
        jobTitle: string;
        email: string;
        phone?: string;
        avatarUrl?: string;
        companyName?: string;
        vanityUrl?: string;
        bio?: string;
        address?: string;
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

    // Card dimensions for vertical layout - standardized ID-1 size ratio
    const width = 320;
    const height = 500;

    const cardUrl = `${window.location.origin}/${user.vanityUrl || ''}`;

    const renderParameter = (id: string) => {
        if (!displayParameters.includes(id)) return null;

        switch (id) {
            case 'email':
                return (
                    <div className="flex items-center gap-3 text-slate-600 mb-2 group/item" key={id}>
                        <div className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center border border-indigo-100 group-hover/item:bg-indigo-100 transition-colors">
                            <Mail className="w-3.5 h-3.5 text-indigo-600" />
                        </div>
                        <span className="text-[11px] font-semibold truncate max-w-[200px] tracking-tight">{user.email}</span>
                    </div>
                );
            case 'phone':
                if (!user.phone) return null;
                return (
                    <div className="flex items-center gap-3 text-slate-600 mb-2 group/item" key={id}>
                        <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100 group-hover/item:bg-emerald-100 transition-colors">
                            <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <span className="text-[11px] font-semibold tracking-tight">{user.phone}</span>
                    </div>
                );
            case 'address':
                if (!user.address) return null;
                return (
                    <div className="flex items-center gap-3 text-slate-600 mb-2 group/item" key={id}>
                        <div className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center border border-amber-100 group-hover/item:bg-amber-100 transition-colors">
                            <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        </div>
                        <span className="text-[10px] font-semibold leading-tight line-clamp-2 max-w-[200px] tracking-tight">{user.address}</span>
                    </div>
                );
            case 'bio':
                 if (!user.bio) return null;
                 return (
                     <div className="text-center px-8 mt-2 mb-6" key={id}>
                         <p className="text-[10px] text-slate-400 font-medium italic line-clamp-3 leading-relaxed">
                             "{user.bio}"
                         </p>
                     </div>
                 );
            default:
                return null;
        }
    };

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
                {/* Front Side */}
                <div className="card-face card-front bg-white border border-slate-200">
                    <div className="h-full flex flex-col items-center pt-8 pb-12 px-6 relative overflow-hidden">
                        {/* Realistic Lanyard Slot */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 opacity-80">
                            <div className="w-14 h-4 rounded-full bg-slate-100 border-2 border-slate-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"></div>
                            <div className="w-2 h-6 bg-slate-200 rounded-b-sm border-x border-b border-slate-300"></div>
                        </div>

                        {/* Premium Header Decoration */}
                        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-br from-indigo-600/5 via-transparent to-transparent"></div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/[0.03] rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>

                        {/* Company Logo Area */}
                        <div className="mt-10 mb-8 h-12 flex items-center justify-center w-full px-4">
                            {companyLogo ? (
                                <img src={companyLogo} alt="Company Logo" className="max-h-full max-w-full object-contain filter drop-shadow-sm" />
                            ) : (
                                <div className="text-slate-900 font-black text-xl tracking-tighter flex items-center gap-2">
                                    <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xs shadow-lg shadow-indigo-200">P</div>
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
                                        {user.companyName || 'CORPORATE'}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Profile Image with Dynamic Ring */}
                        <div className="relative mb-8 pt-2">
                            <div className="relative">
                                {/* Holographic Authentication Ring */}
                                <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/20 via-sky-400/20 to-emerald-500/20 rounded-full animate-spin-slow opacity-60 blur-md"></div>
                                
                                <div className="relative w-40 h-40 rounded-full p-1 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-slate-100">
                                    <div className="w-full h-full rounded-full overflow-hidden bg-slate-50 border-2 border-white">
                                        {user.avatarUrl ? (
                                            <img src={user.avatarUrl} alt={user.fullName} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-200">
                                                <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Authenticated Badge */}
                                <div className="absolute -bottom-1 right-2 bg-indigo-600 text-white p-2.5 rounded-2xl shadow-xl border-4 border-white">
                                    <ShieldCheck className="w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        {/* Name & Title Section */}
                        <div className="text-center mb-6 space-y-1">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none px-2">
                                {user.fullName || 'Member Name'}
                            </h2>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
                                <p className="text-indigo-600 font-bold text-[10px] uppercase tracking-widest">
                                    {user.jobTitle || 'Corporate Member'}
                                </p>
                            </div>
                        </div>

                        {/* Bio / Description */}
                        {renderParameter('bio')}

                        {/* Extra Details - Pushed to bottom */}
                        <div className="w-full mt-auto space-y-1.5 px-4">
                            {['email', 'phone', 'address'].map(id => renderParameter(id))}
                        </div>

                        {/* Decorative Security Line */}
                        <div className="mt-10 w-full relative flex items-center justify-center">
                            <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                            <div className="relative bg-white px-4 flex items-center gap-1.5">
                                <div className="w-1 h-1 rounded-full bg-indigo-600 animate-pulse"></div>
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Verifiable Digital ID</span>
                                <div className="w-1 h-1 rounded-full bg-indigo-600 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back Side - Dark Premium Theme */}
                <div className="card-face card-back bg-[#020617] text-white">
                    <div className="h-full flex flex-col items-center justify-between py-12 px-8 relative overflow-hidden">
                        {/* Animated Grid Background */}
                        <div className="absolute inset-0 opacity-[0.05]" style={{ 
                            backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)', 
                            backgroundSize: '24px 24px' 
                        }}></div>
                        
                        {/* Glow Effects */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                        {/* Back Header Logo */}
                        <div className="h-10 flex items-center justify-center relative">
                            {companyLogo ? (
                                <img src={companyLogo} alt="Company Logo" className="max-h-full max-w-[140px] object-contain brightness-0 invert opacity-90" />
                            ) : (
                                <div className="text-white font-black text-xl tracking-tighter uppercase italic opacity-40">
                                    {user.companyName || 'PATRA'}
                                </div>
                            )}
                        </div>

                        {/* Centered QR Experience */}
                        <div className="flex flex-col items-center relative group">
                            <div className="absolute -inset-10 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>
                            
                            <div className="relative">
                                {/* Decorative corners */}
                                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-indigo-500 rounded-tl-2xl"></div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-indigo-500 rounded-tr-2xl"></div>
                                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-indigo-500 rounded-bl-2xl"></div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-indigo-500 rounded-br-2xl"></div>
                                
                                <div className="bg-white p-5 rounded-3xl shadow-[0_0_80px_rgba(79,70,229,0.2)]">
                                    <QRCode
                                        value={cardUrl}
                                        size={140}
                                        level="H"
                                        fgColor="#020617"
                                        bgColor="#ffffff"
                                    />
                                </div>
                            </div>

                            <div className="mt-8 text-center space-y-2">
                                <p className="text-indigo-400 font-black text-[10px] uppercase tracking-[0.4em] drop-shadow-sm">
                                    SCAN TO CONNECT
                                </p>
                                <div className="flex flex-col px-4 py-1.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
                                    <p className="text-[10px] text-white/50 font-mono lowercase tracking-tight">
                                        {window.location.host}/{user.vanityUrl}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Back Footer */}
                        <div className="text-center w-full space-y-3 pb-2">
                            <div className="flex items-center justify-center gap-4">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-2xl font-black tracking-tighter italic text-white/90">Patra</span>
                                    <div className="w-1 h-1 bg-indigo-500 rounded-full mt-2"></div>
                                </div>
                                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
                            </div>
                            <p className="text-[9px] text-white/20 uppercase tracking-[0.3em] font-bold">
                                Authenticated Platform Access
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
                    transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
                    transform-style: preserve-3d;
                }

                .card-face {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                    border-radius: 44px;
                    box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.3);
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

                .animate-spin-slow {
                    animation: spin 12s linear infinite;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .animate-in {
                    animation: cardIn 1.2s cubic-bezier(0.16, 1, 0.3, 1);
                }

                @keyframes cardIn {
                    from {
                        opacity: 0;
                        transform: translateY(40px) scale(0.9) rotateX(-15deg);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1) rotateX(0);
                    }
                }
            `}</style>
        </div>
    );
};

// Simplified icon component
const ShieldCheck = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
        <path d="m9 12 2 2 4-4"/>
    </svg>
);
