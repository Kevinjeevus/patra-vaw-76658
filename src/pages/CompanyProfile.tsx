import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Globe,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    ShieldCheck,
    ArrowLeft,
    Loader2,
    Building2,
    ExternalLink
} from 'lucide-react';
import { updateOGMetaTags } from '@/lib/og-utils';

interface CompanyBranding {
    company_email?: string;
    company_phone?: string;
    company_website?: string;
    company_industry?: string;
    company_gst?: string;
    company_address?: string;
    company_description?: string;
}

interface CompanyData {
    id: string;
    company_name: string;
    company_logo_url: string | null;
    company_verified: boolean;
    vanity_url: string;
    branding: CompanyBranding;
}

export const CompanyProfile: React.FC = () => {
    const { companyVanity } = useParams<{ companyVanity: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [company, setCompany] = useState<CompanyData | null>(null);

    useEffect(() => {
        const fetchCompanyData = async () => {
            if (!companyVanity) {
                setLoading(false);
                return;
            }

            try {
                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('id, company_name, company_logo_url, company_verified, vanity_url, display_parameters')
                    .ilike('vanity_url', companyVanity)
                    .ilike('account_type', 'company')
                    .maybeSingle();

                if (error || !profile) {
                    console.error('Company not found or error:', error);
                    setLoading(false);
                    return;
                }

                const branding = (profile.display_parameters as any)?.branding || {};

                setCompany({
                    id: profile.id,
                    company_name: profile.company_name || 'Company',
                    company_logo_url: profile.company_logo_url,
                    company_verified: !!profile.company_verified,
                    vanity_url: profile.vanity_url || '',
                    branding: branding
                });

                // Update Meta Tags
                updateOGMetaTags({
                    title: `${profile.company_name || 'Company'} | Corporate Identity`,
                    description: branding.company_description || `Official profile for ${profile.company_name}`,
                    image: profile.company_logo_url || '/placeholder.svg',
                    url: window.location.href,
                    type: 'website'
                });
            } catch (err) {
                console.error('Unexpected error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyData();
    }, [companyVanity]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (!company) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
                <Building2 className="w-16 h-16 text-slate-300 mb-4" />
                <h1 className="text-2xl font-bold text-slate-900">Company Not Found</h1>
                <p className="text-slate-500 mb-6">The requested company profile does not exist.</p>
                <Button onClick={() => navigate('/')} variant="default" className="bg-indigo-600">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header / Banner Area */}
            <div className="h-48 bg-gradient-to-r from-indigo-600 to-violet-700 relative">
                <div className="absolute -bottom-16 left-0 right-0 px-6">
                    <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row items-end gap-6">
                        <div className="w-32 h-32 bg-white rounded-3xl p-4 shadow-xl border-4 border-white flex items-center justify-center overflow-hidden">
                            {company.company_logo_url ? (
                                <img
                                    src={company.company_logo_url}
                                    alt={company.company_name}
                                    className="max-w-full max-h-full object-contain"
                                />
                            ) : (
                                <Building2 className="w-12 h-12 text-slate-300" />
                            )}
                        </div>
                        <div className="flex-1 pb-2">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-3xl font-black text-white drop-shadow-sm">{company.company_name}</h1>
                                {company.company_verified && (
                                    <Badge className="bg-green-400/20 text-white border-green-400/30 backdrop-blur-md flex items-center gap-1">
                                        <ShieldCheck className="w-3 h-3" />
                                        Verified
                                    </Badge>
                                )}
                            </div>
                            <p className="text-indigo-100 font-medium">@{company.vanity_url}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-4xl px-4 pt-24 space-y-8">
                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-none shadow-sm overflow-hidden">
                            <CardHeader className="bg-white border-b border-slate-100">
                                <CardTitle className="text-lg">About the Organization</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                {company.branding.company_description ? (
                                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                                        {company.branding.company_description}
                                    </p>
                                ) : (
                                    <p className="text-slate-400 italic">No description provided.</p>
                                )}

                                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {company.branding.company_industry && (
                                        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                            <Briefcase className="w-5 h-5 text-indigo-500 mt-0.5" />
                                            <div>
                                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Industry</p>
                                                <p className="text-sm font-semibold text-slate-700">{company.branding.company_industry}</p>
                                            </div>
                                        </div>
                                    )}
                                    {company.branding.company_gst && (
                                        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                            <ShieldCheck className="w-5 h-5 text-indigo-500 mt-0.5" />
                                            <div>
                                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">GST Number</p>
                                                <p className="text-sm font-semibold text-slate-700">{company.branding.company_gst}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm overflow-hidden">
                            <CardHeader className="bg-white border-b border-slate-100">
                                <CardTitle className="text-lg">Office Locations</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-1">Corporate Headquarters</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                                            {company.branding.company_address || 'No address provided.'}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-sm overflow-hidden">
                            <CardHeader className="bg-white border-b border-slate-100">
                                <CardTitle className="text-lg">Contact Details</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                {company.branding.company_website && (
                                    <a
                                        href={company.branding.company_website.startsWith('http') ? company.branding.company_website : `https://${company.branding.company_website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100">
                                            <Globe className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <p className="text-[10px] uppercase font-bold text-slate-400">Website</p>
                                            <p className="text-sm font-semibold text-slate-700 truncate">{company.branding.company_website}</p>
                                        </div>
                                        <ExternalLink className="w-3 h-3 text-slate-300" />
                                    </a>
                                )}

                                {company.branding.company_email && (
                                    <a
                                        href={`mailto:${company.branding.company_email}`}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100">
                                            <Mail className="w-4 h-4 text-emerald-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] uppercase font-bold text-slate-400">Email Address</p>
                                            <p className="text-sm font-semibold text-slate-700 truncate">{company.branding.company_email}</p>
                                        </div>
                                    </a>
                                )}

                                {company.branding.company_phone && (
                                    <a
                                        href={`tel:${company.branding.company_phone}`}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center group-hover:bg-orange-100">
                                            <Phone className="w-4 h-4 text-orange-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] uppercase font-bold text-slate-400">Phone Number</p>
                                            <p className="text-sm font-semibold text-slate-700">{company.branding.company_phone}</p>
                                        </div>
                                    </a>
                                )}
                            </CardContent>
                        </Card>

                        <div className="p-6 bg-indigo-600 rounded-3xl shadow-lg shadow-indigo-100 text-white relative overflow-hidden group">
                            <Building2 className="absolute -bottom-4 -right-4 w-24 h-24 text-white/10 rotate-12 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold mb-2">Corporate Identity</h3>
                            <p className="text-indigo-100 text-sm mb-4">View our official staff cards and verified identities.</p>
                            <Button
                                variant="secondary"
                                className="w-full bg-white text-indigo-600 hover:bg-slate-50 font-bold"
                                onClick={() => {
                                    toast({
                                        title: "Coming Soon",
                                        description: "Employee directory viewing will be available soon."
                                    });
                                }}
                            >
                                View Staff Cards
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Branding */}
            <div className="mt-20 text-center opacity-30 select-none">
                <h2 className="text-4xl font-black tracking-tighter text-slate-900 italic">Patra</h2>
            </div>
        </div>
    );
};
