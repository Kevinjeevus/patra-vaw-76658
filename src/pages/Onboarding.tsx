import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ChevronLeft, Users, Briefcase, CreditCard, Sparkles, Brain, Wand2, Palette, Check } from 'lucide-react';

interface OnboardingData {
  display_name: string;
  job_title: string;
  company_name: string;
  role: string;
  hear_about_us: string;
  goals: string;
  team_size: string;
}

const aiLoadingSteps = [
  { icon: Brain, text: "Analyzing your information...", duration: 1500 },
  { icon: Wand2, text: "Generating suitable fields...", duration: 1500 },
  { icon: Palette, text: "AI picking your card design...", duration: 1500 },
  { icon: Sparkles, text: "Personalizing your experience...", duration: 1000 },
  { icon: Check, text: "All set! Redirecting...", duration: 500 }
];

export const Onboarding: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showAILoading, setShowAILoading] = useState(false);
  const [aiLoadingStep, setAiLoadingStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    display_name: '',
    job_title: '',
    company_name: '',
    role: 'member',
    hear_about_us: '',
    goals: '',
    team_size: '',
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  // AI Loading Animation
  useEffect(() => {
    if (showAILoading && aiLoadingStep < aiLoadingSteps.length) {
      const timer = setTimeout(() => {
        setAiLoadingStep(aiLoadingStep + 1);
      }, aiLoadingSteps[aiLoadingStep].duration);
      
      return () => clearTimeout(timer);
    } else if (showAILoading && aiLoadingStep >= aiLoadingSteps.length) {
      // Complete the actual onboarding
      completeOnboarding();
    }
  }, [showAILoading, aiLoadingStep]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setLoading(true);
    setShowAILoading(true);
    setAiLoadingStep(0);
  };

  const completeOnboarding = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: data.display_name,
          job_title: data.job_title,
          role: data.role as 'owner' | 'admin' | 'team_head' | 'member' | 'designer',
          onboarding_completed: true,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Welcome to CardCraft!",
        description: "Your profile has been set up successfully.",
      });

      navigate('/editor');
    } catch (error: any) {
      console.error('Error completing onboarding:', error);
      toast({
        title: "Error",
        description: "Failed to complete onboarding. Please try again.",
        variant: "destructive"
      });
      setShowAILoading(false);
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-scale-in">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
                Tell us about yourself
              </h2>
              <p className="text-slate-600">Let's personalize your CardCraft experience</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="display_name" className="text-sm font-semibold text-slate-700">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="display_name"
                  value={data.display_name}
                  onChange={(e) => setData({ ...data, display_name: e.target.value })}
                  placeholder="Enter your full name"
                  className="h-12 bg-white border-slate-200 focus:border-violet-500 focus:ring-violet-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="job_title" className="text-sm font-semibold text-slate-700">
                  Job Title
                </Label>
                <Input
                  id="job_title"
                  value={data.job_title}
                  onChange={(e) => setData({ ...data, job_title: e.target.value })}
                  placeholder="e.g., Marketing Manager"
                  className="h-12 bg-white border-slate-200 focus:border-violet-500 focus:ring-violet-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company_name" className="text-sm font-semibold text-slate-700">
                  Company/Organization
                </Label>
                <Input
                  id="company_name"
                  value={data.company_name}
                  onChange={(e) => setData({ ...data, company_name: e.target.value })}
                  placeholder="e.g., Acme Inc."
                  className="h-12 bg-white border-slate-200 focus:border-violet-500 focus:ring-violet-500"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-scale-in">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
                Your role & team
              </h2>
              <p className="text-slate-600">Help us understand your team structure</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-semibold text-slate-700">
                  Your Role
                </Label>
                <Select value={data.role} onValueChange={(value) => setData({ ...data, role: value })}>
                  <SelectTrigger className="h-12 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="owner">Business Owner</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="manager">Team Manager</SelectItem>
                    <SelectItem value="member">Team Member</SelectItem>
                    <SelectItem value="freelancer">Freelancer</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="team_size" className="text-sm font-semibold text-slate-700">
                  Team Size
                </Label>
                <Select value={data.team_size} onValueChange={(value) => setData({ ...data, team_size: value })}>
                  <SelectTrigger className="h-12 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="just-me">Just me</SelectItem>
                    <SelectItem value="2-5">2-5 people</SelectItem>
                    <SelectItem value="6-20">6-20 people</SelectItem>
                    <SelectItem value="21-50">21-50 people</SelectItem>
                    <SelectItem value="51-200">51-200 people</SelectItem>
                    <SelectItem value="200+">200+ people</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hear_about_us" className="text-sm font-semibold text-slate-700">
                  How did you hear about us?
                </Label>
                <Select value={data.hear_about_us} onValueChange={(value) => setData({ ...data, hear_about_us: value })}>
                  <SelectTrigger className="h-12 bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="search">Google/Search Engine</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="referral">Friend/Colleague Referral</SelectItem>
                    <SelectItem value="advertisement">Online Advertisement</SelectItem>
                    <SelectItem value="blog">Blog/Article</SelectItem>
                    <SelectItem value="event">Event/Conference</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-scale-in">
                <CreditCard className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
                Your goals
              </h2>
              <p className="text-slate-600">What do you want to achieve with digital business cards?</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="goals" className="text-sm font-semibold text-slate-700">
                  What are your main goals? (Optional)
                </Label>
                <Textarea
                  id="goals"
                  value={data.goals}
                  onChange={(e) => setData({ ...data, goals: e.target.value })}
                  placeholder="e.g., Streamline networking, Go paperless, Professional branding..."
                  className="min-h-[120px] bg-white border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 resize-none"
                />
              </div>

              <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">AI-Powered Suggestions</h4>
                    <p className="text-sm text-slate-600">
                      Based on your goals, we'll recommend the best templates and features for your cards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return data.display_name.trim() !== '';
      case 2:
        return data.role !== '';
      case 3:
        return true;
      default:
        return false;
    }
  };

  // AI Loading Screen
  if (showAILoading) {
    const CurrentIcon = aiLoadingStep < aiLoadingSteps.length ? aiLoadingSteps[aiLoadingStep].icon : Check;
    const currentText = aiLoadingStep < aiLoadingSteps.length ? aiLoadingSteps[aiLoadingStep].text : "Complete!";
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>

        {/* Gradient orbs */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="relative z-10 text-center max-w-md w-full">
          {/* Main Icon Animation */}
          <div className="mb-8 relative">
            <div className="w-32 h-32 mx-auto relative">
              {/* Spinning rings */}
              <div className="absolute inset-0 border-4 border-violet-200 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-2 border-4 border-purple-200 rounded-full animate-spin-reverse"></div>
              <div className="absolute inset-4 border-4 border-pink-200 rounded-full animate-spin-slow"></div>
              
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
                  <CurrentIcon className="w-10 h-10 text-white animate-bounce-slow" />
                </div>
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 animate-fade-in">
            {currentText}
          </h2>
          
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {aiLoadingSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index <= aiLoadingStep
                    ? 'w-8 bg-gradient-to-r from-violet-600 to-purple-600'
                    : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>

          {/* Steps completed */}
          <div className="space-y-3 mb-8">
            {aiLoadingSteps.slice(0, aiLoadingStep).map((step, index) => (
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

          {/* Fun fact */}
          <p className="text-sm text-slate-500 italic">
            Did you know? Digital cards are 90% more likely to be saved than paper cards! 🌱
          </p>
        </div>
      </div>
    );
  }

  // Main Onboarding UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}></div>

      {/* Subtle gradient orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-violet-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl"></div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-semibold text-slate-700">Welcome to CardCraft</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent mb-3">
            Let's get you started
          </h1>
          <p className="text-lg text-slate-600">Create your professional digital identity in minutes</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-sm text-slate-600 mb-3">
            <span className="font-semibold">Step {currentStep} of {totalSteps}</span>
            <span className="text-slate-500">{Math.round(progress)}% complete</span>
          </div>
          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Main Card */}
        <Card className="border-slate-200 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8 md:p-10">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10 gap-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="gap-2 h-12 px-6 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back</span>
              </Button>

              <Button
                onClick={handleNext}
                disabled={!isStepValid() || loading}
                className="gap-2 h-12 px-8 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {currentStep === totalSteps ? (
                  loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Complete Setup
                      <Sparkles className="w-5 h-5" />
                    </>
                  )
                ) : (
                  <>
                    Continue
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <p className="text-center text-sm text-slate-500 mt-6">
          🔒 Your information is secure and can be updated anytime in settings
        </p>
      </div>

      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 4s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};
