import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Share2, User, Building2, Mail, Globe, Phone as PhoneIcon, BadgeCheck, Download, ChevronUp } from 'lucide-react';
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

// PWA install prompt interface
interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const StaffCardView: React.FC = () => {
    const { companyVanity, staffId } = useParams<{ companyVanity: string; staffId: string }>();
    const navigate = useNavigate();
    const [staffData, setStaffData] = useState<StaffData | null>(null);
    const [loading, setLoading] = useState(true);
    const [flipped, setFlipped] = useState(false);
    const [activeTab, setActiveTab] = useState<'profile' | 'company'>('profile');
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [canInstall, setCanInstall] = useState(false);
    
    const { scrollY } = useScroll();
    
    // Scroll-based animations - card shrinks and moves up
    const cardScale = useTransform(scrollY, [0, 300], [1, 0.85]);
    const cardY = useTransform(scrollY, [0, 300], [0, -80]);
    
    // Bottom sheet slides up from bottom
    const sheetY = useTransform(scrollY, [0, 200], ['100%', '0%']);
    const sheetOpacity = useTransform(scrollY, [50, 200], [0, 1]);
    
    // Track scroll progress for UI hints
    const [scrollProgress, setScrollProgress] = useState(0);
    
    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrollProgress(Math.min(latest / 300, 1));
    });

    // PWA install prompt capture
    useEffect(() => {
        const handleBeforeInstall = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setCanInstall(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstall);

        // Check if already installed
        if (isPWAInstalled()) {
            setCanInstall(false);
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
        };
    }, []);

    const handleInstallPWA = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                setCanInstall(false);
            }
            setDeferredPrompt(null);
        }
    };

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

    return (
        <div className="min-h-[200vh] relative overflow-x-hidden">
            {/* Fixed themed background - always visible */}
            <div 
                className="fixed inset-0 z-0"
                style={{
                    background: `linear-gradient(135deg, ${themeColor} 0%, ${darkerTheme} 100%)`
                }}
            />
            
            {/* Ambient glow effects */}
            <div 
                className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[100px] opacity-30 pointer-events-none z-0"
                style={{ backgroundColor: adjustColor(themeColor, 30) }}
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

            {/* Floating ID Card - Fixed in center, scales on scroll */}
            <motion.div 
                className="fixed top-36 left-0 right-0 z-10 flex flex-col items-center pointer-events-none"
                style={{
                    scale: cardScale,
                    y: cardY,
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
                    className="relative pointer-events-auto"
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

                {/* Tap to flip hint - fades out on scroll */}
                <motion.p 
                    className="mt-6 text-white/60 text-sm font-medium"
                    style={{ opacity: 1 - scrollProgress * 2 }}
                >
                    👆 Tap card to flip
                </motion.p>
            </motion.div>

            {/* Scroll hint arrow - only visible when not scrolled */}
            <motion.div 
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
                style={{ opacity: 1 - scrollProgress * 3 }}
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-white/50"
                >
                    <ChevronUp className="w-6 h-6 rotate-180" />
                </motion.div>
                <span className="text-white/40 text-xs font-medium">Swipe up for details</span>
            </motion.div>

            {/* Frosted Glass Bottom Sheet */}
            <motion.div 
                className="fixed bottom-0 left-0 right-0 z-40"
                style={{
                    y: sheetY,
                    opacity: sheetOpacity,
                }}
            >
                <div className="max-w-lg mx-auto">
                    <div 
                        className="bg-white/80 backdrop-blur-xl rounded-t-[32px] shadow-2xl border-t border-white/50 overflow-hidden"
                        style={{
                            minHeight: '60vh',
                            maxHeight: '75vh',
                        }}
                    >
                        {/* Drag handle */}
                        <div className="flex justify-center pt-4 pb-2">
                            <div className="w-12 h-1.5 bg-slate-300/60 rounded-full" />
                        </div>

                        <div className="px-6 pb-8 overflow-y-auto" style={{ maxHeight: 'calc(75vh - 80px)' }}>
                            <AnimatePresence mode="wait">
                                {activeTab === 'profile' ? (
                                    <motion.div
                                        key="profile"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        {/* Identity Section */}
                                        <div className="text-center pt-2">
                                            <h1 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
                                                {staffData.fullName}
                                                <BadgeCheck className="w-5 h-5 text-blue-500" />
                                            </h1>
                                            <p className="text-slate-500 mt-1">{staffData.jobTitle}</p>
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100/80 rounded-full mt-3">
                                                <span className="text-xs text-slate-500 uppercase tracking-wider">Corporate ID</span>
                                                <span className="text-sm font-bold text-slate-900 font-mono">{staffData.staffId}</span>
                                            </div>
                                        </div>

                                        {/* About Company */}
                                        <div className="bg-slate-50/50 rounded-2xl p-4">
                                            <h3 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                                <Building2 className="w-4 h-4" />
                                                About {staffData.companyName}
                                            </h3>
                                            <p className="text-sm text-slate-600 leading-relaxed">
                                                {staffData.companyDescription}
                                            </p>
                                        </div>

                                        {/* Contact Row */}
                                        <div className="grid grid-cols-3 gap-3">
                                            {staffData.email && (
                                                <a
                                                    href={`mailto:${staffData.email}`}
                                                    className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-blue-50/80 hover:bg-blue-100/80 transition-colors"
                                                >
                                                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                                                        <Mail className="w-4 h-4 text-white" />
                                                    </div>
                                                    <span className="text-xs font-medium text-slate-700">Email</span>
                                                </a>
                                            )}
                                            {staffData.companyWebsite && (
                                                <a
                                                    href={staffData.companyWebsite}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-green-50/80 hover:bg-green-100/80 transition-colors"
                                                >
                                                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                                                        <Globe className="w-4 h-4 text-white" />
                                                    </div>
                                                    <span className="text-xs font-medium text-slate-700">Website</span>
                                                </a>
                                            )}
                                            {staffData.phone && (
                                                <a
                                                    href={`tel:${staffData.phone}`}
                                                    className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-purple-50/80 hover:bg-purple-100/80 transition-colors"
                                                >
                                                    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                                                        <PhoneIcon className="w-4 h-4 text-white" />
                                                    </div>
                                                    <span className="text-xs font-medium text-slate-700">Call</span>
                                                </a>
                                            )}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="company"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        {/* Company Header */}
                                        <div className="flex items-center gap-4 pt-2">
                                            {staffData.companyLogo ? (
                                                <img src={staffData.companyLogo} alt="" className="w-14 h-14 object-contain" />
                                            ) : (
                                                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                                                    <Building2 className="w-7 h-7 text-slate-400" />
                                                </div>
                                            )}
                                            <div>
                                                <h2 className="text-xl font-bold text-slate-900">{staffData.companyName}</h2>
                                                <div className="flex items-center gap-1 text-green-600">
                                                    <BadgeCheck className="w-4 h-4" />
                                                    <span className="text-sm font-medium">Verified Company</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* About Section */}
                                        <div className="bg-slate-50/50 rounded-2xl p-4">
                                            <h3 className="text-sm font-semibold text-slate-700 mb-2">About</h3>
                                            <p className="text-sm text-slate-600 leading-relaxed">
                                                {staffData.companyDescription}
                                            </p>
                                        </div>

                                        {/* Quick Actions */}
                                        {staffData.companyWebsite && (
                                            <a
                                                href={staffData.companyWebsite}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/80 hover:bg-slate-100/80 transition-colors"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                                    <Globe className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-slate-900">Visit Website</p>
                                                    <p className="text-sm text-slate-500 truncate">{staffData.companyWebsite}</p>
                                                </div>
                                            </a>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* PWA Install Button - Only show if installable */}
                            {canInstall && (
                                <motion.div 
                                    className="mt-6 pt-4 border-t border-slate-200/50"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <button
                                        onClick={handleInstallPWA}
                                        className="w-full py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-medium flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                                    >
                                        <Download className="w-5 h-5" />
                                        Save to Phone / Install App
                                    </button>
                                </motion.div>
                            )}

                            {/* iOS PWA hint - show on iOS if not installed */}
                            {!canInstall && !isPWAInstalled() && /iPhone|iPad|iPod/.test(navigator.userAgent) && (
                                <motion.div 
                                    className="mt-6 pt-4 border-t border-slate-200/50"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="text-center p-4 bg-slate-50/50 rounded-2xl">
                                        <p className="text-sm text-slate-600">
                                            <span className="font-medium">Save to Home Screen:</span>
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            Tap <Share2 className="w-3 h-3 inline-block mx-1" /> Share → Add to Home Screen
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Spacer for scroll */}
            <div className="h-[200vh]" />
        </div>
    );
};
