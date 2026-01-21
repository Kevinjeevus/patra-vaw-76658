import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import {
    Save,
    User,
    Verified,
    Wallet,
    Link2,
    Heart,
    ImageIcon,
    Palette,
    ArrowLeft,
    Eye,
    Award,
    MessageSquare,
    UserCircle,
    Code,
    LayoutGrid,
    MapPin,
    ShieldCheck,
    CreditCard,
    ChevronLeft,
    ChevronRight,
    Smartphone
} from 'lucide-react';
import { CardPreviewNew } from '@/components/card-preview-new';
import { useIsMobile } from '@/hooks/use-mobile';
import { ProfileInfoEditor } from '@/components/editor/ProfileInfoEditor';
import { SocialLinksEditor } from '@/components/editor/SocialLinksEditor';
import { PaymentLinksEditor } from '@/components/editor/PaymentLinksEditor';
import { PhotoGalleryEditor } from '@/components/editor/PhotoGalleryEditor';
import { ThemeSelector } from '@/components/editor/ThemeSelector';
import { SortableSectionList } from '@/components/editor/SortableSectionList';
import { AchievementsEditor } from '@/components/editor/AchievementsEditor';
import { TestimonialsEditor } from '@/components/editor/TestimonialsEditor';
import { InterestsEditor } from '@/components/editor/InterestsEditor';
import { LocationEditor } from '@/components/editor/LocationEditor';
import { BasicInfoEditor } from '@/components/editor/BasicInfoEditor';
import { CustomLinksEditor } from '@/components/editor/CustomLinksEditor';
import { CardData } from '@/components/editor/types';

const corporateNavItems = [
    { id: 'avatar', label: 'Identity', icon: UserCircle },
    { id: 'about', label: 'Professional Bio', icon: User },
    { id: 'verified', label: 'Company Credentials', icon: Verified }, // verified icon exists below
    { id: 'links', label: 'Corporate Links', icon: Link2 },
    { id: 'achievements', label: 'Milestones', icon: Award },
    { id: 'design', label: 'Corporate Branding', icon: Palette },
    { id: 'cardlayout', label: 'Card Layout', icon: LayoutGrid },
];

