import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Share2, Smartphone } from 'lucide-react';
import { CorporateIDCard } from '@/components/card/CorporateIDCard';
import { updateOGMetaTags } from '@/lib/og-utils';

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
}

export const StaffCardView: React.FC = () => {
    const { companyVanity, staffId } = useParams<{ companyVanity: string; staffId: string }>();
    const navigate = useNavigate();
    const [staffData, setStaffData] = useState<StaffData | null>(null);
    const [loading, setLoading] = useState(true);
    const [flipped, setFlipped] = useState(false);

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
                    displayParameters: Array.isArray(companyProfile.display_parameters)
                        ? companyProfile.display_parameters
                        : (companyProfile.display_parameters as any)?.visibility || ['display_name', 'email', 'job_title'],
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
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
                    <p className="text-slate-600">Loading staff card...</p>
                </div>
            </div>
        );
    }

    if (!staffData) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center max-w-md">
                    <h1 className="text-6xl font-bold mb-4 text-slate-900">404</h1>
                    <p className="text-xl text-slate-600 mb-6">Staff card not found</p>
                    <Button onClick={() => navigate('/')} variant="default" className="bg-slate-900 hover:bg-slate-800">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Go Home
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }}></div>

            {/* Header */}
            <header className="relative z-50 px-6 py-5 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-4 max-w-6xl mx-auto">
                    <div className="text-2xl font-bold text-slate-900">
                        <span className="text-slate-600">P</span>atra
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={async () => {
                                if (navigator.share) {
                                    try {
                                        await navigator.share({
                                            title: document.title,
                                            url: window.location.href
                                        });
                                    } catch (err) {
                                        console.log('Error sharing:', err);
                                    }
                                } else {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert('Link copied to clipboard!');
                                }
                            }}
                            className="hidden sm:flex border-slate-200"
                        >
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => navigate('/')}
                            className="text-slate-600"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative flex flex-col items-center justify-center min-h-[calc(100vh-73px)] p-8">
                {/* Title */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-2">
                        {staffData.fullName}'s Corporate ID
                    </h1>
                    <p className="text-slate-600">{staffData.companyName}</p>
                </div>

                {/* Card Container */}
                <div className="flex justify-center items-center">
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
                    />
                </div>

                {/* Instructions */}
                <div className="mt-12 text-center">
                    <p className="text-xs text-slate-400 mb-6">
                        Click the card to see both sides
                    </p>

                    <div className="flex flex-col gap-3 w-full max-w-[320px]">
                        <Button
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 shadow-lg"
                            onClick={() => {
                                if (navigator.share) {
                                    navigator.share({
                                        title: `${staffData.fullName}'s ID Card`,
                                        text: `Digital ID Card for ${staffData.fullName} at ${staffData.companyName}`,
                                        url: window.location.href
                                    }).catch(console.error);
                                } else {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert('Link copied to clipboard!');
                                }
                            }}
                        >
                            <Smartphone className="w-4 h-4 mr-2" />
                            Save to Phone / PWA
                        </Button>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                            Tap share & 'Add to Home Screen'
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};
