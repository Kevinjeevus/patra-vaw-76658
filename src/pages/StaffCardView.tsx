import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Share2, User, Building2, Mail, Globe, Phone as PhoneIcon, BadgeCheck, Download } from 'lucide-react';
import { CorporateIDCard } from '@/components/card/CorporateIDCard';
import { updateOGMetaTags } from '@/lib/og-utils';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

interface StaffData {
    fullName: string;
    jobTitle: string;
    email: string;
    phone?: string;
    avatar_url?: string;
    staffId: string;
    companyName: string;
    companyVanity: string;
    companyLogo?: string;
    displayParameters: string[];
    themeColor?: string;
    companyDescription?: string;
    companyWebsite?: string;
}

// Helper function to adjust color brightness
function adjustColor(hex: string, amount: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// Check if app is installed as PWA
function isPWAInstalled(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches || 
           (window.navigator as any).standalone === true;
}

export const StaffCardView: React.FC = () => {
    const { companyVanity, staffId } = useParams<{ companyVanity: string; staffId: string }>();
    const navigate = useNavigate();
    const [staffData, setStaffData] = useState<StaffData | null>(null);
    const [loading, setLoading] = useState(true);
    const [flipped, setFlipped] = useState(false);
    const [activeTab, setActiveTab] = useState<'profile' | 'company'>('profile');
    const [showPWAPrompt, setShowPWAPrompt] = useState(false);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll({ container: containerRef });
    
    // Scroll-based animations
    const cardScale = useTransform(scrollY, [0, 300], [1, 0.6]);
    const cardY = useTransform(scrollY, [0, 300], [0, -100]);
    const cardOpacity = useTransform(scrollY, [200, 350], [1, 0]);
    const infoOpacity = useTransform(scrollY, [100, 250], [0, 1]);
    const infoY = useTransform(scrollY, [100, 250], [50, 0]);
    const bgLightness = useTransform(scrollY, [0, 400], [0, 1]);
    
    const [bgProgress, setBgProgress] = useState(0);
    
    useMotionValueEvent(bgLightness, "change", (latest) => {
        setBgProgress(latest);
    });

    useEffect(() => {
        // Check PWA status
        if (!isPWAInstalled()) {
            setTimeout(() => setShowPWAPrompt(true), 2000);
        }
    }, []);

    useEffect(() => {
        const fetchStaffCard = async () => {
            if (!companyVanity || !staffId) {
                setLoading(false);
                return;
            }

            try {
                const { data: companyProfiles, error: companyError } = await supabase
                    .from('profiles')
                    .select('id, company_name, company_logo_url, display_parameters, bio')
                    .ilike('vanity_url', companyVanity)
                    .eq('account_type', 'company');

                if (companyError || !companyProfiles?.[0]) {
                    setLoading(false);
                    return;
                }

                const companyProfile = companyProfiles[0];

                const { data: employees, error: empError } = await supabase
                    .from('invited_employees')
                    .select('*')
                    .eq('company_profile_id', companyProfile.id)
                    .ilike('staff_id', staffId)
                    .eq('is_approved', true);

                const employee = employees?.[0];

                if (empError || !employee) {
                    setLoading(false);
                    return;
                }

                const submittedData = employee.data_submitted as any;
                const displayParams = companyProfile.display_parameters as any;

                setStaffData({
                    fullName: submittedData?.display_name || 'Employee',
                    jobTitle: employee.designation || submittedData?.job_title || 'Team Member',
                    email: submittedData?.email || '',
                    phone: submittedData?.phone || '',
                    avatar_url: submittedData?.avatar_url || '',
                    staffId: employee.staff_id || '',
                    companyName: companyProfile.company_name,
                    companyVanity: companyVanity,
                    companyLogo: companyProfile.company_logo_url || undefined,
                    displayParameters: Array.isArray(displayParams)
                        ? displayParams
                        : displayParams?.visibility || ['display_name', 'email', 'job_title'],
                    themeColor: displayParams?.cardViewTheme || '#8B1538',
                    companyDescription: companyProfile.bio || 'A technology and creative innovation company focused on AI, immersive media, and next-generation digital experiences.',
                    companyWebsite: displayParams?.website || '',
                });

                updateOGMetaTags({
                    title: `${submittedData?.display_name || 'Employee'} | ${companyProfile.company_name}`,
                    description: `${employee.designation || 'Staff Member'} at ${companyProfile.company_name}`,
                    image: submittedData?.avatar_url || '/placeholder.svg',
                    url: window.location.href,
                    type: 'profile'
                });

                setLoading(false);
            } catch (error) {
                console.error('Error fetching staff card:', error);
                setLoading(false);
            }
        };

        fetchStaffCard();
    }, [companyVanity, staffId]);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${staffData?.fullName} | ${staffData?.companyName}`,
                    url: window.location.href
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#8B1538] to-[#5a0f25] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-white mx-auto mb-4" />
                    <p className="text-white/70">Loading...</p>
                </div>
            </div>
        );
    }

    if (!staffData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#8B1538] to-[#5a0f25] flex items-center justify-center">
                <div className="text-center max-w-md px-6">
                    <h1 className="text-6xl font-bold mb-4 text-white">404</h1>
                    <p className="text-xl text-white/70 mb-6">Staff card not found</p>
                    <Button onClick={() => navigate('/')} variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-none">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Go Home
                    </Button>
                </div>
            </div>
        );
    }

    const themeColor = staffData.themeColor || '#8B1538';
    const darkerTheme = adjustColor(themeColor, -40);
    
    // Interpolate background color based on scroll
    const bgStyle = {
        background: bgProgress < 0.5 
            ? `linear-gradient(135deg, ${themeColor} 0%, ${darkerTheme} 100%)`
            : `linear-gradient(135deg, 
                rgb(${Math.round(139 + (255-139) * (bgProgress - 0.5) * 2)}, ${Math.round(21 + (255-21) * (bgProgress - 0.5) * 2)}, ${Math.round(56 + (255-56) * (bgProgress - 0.5) * 2)}) 0%, 
                rgb(${Math.round(90 + (248-90) * (bgProgress - 0.5) * 2)}, ${Math.round(15 + (250-15) * (bgProgress - 0.5) * 2)}, ${Math.round(37 + (252-37) * (bgProgress - 0.5) * 2)}) 100%)`
    };

    return (
        <div 
            ref={containerRef}
            className="min-h-screen overflow-y-auto relative"
            style={bgStyle}
        >
            {/* Ambient glow effects */}
            <div 
                className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[100px] opacity-30 pointer-events-none transition-opacity duration-500"
                style={{ 
                    backgroundColor: adjustColor(themeColor, 30),
                    opacity: 0.3 * (1 - bgProgress)
                }}
            />

            {/* Fixed Header */}
            <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 safe-area-inset-top">
                <div className="flex items-center justify-between max-w-lg mx-auto">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(-1)}
                        className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>

                    {/* Company Logo/Name */}
                    <div className="flex items-center gap-2">
                        {staffData.companyLogo ? (
                            <img 
                                src={staffData.companyLogo} 
                                alt={staffData.companyName}
                                className="h-8 object-contain filter brightness-0 invert"
                            />
                        ) : (
                            <span className="text-white font-bold text-lg tracking-tight">{staffData.companyName}</span>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleShare}
                            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10"
                        >
                            <Share2 className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </header>

            {/* Mode Tabs */}
            <div className="fixed top-20 left-0 right-0 z-40 px-4">
                <div className="flex justify-center">
                    <div className="bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/10">
                        <div className="flex gap-1">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                                    activeTab === 'profile' 
                                        ? 'bg-white text-slate-900 shadow-lg' 
                                        : 'text-white/80 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                <User className="w-4 h-4" />
                                Profile
                            </button>
                            <button
                                onClick={() => setActiveTab('company')}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                                    activeTab === 'company' 
                                        ? 'bg-white text-slate-900 shadow-lg' 
                                        : 'text-white/80 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                <Building2 className="w-4 h-4" />
                                Company
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="relative min-h-[200vh] px-4 pt-36">
                
                {/* Floating ID Card Hero */}
                <motion.div 
                    className="sticky top-36 flex flex-col items-center"
                    style={{
                        scale: cardScale,
                        y: cardY,
                        opacity: cardOpacity,
                    }}
                >
                    {/* Card glow effect */}
                    <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[520px] rounded-3xl blur-[60px] opacity-40"
                        style={{ backgroundColor: adjustColor(themeColor, 40) }}
                    />
                    
                    {/* Floating animation wrapper */}
                    <motion.div
                        animate={{ 
                            y: [0, -10, 0],
                            rotateY: [0, 2, 0, -2, 0]
                        }}
                        transition={{ 
                            duration: 6, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                        }}
                        className="relative"
                    >
                        <CorporateIDCard
                            user={{
                                fullName: staffData.fullName,
                                jobTitle: staffData.jobTitle,
                                email: staffData.email,
                                phone: staffData.phone,
                                avatarUrl: staffData.avatar_url,
                                companyName: staffData.companyName,
                                staffId: staffData.staffId,
                                companyVanity: staffData.companyVanity,
                            }}
                            companyLogo={staffData.companyLogo}
                            displayParameters={staffData.displayParameters}
                            isFlipped={flipped}
                            onFlip={() => setFlipped(!flipped)}
                            scale={1}
                        />
                    </motion.div>

                    {/* Tap to flip hint */}
                    <motion.p 
                        className="mt-6 text-white/60 text-sm font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        👆 Tap card to flip
                    </motion.p>
                </motion.div>

                {/* Scroll-reveal Info Section */}
                <motion.div 
                    className="relative z-10 mt-[420px] pb-40"
                    style={{
                        opacity: infoOpacity,
                        y: infoY,
                    }}
                >
                    <div className="bg-white rounded-t-[40px] shadow-2xl min-h-screen">
                        <div className="max-w-lg mx-auto px-6 py-10">
                            {/* Drag handle */}
                            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8" />

                            <AnimatePresence mode="wait">
                                {activeTab === 'profile' ? (
                                    <motion.div
                                        key="profile"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {/* Name & ID Section */}
                                        <div className="mb-8">
                                            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2 mb-2">
                                                {staffData.fullName}
                                                <BadgeCheck className="w-6 h-6 text-blue-500" />
                                            </h1>
                                            <p className="text-lg text-slate-500 mb-2">{staffData.jobTitle}</p>
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
                                                <span className="text-xs text-slate-500 uppercase tracking-wider">Corporate ID</span>
                                                <span className="text-sm font-bold text-slate-900 font-mono">{staffData.staffId}</span>
                                            </div>
                                        </div>

                                        {/* Contact Actions */}
                                        <div className="grid grid-cols-3 gap-3 mb-8">
                                            {staffData.email && (
                                                <a
                                                    href={`mailto:${staffData.email}`}
                                                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors"
                                                >
                                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <Mail className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                    <span className="text-xs font-medium text-slate-600">Email</span>
                                                </a>
                                            )}
                                            {staffData.companyWebsite && (
                                                <a
                                                    href={staffData.companyWebsite}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors"
                                                >
                                                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                                        <Globe className="w-5 h-5 text-green-600" />
                                                    </div>
                                                    <span className="text-xs font-medium text-slate-600">Website</span>
                                                </a>
                                            )}
                                            {staffData.phone && (
                                                <a
                                                    href={`tel:${staffData.phone}`}
                                                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors"
                                                >
                                                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                                                        <PhoneIcon className="w-5 h-5 text-purple-600" />
                                                    </div>
                                                    <span className="text-xs font-medium text-slate-600">Call</span>
                                                </a>
                                            )}
                                        </div>

                                        {/* Company info badge */}
                                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200">
                                            {staffData.companyLogo ? (
                                                <img src={staffData.companyLogo} alt="" className="w-10 h-10 object-contain" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center">
                                                    <Building2 className="w-5 h-5 text-slate-500" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-semibold text-slate-900">{staffData.companyName}</p>
                                                <p className="text-xs text-slate-500">Verified Organization</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="company"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {/* Company Header */}
                                        <div className="mb-8">
                                            <div className="flex items-center gap-4 mb-4">
                                                {staffData.companyLogo ? (
                                                    <img src={staffData.companyLogo} alt="" className="w-16 h-16 object-contain" />
                                                ) : (
                                                    <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
                                                        <Building2 className="w-8 h-8 text-slate-400" />
                                                    </div>
                                                )}
                                                <div>
                                                    <h2 className="text-2xl font-bold text-slate-900">{staffData.companyName}</h2>
                                                    <div className="flex items-center gap-1 text-green-600">
                                                        <BadgeCheck className="w-4 h-4" />
                                                        <span className="text-sm font-medium">Verified Company</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* About Section */}
                                        <div className="mb-8">
                                            <h3 className="text-lg font-semibold text-slate-900 mb-3">About {staffData.companyName}</h3>
                                            <p className="text-slate-600 leading-relaxed">
                                                {staffData.companyDescription}
                                            </p>
                                        </div>

                                        {/* Quick Actions */}
                                        <div className="space-y-3">
                                            {staffData.companyWebsite && (
                                                <a
                                                    href={staffData.companyWebsite}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors"
                                                >
                                                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                                        <Globe className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-medium text-slate-900">Visit Website</p>
                                                        <p className="text-sm text-slate-500">{staffData.companyWebsite}</p>
                                                    </div>
                                                </a>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </main>

            {/* PWA Install Prompt */}
            <AnimatePresence>
                {showPWAPrompt && !isPWAInstalled() && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25 }}
                        className="fixed bottom-6 left-4 right-4 z-50"
                    >
                        <div className="max-w-lg mx-auto">
                            <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                                        <Download className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-white">Save to Phone</p>
                                        <p className="text-xs text-white/60">Tap <span className="text-white/80">Share</span> → <span className="text-white/80">Add to Home Screen</span></p>
                                    </div>
                                    <button
                                        onClick={() => setShowPWAPrompt(false)}
                                        className="text-white/40 hover:text-white/80 text-xl font-light"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