export const CorporateEditor: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const [loading, setSaving] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeSection, setActiveSection] = useState(searchParams.get('tab') || 'avatar');
    const [showMobilePreview, setShowMobilePreview] = useState(false);
    const [companyProfile, setCompanyProfile] = useState<any>(null);

    const [cardData, setCardData] = useState<CardData>({
        fullName: '',
        about: '',
        location: '',
        pronunciation: '',
        pronoun: '',
        audioPronunciation: '',
        languages: [],
        jobTitle: '',
        company: '',
        email: '',
        phone: '',
        contactForm: '',
        calendar: '',
        socialLinks: [],
        paymentLinks: [],
        customLinks: [],
        linkGroups: [],
        interests: [],
        avatarUrl: '',
        vanityUrl: '',
        upiId: '',
        videoIntro: '',
        achievements: [],
        testimonials: [],
        theme: 'modern',
        customCSS: '',
        photos: [],
        cardOrder: ['contact', 'verified', 'links', 'achievements', 'testimonials', 'interests', 'gallery', 'languages', 'location'],
        cardVisibility: {
            contact: true,
            verified: true,
            links: true,
            achievements: true,
            testimonials: true,
            interests: true,
            gallery: true,
            languages: true,
            location: true,
        },
        address: '',
        showAddressMap: false,
        latitude: null,
        longitude: null,
        mapUrl: '',
    });

    useEffect(() => {
        if (user) {
            fetchCompanyAndCard();
        }
    }, [user]);

    const fetchCompanyAndCard = async () => {
        try {
            const { data: profile } = await supabase.from('profiles').select('*').eq('user_id', user!.id).single();
            if (profile) {
                setCompanyProfile(profile);
                setCardData(prev => ({ ...prev, company: profile.company_name }));
            }

            const cardId = searchParams.get('id');
            if (cardId) {
                const { data: card } = await supabase.from('digital_cards').select('*').eq('id', cardId).single();
                if (card && card.content_json) {
                    setCardData(prev => ({ ...prev, ...(card.content_json as any) }));
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        try {
            const cardId = searchParams.get('id');
            const payload = {
                title: cardData.fullName || 'Director Card',
                content_json: cardData,
                owner_user_id: user.id,
                is_active: true,
                is_approved: true,
                account_type: 'company_card'
            };

            if (cardId) {
                await supabase.from('digital_cards').update(payload).eq('id', cardId);
            } else {
                const { data } = await supabase.from('digital_cards').insert(payload).select().single();
                if (data) setSearchParams({ id: data.id });
            }
            toast({ title: "Card Saved", description: "The ID card has been updated." });
        } catch (err) {
            toast({ title: "Error", description: "Failed to save card", variant: "destructive" });
        } finally {
            setSaving(false);
        }
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'avatar': return <BasicInfoEditor cardData={cardData} setCardData={setCardData} user={user} />;
            case 'about': return <ProfileInfoEditor cardData={cardData} setCardData={setCardData} />;
            case 'verified': return <SocialLinksEditor cardData={cardData} setCardData={setCardData} />;
            case 'links': return <CustomLinksEditor cardData={cardData} setCardData={setCardData} user={user} />;
            case 'achievements': return <AchievementsEditor cardData={cardData} setCardData={setCardData} />;
            case 'design': return <ThemeSelector cardData={cardData} setCardData={setCardData} />;
            case 'cardlayout': return <SortableSectionList cardData={cardData} setCardData={setCardData} />;
            default: return <BasicInfoEditor cardData={cardData} setCardData={setCardData} user={user} />;
        }
    };

    return (
        <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
            <header className="bg-white border-b border-slate-200 px-4 h-16 flex items-center justify-between z-50">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-slate-900 leading-none">Corporate ID Designer</h1>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Managing: {cardData.fullName || 'New Card'}</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {isMobile && (
                        <Button variant="outline" size="sm" onClick={() => setShowMobilePreview(!showMobilePreview)}>
                            <Smartphone className="w-4 h-4 mr-2" />
                            {showMobilePreview ? 'Edit' : 'Preview'}
                        </Button>
                    )}
                    <Button onClick={handleSave} disabled={loading} className="bg-indigo-600 hover:bg-indigo-700">
                        <Save className="w-4 h-4 mr-2" />
                        {loading ? 'Saving...' : 'Publish Card'}
                    </Button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                {!isMobile && (
                    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
                        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                            {[
                                { id: 'avatar', label: 'Basic Identity', icon: UserCircle },
                                { id: 'about', label: 'Biography', icon: User },
                                { id: 'verified', label: 'Company Verified', icon: Verified },
                                { id: 'links', label: 'Useful Links', icon: Link2 },
                                { id: 'achievements', label: 'Key Highlights', icon: Award },
                                { id: 'design', label: 'Visual Design', icon: Palette },
                                { id: 'cardlayout', label: 'Section Order', icon: LayoutGrid },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeSection === item.id
                                        ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100'
                                        : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <item.icon className={`w-4 h-4 ${activeSection === item.id ? 'text-indigo-600' : 'text-slate-400'}`} />
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </aside>
                )}

                <main className="flex-1 flex overflow-hidden">
                    {/* Editor Area */}
                    <div className={`flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/50 ${showMobilePreview && isMobile ? 'hidden' : 'block'}`}>
                        <div className="max-w-2xl mx-auto">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-slate-900 capitalize">{activeSection.replace('-', ' ')} Settings</h2>
                                <p className="text-slate-500">Customize this section for the corporate digital identity card.</p>
                            </div>
                            {renderSection()}
                        </div>
                    </div>

                    {/* Preview Area */}
                    {(!isMobile || showMobilePreview) && (
                        <div className={`w-full md:w-[450px] bg-white border-l border-slate-200 flex flex-col animate-in fade-in slide-in-from-right-4 duration-300`}>
                            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Card Preview</span>
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-400" />
                                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                                    <div className="w-2 h-2 rounded-full bg-green-400" />
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center bg-slate-100/50">
                                <div className="w-full max-w-[360px]">
                                    <CardPreviewNew cardData={cardData} />
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};
