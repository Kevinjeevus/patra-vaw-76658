import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTour } from '@/hooks/useTour';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
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
  X,
  ExternalLink,
  CreditCard,
  Menu,
  Smartphone,
  Copy,
  Check,
  ArrowLeft,
  Eye,
  Award,
  MessageSquare,
  UserCircle,
  Code,
  LayoutGrid,
  MapPin,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CardPreviewNew } from '@/components/card-preview-new';
import { useIsMobile } from '@/hooks/use-mobile';
import { VideoIntro } from '@/components/VideoIntro';
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
import { AiProfileEditor } from '@/components/editor/AiProfileEditor';
import { BasicInfoEditor } from '@/components/editor/BasicInfoEditor';
import { CustomLinksEditor } from '@/components/editor/CustomLinksEditor';
import { CardData } from '@/components/editor/types';

const navItems = [
  { id: 'avatar', label: 'Avatar', icon: UserCircle },
  { id: 'about', label: 'About', icon: User },
  { id: 'location', label: 'Location', icon: MapPin },
  { id: 'verified', label: 'Social accounts', icon: Verified },
  { id: 'wallet', label: 'Wallet', icon: Wallet },
  { id: 'links', label: 'Links', icon: Link2 },
  { id: 'interests', label: 'Interests', icon: Heart },
  { id: 'achievements', label: 'Achievements', icon: Award },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { id: 'gallery', label: 'Gallery', icon: ImageIcon },
  { id: 'design', label: 'Design', icon: Palette },
  { id: 'cardlayout', label: 'Card Layout', icon: LayoutGrid },
  { id: 'aiprofile', label: 'AI Profile', icon: Code },
];

