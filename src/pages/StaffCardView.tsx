import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Share2, Phone, Mail, Briefcase, BadgeCheck, ChevronUp } from 'lucide-react';
import { CorporateIDCard } from '@/components/card/CorporateIDCard';
import { updateOGMetaTags } from '@/lib/og-utils';
import { motion, AnimatePresence } from 'framer-motion';

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
}

export const StaffCardView: React.FC = () => {
    const { companyVanity, staffId } = useParams<{ companyVanity: string; staffId: string }>();
    const navigate = useNavigate();
    const [staffData, setStaffData] = useState<StaffData | null>(null);
    const [loading, setLoading] = useState(true);
    const [flipped, setFlipped] = useState(false);
    const [showInfoPanel, setShowInfoPanel] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const hideTimeoutRef = useRef<NodeJS.Timeout>();

    // Handle scroll to show/hide info panel
    const handleScroll = useCallback(() => {
        if (!containerRef.current) return;
        
        const currentScrollY = containerRef.current.scrollTop;
        const scrollDelta = lastScrollY - currentScrollY;
        
        // Threshold to prevent jitter
        if (Math.abs(scrollDelta) < 5) return;
        
        // Scrolling up (delta positive) - show panel
        if (scrollDelta > 0 && currentScrollY > 50) {
            setShowInfoPanel(true);
            // Auto-hide after 3 seconds
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = setTimeout(() => {
                setShowInfoPanel(false);
            }, 3000);
        }
        
        // Scrolling down - hide panel
        if (scrollDelta < 0) {
            setShowInfoPanel(false);
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        }
        
        setLastScrollY(currentScrollY);
    }, [lastScrollY]);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll, { passive: true });
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll]);

    useEffect(() => {
        return () => {
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        };
    }, []);

    useEffect(() => {
        const fetchStaffCard = async () => {
            if (!companyVanity || !staffId) {
                console.log('Missing params:', { companyVanity, staffId });
                setLoading(false);
                return;
            }

            console.log('Fetching staff card:', { companyVanity, staffId });

            try {
                // Find company profile by vanity URL (case-insensitive)
                const { data: companyProfiles, error: companyError } = await supabase
                    .from('profiles')
                    .select('id, company_name, company_logo_url, display_parameters')
                    .ilike('vanity_url', companyVanity)
                    .eq('account_type', 'company');

                console.log('Company query result:', { companyProfiles, companyError });

                if (companyError) {
                    console.error('Company query error:', companyError);
                    setLoading(false);
                    return;
                }

                const companyProfile = companyProfiles?.[0];
                if (!companyProfile) {
                    console.error('Company not found for vanity:', companyVanity);
                    setLoading(false);
                    return;
                }

                console.log('Found company:', companyProfile);

                // Find employee by staff_id (case-insensitive)
                const { data: employees, error: empError } = await supabase
                    .from('invited_employees')
                    .select('*')
                    .eq('company_profile_id', companyProfile.id)
                    .ilike('staff_id', staffId)
                    .eq('is_approved', true);

                console.log('Employee query result:', { employees, empError });

                const employee = employees?.[0];

                if (empError) {
                    console.error('Employee query error:', empError);
                    setLoading(false);
                    return;
                }

                if (!employee) {
                    console.error('Employee not found for staff_id:', staffId);
                    setLoading(false);
                    return;
                }

                console.log('Found employee:', employee);

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
                    themeColor: displayParams?.cardViewTheme || '#6366f1', // Default indigo
                });

                // Update Meta Tags for PWA
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

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-white mx-auto mb-4" />
                    <p className="text-white/70">Loading...</p>
                </div>
            </div>
        );
    }

    if (!staffData) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
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

    const themeColor = staffData.themeColor || '#6366f1';

    return (
        <div 
            ref={containerRef}
            className="min-h-screen overflow-auto relative"
            style={{ 
                background: `linear-gradient(135deg, ${themeColor} 0%, ${adjustColor(themeColor, -30)} 100%)` 
            }}
        >
            {/* Ambient glow effects */}
            <div 
                className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 pointer-events-none"
                style={{ backgroundColor: adjustColor(themeColor, 20) }}
            />
            <div 
                className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ backgroundColor: adjustColor(themeColor, -20) }}
            />

            {/* Floating Header */}
            <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
                <div className="flex items-center justify-between max-w-lg mx-auto">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>

                    {/* Company Logo */}
                    <div className="flex items-center gap-2">
                        {staffData.companyLogo ? (
                            <img 
                                src={staffData.companyLogo} 
                                alt={staffData.companyName}
                                className="h-8 object-contain filter brightness-0 invert"
                            />
                        ) : (
                            <span className="text-white font-bold text-lg">{staffData.companyName}</span>
                        )}
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={async () => {
                            if (navigator.share) {
                                try {
                                    await navigator.share({
                                        title: `${staffData.fullName} | ${staffData.companyName}`,
                                        url: window.location.href
                                    });
                                } catch (err) {
                                    console.log('Error sharing:', err);
                                }
                            } else {
                                navigator.clipboard.writeText(window.location.href);
                            }
                        }}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
                    >
                        <Share2 className="w-5 h-5" />
                    </Button>
                </div>
            </header>

            {/* Main Content - Card Hero */}
            <main className="relative flex flex-col items-center justify-center min-h-screen px-4 pt-20 pb-32">
                {/* ID Card Container with 3D perspective */}
                <motion.div 
                    className="relative"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    {/* Card shadow/reflection */}
                    <div 
                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[280px] h-[40px] rounded-[50%] blur-xl opacity-40"
                        style={{ backgroundColor: adjustColor(themeColor, -50) }}
                    />
                    
                    {/* The actual ID Card */}
                    <div className="relative transform hover:scale-105 transition-transform duration-500">
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
                            scale={1.1}
                        />
                    </div>
                </motion.div>

                {/* Tap hint */}
                <motion.p 
                    className="mt-8 text-white/50 text-xs uppercase tracking-widest font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    Tap card to flip
                </motion.p>

                {/* Scroll hint */}
                <motion.div 
                    className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                >
                    <ChevronUp className="w-5 h-5 text-white/40 animate-bounce" />
                    <span className="text-white/40 text-[10px] uppercase tracking-widest">Swipe up for details</span>
                </motion.div>
            </main>

            {/* Bottom Info Panel - Slides up on scroll */}
            <AnimatePresence>
                {showInfoPanel && (
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-2xl z-40"
                    >
                        <div className="max-w-lg mx-auto p-6 pb-8">
                            {/* Drag handle */}
                            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6" />

                            {/* Name & Title */}
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                    {staffData.fullName}
                                    <BadgeCheck className="w-5 h-5 text-blue-500" />
                                </h2>
                                <p className="text-slate-500 mt-1">{staffData.jobTitle}</p>
                            </div>

                            {/* Staff ID Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full mb-6">
                                <span className="text-xs text-slate-500 uppercase tracking-wider">Staff ID</span>
                                <span className="text-sm font-bold text-slate-900">{staffData.staffId}</span>
                            </div>

                            {/* Contact Actions */}
                            <div className="grid grid-cols-2 gap-3">
                                {staffData.email && (
                                    <Button
                                        variant="outline"
                                        className="h-14 rounded-2xl border-slate-200 hover:bg-slate-50"
                                        onClick={() => window.location.href = `mailto:${staffData.email}`}
                                    >
                                        <Mail className="w-5 h-5 mr-2 text-slate-600" />
                                        <span className="text-slate-700">Email</span>
                                    </Button>
                                )}
                                {staffData.phone && (
                                    <Button
                                        variant="outline"
                                        className="h-14 rounded-2xl border-slate-200 hover:bg-slate-50"
                                        onClick={() => window.location.href = `tel:${staffData.phone}`}
                                    >
                                        <Phone className="w-5 h-5 mr-2 text-slate-600" />
                                        <span className="text-slate-700">Call</span>
                                    </Button>
                                )}
                            </div>

                            {/* Company info */}
                            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-3">
                                <Briefcase className="w-5 h-5 text-slate-400" />
                                <span className="text-sm text-slate-600">{staffData.companyName}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Static bottom safe area */}
            <div className="h-20" />
        </div>
    );
};

// Helper function to adjust color brightness
function adjustColor(hex: string, amount: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
