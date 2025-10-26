import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { 
  User, Mail, Briefcase, FileText, Check, Sparkles, 
  Brain, Wand2, Shield, CheckCircle2, ChevronRight, ChevronLeft, Upload, Camera
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface ProfileData {
  bio: string;
  job_title: string;
  avatar_url: string;
  website: string;
  company: string;
}

const creationSteps = [
  { icon: Brain, text: "AI is analyzing your profile...", duration: 2500 },
  { icon: Shield, text: "Your profile passes our fidelity test", duration: 2500 },
  { icon: Wand2, text: "We are creating your profile...", duration: 2500 },
  { icon: CheckCircle2, text: "Your card is done!", duration: 2000 }
];

export const ProfileCreation: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showCreationAnimation, setShowCreationAnimation] = useState(false);
  const [creationStep, setCreationStep] = useState(0);
  const [username, setUsername] = useState('');
  
  const [profileData, setProfileData] = useState<ProfileData>({
    bio: '',
    job_title: '',
    avatar_url: user?.user_metadata?.avatar_url || user?.user_metadata?.picture || '',
    website: '',
    company: '',
  });

  useEffect(() => {
    if (user) {
      // Fetch Google profile picture if available
      const googleAvatar = user.user_metadata?.avatar_url || user.user_metadata?.picture;
      if (googleAvatar) {
        setProfileData(prev => ({
          ...prev,
          avatar_url: googleAvatar
        }));
      }
      fetchUsername();
    }
  }, [user]);

  const fetchUsername = async () => {
    if (!user) return;
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (profile) {
      const { data: card } = await supabase
        .from('digital_cards')
        .select('vanity_url')
        .eq('owner_user_id', user.id)
        .single();
      
      if (card?.vanity_url) {
        setUsername(card.vanity_url);
      }
    }
  };

  useEffect(() => {
    if (showCreationAnimation && creationStep < creationSteps.length) {
      const timer = setTimeout(() => {
        setCreationStep(creationStep + 1);
      }, creationSteps[creationStep].duration);
      
      return () => clearTimeout(timer);
    } else if (showCreationAnimation && creationStep >= creationSteps.length) {
      completeProfile();
    }
  }, [showCreationAnimation, creationStep]);

  const handleSkip = () => {
    navigate('/editor');
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(4); // Verification step
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateProfile = () => {
    setShowCreationAnimation(true);
    setCreationStep(0);
  };

  const completeProfile = async () => {
    if (!user) return;

    try {
      // Get existing profile data
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('display_name, phone')
        .eq('user_id', user.id)
        .single();

      // Update profile with new data
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          bio: profileData.bio || null,
          job_title: profileData.job_title || null,
          avatar_url: profileData.avatar_url || null,
          company_name: profileData.company || null,
        })
        .eq('user_id', user.id);

      if (profileError) throw profileError;

      // Get or create digital card
      const { data: existingCard } = await supabase
        .from('digital_cards')
        .select('id, vanity_url, content_json')
        .eq('owner_user_id', user.id)
        .maybeSingle();

      if (existingCard) {
        // Update existing card with complete data
        const { error: cardError } = await supabase
          .from('digital_cards')
          .update({
            title: existingProfile?.display_name || 'My Card',
            content_json: {
              name: existingProfile?.display_name,
              email: user.email,
              phone: existingProfile?.phone,
              jobTitle: profileData.job_title,
              bio: profileData.bio,
              company: profileData.company,
              website: profileData.website,
              avatar: profileData.avatar_url,
              showAvatar: !!profileData.avatar_url,
              showName: true,
              showJobTitle: !!profileData.job_title,
              showPhone: !!existingProfile?.phone,
              showEmail: true,
              showBio: !!profileData.bio,
              showQRCode: true,
              showCompany: !!profileData.company,
              showWebsite: !!profileData.website,
            }
          })
          .eq('id', existingCard.id);

        if (cardError) throw cardError;

        toast({
          title: "Profile Created!",
          description: "Your digital card is ready to share."
        });

        navigate(`/${existingCard.vanity_url}?card`);
      } else {
        toast({
          title: "Error",
          description: "Card not found. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      console.error('Error creating profile:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create profile. Please try again.",
        variant: "destructive"
      });
      setShowCreationAnimation(false);
    }
  };

  const isStepValid = () => {
    // All steps are optional except having at least some data
    return true;
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setProfileData({ ...profileData, avatar_url: publicUrl });
      
      toast({
        title: "Avatar uploaded!",
        description: "Your profile picture has been updated."
      });
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // Creation Animation
  if (showCreationAnimation) {
    const CurrentIcon = creationStep < creationSteps.length ? creationSteps[creationStep].icon : CheckCircle2;
    const currentText = creationStep < creationSteps.length ? creationSteps[creationStep].text : "Complete!";
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>

        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="relative z-10 text-center max-w-md w-full">
          <div className="mb-8 relative">
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 border-4 border-violet-200 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-2 border-4 border-purple-200 rounded-full animate-spin-reverse"></div>
              <div className="absolute inset-4 border-4 border-pink-200 rounded-full animate-spin-slow"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
                  <CurrentIcon className="w-10 h-10 text-white animate-bounce-slow" />
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 animate-fade-in">
            {currentText}
          </h2>
          
          <div className="flex items-center justify-center gap-2 mb-8">
            {creationSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index <= creationStep
                    ? 'w-8 bg-gradient-to-r from-violet-600 to-purple-600'
                    : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>

          <div className="space-y-3 mb-8">
            {creationSteps.slice(0, creationStep).map((step, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm animate-slide-in-left"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-slate-700 font-medium">{step.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}></div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-medium text-slate-700">Create Your Profile</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-violet-900 to-purple-900 bg-clip-text text-transparent mb-2">
            Let's build your card
          </h1>
          <p className="text-slate-600 text-lg">Quick setup • Less than 2 minutes</p>
        </div>

        <Card className="bg-white/90 backdrop-blur-xl shadow-2xl border-slate-200">
          <CardContent className="p-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">
                  Step {Math.min(currentStep + 1, 5)} of 5
                </span>
                <span className="text-sm text-slate-500">{Math.round((Math.min(currentStep + 1, 5) / 5) * 100)}%</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-violet-600 to-purple-600 transition-all duration-300"
                  style={{ width: `${(Math.min(currentStep + 1, 5) / 5) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Step 0: Avatar */}
            {currentStep === 0 && (
              <div className="space-y-6 animate-slide-up">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Add your photo</h2>
                  <p className="text-slate-600">Make your card more personal</p>
                </div>
                
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={profileData.avatar_url} alt="Profile" />
                    <AvatarFallback className="text-2xl">
                      <User className="w-16 h-16" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('avatar-upload')?.click()}
                      className="gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Photo
                    </Button>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </div>
                  
                  {profileData.avatar_url && (
                    <p className="text-xs text-green-600">✓ Profile photo set</p>
                  )}
                </div>

                {username && (
                  <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg">
                    <p className="text-sm text-slate-600">Your profile URL:</p>
                    <p className="text-sm font-mono font-medium text-violet-600">patra.app/{username}</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 1: Company & Website */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-slide-up">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Company & Website</h2>
                  <p className="text-slate-600">Where do you work?</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={profileData.company}
                      onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                      placeholder="Acme Inc."
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                      placeholder="https://example.com"
                      className="h-12"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Job Title */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-slide-up">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">What do you do?</h2>
                  <p className="text-slate-600">Your professional title</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="job_title">Job Title</Label>
                  <Input
                    id="job_title"
                    value={profileData.job_title}
                    onChange={(e) => setProfileData({ ...profileData, job_title: e.target.value })}
                    placeholder="e.g., Software Engineer, Designer, Entrepreneur"
                    className="h-12"
                  />
                </div>
              </div>
            )}

            {/* Step 3: About */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-slide-up">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Tell us about yourself</h2>
                  <p className="text-slate-600">A brief description of who you are</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">About</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    placeholder="Share a bit about yourself, your work, or what you're passionate about..."
                    className="min-h-32 resize-none"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Verification */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-slide-up">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Review Your Details</h2>
                  <p className="text-slate-600">Make sure everything looks good</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-lg space-y-3">
                    {profileData.avatar_url && (
                      <div className="flex items-center gap-3">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={profileData.avatar_url} alt="Profile" />
                          <AvatarFallback><User className="w-8 h-8" /></AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Avatar</p>
                          <p className="text-sm text-green-600">✓ Set</p>
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Job Title</p>
                      <p className="text-base font-medium text-slate-900">{profileData.job_title || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Company</p>
                      <p className="text-base font-medium text-slate-900">{profileData.company || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Website</p>
                      <p className="text-base font-medium text-slate-900">{profileData.website || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">About</p>
                      <p className="text-base font-medium text-slate-900">{profileData.bio || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleCreateProfile}
                  className="w-full h-14 text-lg"
                  size="lg"
                >
                  Create My Profile
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>
              </div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 4 && (
              <div className="flex gap-3 mt-8">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1 h-12"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className="flex-1 h-12"
                >
                  {currentStep === 3 ? 'Review' : 'Next'}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Skip Option */}
            {currentStep < 4 && (
              <div className="text-center mt-6">
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  className="text-slate-500 hover:text-slate-700"
                >
                  Skip for now
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
