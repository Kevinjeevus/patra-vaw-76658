import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Loader2,
    Building2,
    MapPin,
    Globe,
    UserPlus,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    Info,
    Mail,
    Phone,
    ShieldCheck,
    User
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export const InvitePage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const inviteId = searchParams.get('id');
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();

    const [loading, setLoading] = useState(true);
    const [joining, setJoining] = useState(false);
    const [company, setCompany] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Manual Entry State
    const [manualSuccess, setManualSuccess] = useState(false);
    const [showManualForm, setShowManualForm] = useState(false);
    const [manualData, setManualData] = useState({
        full_name: '',
        email: '',
        phone: '',
        designation: ''
    });

    // Form states for joining
    const [selectedCard, setSelectedCard] = useState<string>('');
    const [userCards, setUserCards] = useState<any[]>([]);

    useEffect(() => {
        if (inviteId) {
            fetchCompanyInfo();
        } else {
            setError('Missing invitation code.');
            setLoading(false);
        }
    }, [inviteId]);

    useEffect(() => {
        if (user) {
            fetchUserCards();
        }
    }, [user]);

    const fetchCompanyInfo = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('profiles')
                .select('id, company_name, company_logo_url, bio, address, location_coordinates, vanity_url, email, phone')
                .eq('invite_code', inviteId)
                .maybeSingle();

            if (error) throw error;
            if (!data) {
                setError('Invalid or expired invitation code.');
            } else {
                setCompany(data);
            }
        } catch (err) {
            console.error('Error fetching company info:', err);
            setError('Failed to load invitation details.');
        } finally {
            setLoading(false);
        }
    };

    const fetchUserCards = async () => {
        try {
            const { data, error } = await supabase
                .from('digital_cards')
                .select('id, title, content_json')
                .eq('owner_user_id', user!.id);

            if (error) throw error;
            setUserCards(data || []);
            if (data && data.length > 0) {
                setSelectedCard(data[0].id);
            }
        } catch (err) {
            console.error('Error fetching user cards:', err);
        }
    };

    const handleManualJoin = async () => {
        // Validate
        if (!manualData.full_name || !manualData.email) {
            toast({
                title: "Missing Information",
                description: "Please provide at least your name and email.",
                variant: "destructive"
            });
            return;
        }

        setJoining(true);
        try {
            const { error: insertError } = await supabase
                .from('invited_employees')
                .insert({
                    company_profile_id: company.id,
                    invite_code: inviteId,
                    status: 'invited', // Using 'invited' as they are waiting for account creation/approval
                    is_approved: false, // Explicitly false, waiting for approval
                    data_submitted: {
                        display_name: manualData.full_name,
                        email: manualData.email,
                        phone: manualData.phone,
                        job_title: manualData.designation
                    },
                    designation: manualData.designation
                });

            if (insertError) throw insertError;

            setManualSuccess(true);
            toast({
                title: "Request Sent!",
                description: "Your information has been sent to the company admin for approval.",
            });

        } catch (err: any) {
            console.error('Error submitting manual join:', err);
            toast({
                title: "Error",
                description: err.message || "Failed to submit request.",
                variant: "destructive"
            });
        } finally {
            setJoining(false);
        }
    };

    const handleJoin = async () => {
        if (!user) {
            // Should not happen with new flow, but safe fallback
            navigate(`/auth?returnTo=${encodeURIComponent(window.location.pathname + window.location.search)}`);
            return;
        }

        if (userCards.length === 0) {
            toast({
                title: "No Digital Card Found",
                description: "Please create a digital card first to join the company.",
                variant: "destructive"
            });
            navigate('/editor');
            return;
        }

        setJoining(true);
        try {
            // Get user profile first
            const { data: userProfile, error: profileError } = await supabase
                .from('profiles')
                .select('id, display_name, email, phone')
                .eq('user_id', user.id)
                .single();

            if (profileError || !userProfile) throw new Error("User profile not found");

            // Check if already in invited_employees
            const { data: existingInvite } = await supabase
                .from('invited_employees')
                .select('id')
                .eq('company_profile_id', company.id)
                .eq('employee_user_id', user.id)
                .maybeSingle();

            if (existingInvite) {
                const { error: updateError } = await supabase
                    .from('invited_employees')
                    .update({
                        status: 'joined',
                        joined_at: new Date().toISOString(),
                        // We don't auto-approve, let admin approve
                    })
                    .eq('id', existingInvite.id);
                if (updateError) throw updateError;
            } else {
                const { error: insertError } = await supabase
                    .from('invited_employees')
                    .insert({
                        company_profile_id: company.id,
                        employee_user_id: user.id,
                        employee_profile_id: userProfile.id,
                        invite_code: inviteId,
                        status: 'joined',
                        is_approved: false,
                        joined_at: new Date().toISOString(),
                        data_submitted: {
                            display_name: userProfile.display_name,
                            email: userProfile.email,
                            phone: userProfile.phone
                        }
                    });
                if (insertError) throw insertError;
            }

            // Update card account type as well
            const { error: updateCardError } = await supabase
                .from('digital_cards')
                .update({
                    account_type: 'company_employee'
                })
                .eq('id', selectedCard);

            if (updateCardError) throw updateCardError;

            setSuccess(true);
            toast({
                title: "Welcome to the team!",
                description: `You have successfully joined ${company.company_name}. Please wait for admin approval.`,
            });

            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);

        } catch (err: any) {
            console.error('Error joining company:', err);
            toast({
                title: "Error",
                description: err.message || "Failed to join the company. Please try again.",
                variant: "destructive"
            });
        } finally {
            setJoining(false);
        }
    };

    if (loading || authLoading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
                <div className="flex flex-col items-center gap-4 animate-in fade-in duration-500">
                    <div className="w-16 h-16 bg-indigo-600/10 rounded-2xl flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                    </div>
                    <p className="text-slate-500 font-medium animate-pulse">Verifying Invitation...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
                <Card className="max-w-md w-full border-none shadow-2xl shadow-indigo-200/50 rounded-3xl overflow-hidden animate-in zoom-in-95 duration-300">
                    <CardContent className="p-8 text-center space-y-6">
                        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto">
                            <AlertCircle className="w-8 h-8 text-red-500" />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-slate-900">Invitation Error</h1>
                            <p className="text-slate-500">{error}</p>
                        </div>
                        <Button
                            className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all"
                            onClick={() => navigate('/')}
                        >
                            Return Home
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
                <Card className="max-w-md w-full border-none shadow-2xl shadow-indigo-200/50 rounded-3xl overflow-hidden animate-in zoom-in-95 duration-300">
                    <CardContent className="p-8 text-center space-y-6">
                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-slate-900">Successfully Joined!</h1>
                            <p className="text-slate-500 text-lg">You are now part of <span className="font-semibold text-slate-900">{company.company_name}</span>.</p>
                        </div>
                        <p className="text-sm text-slate-400">Redirecting to your dashboard...</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (manualSuccess) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
                <Card className="max-w-md w-full border-none shadow-2xl shadow-indigo-200/50 rounded-3xl overflow-hidden animate-in zoom-in-95 duration-300">
                    <CardContent className="p-8 text-center space-y-6">
                        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto">
                            <UserPlus className="w-10 h-10 text-indigo-600" />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-slate-900">Information Submitted!</h1>
                            <p className="text-slate-500 text-lg">Your details have been sent to <span className="font-semibold text-slate-900">{company.company_name}</span> for approval.</p>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-xl space-y-3">
                            <p className="text-sm font-medium text-slate-900">Don't have an account yet?</p>
                            <p className="text-xs text-slate-500">Create a Patra account to manage your digital identity and access your company card once approved.</p>
                            <Button
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                                onClick={() => navigate('/auth')}
                            >
                                Create Free Account <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
            {/* Design Sidebar / Decorative side */}
            <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 relative overflow-hidden items-center justify-center p-12">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-400 rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 max-w-lg space-y-8 text-white">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center ring-1 ring-white/30">
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-5xl font-black tracking-tight leading-tight">
                            Build Your Professional <span className="text-indigo-200">Network</span> Today.
                        </h1>
                        <p className="text-indigo-100 text-lg leading-relaxed font-medium">
                            Join <span className="text-white font-bold">{company.company_name}</span> and unlock a world of connected professional identity.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'Verified Profile', icon: CheckCircle2 },
                            { label: 'Digital Card', icon: Globe },
                            { label: 'Team Portal', icon: Building2 },
                            { label: 'Direct Access', icon: UserPlus },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
                                <item.icon className="w-5 h-5 text-indigo-300" />
                                <span className="text-sm font-semibold text-white">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-12">
                <div className="max-w-[480px] w-full space-y-8 animate-in slide-in-from-bottom-8 duration-700">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <Avatar className="w-24 h-24 mx-auto border-4 border-white shadow-xl ring-1 ring-slate-100">
                            <AvatarImage src={company.company_logo_url} />
                            <AvatarFallback className="bg-indigo-600 text-white text-2xl font-bold">
                                {company.company_name?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Join {company.company_name}</h2>
                            <p className="text-slate-500 text-sm">Official Team Invitation</p>
                        </div>
                    </div>

                    {/* Company Info Card */}
                    <Card className="border-none shadow-xl shadow-slate-200/50 bg-white rounded-[2rem] overflow-hidden">
                        <CardContent className="p-8 space-y-6">
                            {!user && !showManualForm && (
                                <div className="space-y-4">
                                    <div className="text-center space-y-2 mb-6">
                                        <h3 className="text-lg font-bold text-slate-900">How would you like to join?</h3>
                                        <p className="text-sm text-slate-500">Choose an option to proceed with your invitation</p>
                                    </div>

                                    <Button
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 h-14 rounded-xl font-bold text-base shadow-lg shadow-indigo-100 transition-all hover:scale-[1.02]"
                                        onClick={() => navigate(`/auth?returnTo=${encodeURIComponent(window.location.pathname + window.location.search)}`)}
                                    >
                                        <User className="w-5 h-5 mr-3" />
                                        I have an account
                                    </Button>

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-slate-100" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-white px-2 text-slate-400 font-bold tracking-wider">Or</span>
                                        </div>
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="w-full h-14 rounded-xl font-bold text-base border-2 hover:bg-slate-50 transition-all hover:scale-[1.02]"
                                        onClick={() => setShowManualForm(true)}
                                    >
                                        Fill details manually
                                    </Button>

                                    <div className="text-center pt-2">
                                        <p className="text-xs text-slate-400">
                                            Don't have an account? <span className="text-indigo-600 cursor-pointer font-semibold" onClick={() => setShowManualForm(true)}>Use manual entry</span>
                                        </p>
                                    </div>
                                </div>
                            )}

                            {!user && showManualForm && (
                                <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Button variant="ghost" size="sm" className="-ml-2" onClick={() => setShowManualForm(false)}>
                                            <ArrowRight className="w-4 h-4 rotate-180" />
                                        </Button>
                                        <h3 className="font-bold text-slate-900">Submit Your Details</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="manual-name">Full Name *</Label>
                                            <Input
                                                id="manual-name"
                                                value={manualData.full_name}
                                                onChange={(e) => setManualData(prev => ({ ...prev, full_name: e.target.value }))}
                                                placeholder="John Doe"
                                                className="bg-slate-50 border-slate-200"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="manual-email">Email Address *</Label>
                                            <Input
                                                id="manual-email"
                                                type="email"
                                                value={manualData.email}
                                                onChange={(e) => setManualData(prev => ({ ...prev, email: e.target.value }))}
                                                placeholder="john@example.com"
                                                className="bg-slate-50 border-slate-200"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="manual-phone">Phone</Label>
                                                <Input
                                                    id="manual-phone"
                                                    type="tel"
                                                    value={manualData.phone}
                                                    onChange={(e) => setManualData(prev => ({ ...prev, phone: e.target.value }))}
                                                    placeholder="+1..."
                                                    className="bg-slate-50 border-slate-200"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="manual-job">Job Title</Label>
                                                <Input
                                                    id="manual-job"
                                                    value={manualData.designation}
                                                    onChange={(e) => setManualData(prev => ({ ...prev, designation: e.target.value }))}
                                                    placeholder="e.g. Designer"
                                                    className="bg-slate-50 border-slate-200"
                                                />
                                            </div>
                                        </div>

                                        <Button
                                            className="w-full bg-slate-900 text-white hover:bg-slate-800 h-12 rounded-xl mt-4 font-bold"
                                            onClick={handleManualJoin}
                                            disabled={joining}
                                        >
                                            {joining ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
                                            Submit Request
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {user && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-slate-500 text-xs font-bold uppercase tracking-widest">Select Your Digital Card</Label>
                                        <div className="space-y-2 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                                            {userCards.length > 0 ? (
                                                userCards.map(card => (
                                                    <button
                                                        key={card.id}
                                                        onClick={() => setSelectedCard(card.id)}
                                                        className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all ${selectedCard === card.id
                                                            ? 'bg-indigo-50 border-indigo-600 text-indigo-700'
                                                            : 'bg-slate-50 border-transparent text-slate-600 hover:bg-slate-100'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-2 h-2 rounded-full ${selectedCard === card.id ? 'bg-indigo-600' : 'bg-slate-300'}`} />
                                                            <span className="text-sm font-bold truncate max-w-[180px]">{card.title}</span>
                                                        </div>
                                                        {selectedCard === card.id && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                                                    </button>
                                                ))
                                            ) : (
                                                <p className="text-sm italic opacity-80 text-slate-500">You don't have any digital cards yet.</p>
                                            )}
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full bg-indigo-600 text-white hover:bg-indigo-700 h-12 rounded-xl font-bold shadow-lg shadow-indigo-100"
                                        onClick={handleJoin}
                                        disabled={joining || (userCards.length === 0)}
                                    >
                                        {joining ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            'Confirm & Join Team'
                                        )}
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Footer / Help */}
                    <div className="text-center pb-8">
                        <p className="text-slate-400 text-xs">
                            Invitation from <span className="font-bold text-slate-500">{company.company_name}</span>.
                            Verified by Patra.
                        </p>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(0, 0, 0, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(0, 0, 0, 0.2);
                }
            `}} />
        </div>
    );
};