export const EditorNew: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [loading, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('avatar');
  const [showMobilePreview, setShowMobilePreview] = useState(false);
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
    theme: 'default',
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
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showAIConsent, setShowAIConsent] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [aiProfileExpanded, setAiProfileExpanded] = useState(false);

  const [copiedUrl, setCopiedUrl] = useState(false);

  // Video intro state
  const [showVideoIntro, setShowVideoIntro] = useState(false);

  // Auto-save every 30 seconds
  useEffect(() => {
    if (!user) return;
    const autoSaveInterval = setInterval(() => {
      handleSave(true); // pass true for silent save
    }, 30000); // 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [cardData, user]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+S or Cmd+S to save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleMobilePreview = () => {
    setShowMobilePreview(!showMobilePreview);
  };

  const handleSave = async (silent = false) => {
    if (!user) return;

    setSaving(true);
    try {
      // First, fetch existing card with vanity_url to check
      const { data: existing } = await supabase
        .from('digital_cards')
        .select('id, vanity_url')
        .eq('owner_user_id', user.id)
        .maybeSingle();

      // Ensure banner settings and custom CSS are included
      const contentToSave = {
        ...cardData,
        bannerType: cardData.bannerType || 'gradient',
        bannerValue: cardData.bannerValue || '',
        customCSS: cardData.customCSS || '',
        theme: cardData.theme || 'default',
      };

      const payload: any = {
        title: cardData.fullName || 'My Card',
        content_json: contentToSave,
        is_active: true,
        is_approved: true,
      };

      let error;
      if (existing?.id) {
        // Only include vanity_url in update if it has changed
        if (existing.vanity_url !== cardData.vanityUrl) {
          payload.vanity_url = cardData.vanityUrl;
        }

        ({ error } = await supabase
          .from('digital_cards')
          .update(payload)
          .eq('id', existing.id));
      } else {
        // For new cards, always include vanity_url and owner_user_id
        ({ error } = await supabase
          .from('digital_cards')
          .insert({
            ...payload,
            vanity_url: cardData.vanityUrl,
            owner_user_id: user.id
          }));
      }

      if (error) throw error;

      if (!silent) {
        toast({
          title: "Success!",
          description: "Your card has been saved and published!",
        });
      }
    } catch (error: any) {
      console.error('Error saving card:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save your card. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCopyUrl = () => {
    const url = `patra.me/${cardData.vanityUrl}`;
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    toast({
      title: "Copied!",
      description: "Card URL copied to clipboard",
    });
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'avatar':
        return <BasicInfoEditor cardData={cardData} setCardData={setCardData} user={user} />;

      case 'about':
        return <ProfileInfoEditor cardData={cardData} setCardData={setCardData} />;

      case 'wallet':
        return <PaymentLinksEditor cardData={cardData} setCardData={setCardData} />;

      case 'location':
        return <LocationEditor cardData={cardData} setCardData={setCardData} />;

      case 'links':
        return <CustomLinksEditor cardData={cardData} setCardData={setCardData} user={user} />;

      case 'interests':
        return <InterestsEditor cardData={cardData} setCardData={setCardData} />;

      case 'achievements':
        return <AchievementsEditor cardData={cardData} setCardData={setCardData} />;

      case 'testimonials':
        return <TestimonialsEditor cardData={cardData} setCardData={setCardData} />;

      case 'verified':
        return <SocialLinksEditor cardData={cardData} setCardData={setCardData} />;

      case 'gallery':
        return <PhotoGalleryEditor cardData={cardData} setCardData={setCardData} />;

      case 'design':
        return <ThemeSelector cardData={cardData} setCardData={setCardData} />;

      case 'cardlayout':
        return <SortableSectionList cardData={cardData} setCardData={setCardData} />;

      case 'aiprofile':
        return <AiProfileEditor cardData={cardData} setCardData={setCardData} aiEnabled={aiEnabled} handleAIToggle={handleAIToggle} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Video Intro Dialog */}
      {showVideoIntro && <VideoIntro onClose={() => {
        setShowVideoIntro(false);
        // Start tour after video closes
        const hasCompletedTour = localStorage.getItem('patra-tour-completed') === 'true';
        if (!hasCompletedTour) {
          setShouldStartTour(true);
        }
      }} />}

      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50 overflow-x-auto">
        <div className="px-4 h-16 flex items-center justify-between min-w-max">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-8 w-8"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-semibold hidden sm:block">Patra</h1>
          </div>

          <div className="flex items-center gap-2">
            {isMobile && (
              <Button
                variant="outline"
                size="sm"
                onClick={toggleMobilePreview}
                className="gap-2"
              >
                <Smartphone className="w-4 h-4" />
                {showMobilePreview ? 'Edit' : 'Preview'}
              </Button>
            )}

            {!isMobile && (
              <Button data-tour="save" onClick={() => handleSave()} disabled={loading} size="sm">
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Saving...' : 'Save'}
              </Button>
            )}

            <Avatar
              className="h-9 w-9 cursor-pointer ring-2 ring-primary/20 hover:ring-primary/40 transition-all"
              onClick={() => navigate('/settings')}
            >
              <AvatarImage src={cardData.avatarUrl} alt={cardData.fullName} />
              <AvatarFallback>{cardData.fullName?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 flex overflow-hidden scrollbar-thin">
        {/* Left Column - Editor (Accordion) */}
        <div className={`flex flex-col border-r border-border bg-card overflow-hidden transition-all duration-300
            ${isMobile ? (showMobilePreview ? 'hidden' : 'w-full') : 'w-[500px] flex-shrink-0'}
        `}>
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            <Accordion type="single" collapsible value={activeSection} onValueChange={setActiveSection}>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isAIProfile = item.id === 'aiprofile';
                return (
                  <AccordionItem value={item.id} key={item.id}>
                    <AccordionTrigger className={`px-4 py-3 hover:no-underline hover:bg-muted/50 data-[state=open]:bg-muted/50 ${isAIProfile && aiEnabled ? 'relative overflow-hidden' : ''}`}>
                      {isAIProfile && aiEnabled && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer pointer-events-none" />
                      )}
                      <div className="flex items-center gap-3 relative z-10">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                        <span>{item.label}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 border-t bg-background">
                      {renderSection(item.id)}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>

            {/* Extra Links */}
            {cardData.vanityUrl && (
              <div className="p-4 border-t space-y-1 mt-4">
                <button
                  onClick={() => window.open(`/${cardData.vanityUrl}?card`, '_blank')}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-left hover:bg-muted"
                >
                  <CreditCard className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium text-sm">Card</span>
                </button>

                <button
                  onClick={() => window.open('/analytics', '_blank')}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-left hover:bg-muted"
                >
                  <ExternalLink className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium text-sm">Analytics</span>
                </button>

                <button
                  onClick={() => window.open(`/${cardData.vanityUrl}`, '_blank')}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors text-left hover:bg-muted"
                >
                  <Eye className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium text-sm">Profile</span>
                </button>

                {/* Card URL display with copy button */}
                <div className="pt-2">
                  <div className="flex items-center gap-2 p-2 border border-border rounded-lg bg-muted/30">
                    <span className="text-sm flex-1 truncate font-mono">
                      patra.me/{cardData.vanityUrl}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 flex-shrink-0"
                      onClick={handleCopyUrl}
                      title="Copy URL"
                    >
                      {copiedUrl ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Preview (Desktop/Tablet) */}
        {!isMobile && (
          <aside
            data-tour="preview"
            className={`flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent ${cardData.theme === 'modern' ? 'bg-gradient-to-br from-gray-900 to-gray-800' :
              cardData.theme === 'vibrant' ? 'bg-gradient-to-br from-purple-400 to-pink-600' :
                cardData.theme === 'professional' ? 'bg-gradient-to-br from-slate-100 to-gray-200' :
                  cardData.theme === 'minimal' ? 'bg-background' :
                    'bg-muted/30'
              }`}
            style={{ maxHeight: 'calc(100vh - 4rem)' }}
          >
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-muted-foreground">Live Preview</div>
              </div>
              <CardPreviewNew cardData={{ ...cardData, aiEnabled }} onOpenPayment={() => setShowPaymentDialog(true)} showAIButton={true} />
            </div>
          </aside>
        )}

        {/* Preview Column - Mobile */}
        {isMobile && showMobilePreview && (
          <div className={`fixed inset-0 top-16 z-40 overflow-y-auto scrollbar-thin p-4 transition-transform duration-300 ${cardData.theme === 'modern' ? 'bg-gradient-to-br from-gray-900 to-gray-800' :
            cardData.theme === 'vibrant' ? 'bg-gradient-to-br from-purple-400 to-pink-600' :
              cardData.theme === 'professional' ? 'bg-gradient-to-br from-slate-100 to-gray-200' :
                cardData.theme === 'minimal' ? 'bg-background' :
                  'bg-background'
            }`}>
            <CardPreviewNew cardData={{ ...cardData, aiEnabled }} onOpenPayment={() => setShowPaymentDialog(true)} showAIButton={true} />
          </div>
        )}
      </div>

      {/* AI Consent Dialog */}
      <Dialog open={showAIConsent} onOpenChange={setShowAIConsent}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enable AI Assistant</DialogTitle>
            <DialogDescription>
              By enabling this feature, you consent to train an AI assistant with your profile data.
              This AI will represent you in conversations with visitors on your profile page.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-3">
            <p className="text-sm">The AI will use:</p>
            <ul className="text-sm space-y-2 list-disc list-inside text-muted-foreground">
              <li>Your name, job title, and bio</li>
              <li>Your skills, interests, and achievements</li>
              <li>Your social links and contact information</li>
              <li>Any testimonials and media you've added</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              Visitors will be able to chat with your AI clone to learn more about you and your work.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAIConsent(false)}>
              Cancel
            </Button>
            <Button onClick={handleAIConsentAccept}>
              I Consent, Enable AI
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mobile Save Button */}
      {isMobile && !showMobilePreview && (
        <div className="sticky bottom-0 left-0 right-0 p-4 bg-card border-t border-border z-20">
          <Button onClick={() => handleSave()} disabled={loading} className="w-full">
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      )}
    </div>
  );
};
