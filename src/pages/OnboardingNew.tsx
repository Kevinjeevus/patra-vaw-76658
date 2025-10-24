import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronRight, ChevronLeft, Users, Building2, User, AlertCircle,
  Brain, Wand2, Palette, Sparkles, Check, CreditCard, MapPin
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from '@/components/ui/checkbox';

type AccountType = 'individual' | 'company' | null;

interface OnboardingData {
  accountType: AccountType;
  display_name: string;
  phone: string;
  email: string;
  age: string;
  locationConsent: boolean;
  locationCoords: { lat: number; lng: number } | null;
  deviceInfo: {
    browser: string;
    device: string;
    ip: string;
  };
}

const aiLoadingSteps = [
  { icon: Brain, text: "Analyzing your information...", duration: 1500 },
  { icon: Wand2, text: "Generating suitable fields...", duration: 1500 },
  { icon: Palette, text: "AI picking your card design...", duration: 1500 },
  { icon: Sparkles, text: "Personalizing your experience...", duration: 1000 },
  { icon: Check, text: "All set! Redirecting...", duration: 500 }
];

export const OnboardingNew: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0); // 0 = account type, 1 = personal info, 2 = complete
  const [loading, setLoading] = useState(false);
  const [showCompanyWarning, setShowCompanyWarning] = useState(false);
  const [showAILoading, setShowAILoading] = useState(false);
  const [aiLoadingStep, setAiLoadingStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    accountType: null,
    display_name: '',
    phone: '',
    email: user?.email || '',
    age: '',
    locationConsent: false,
    locationCoords: null,
    deviceInfo: {
      browser: '',
      device: '',
      ip: ''
    }
  });

  useEffect(() => {
    if (user?.email) {
      setData(prev => ({ ...prev, email: user.email! }));
    }
    // Collect device info
    collectDeviceInfo();
  }, [user]);

  // AI Loading Animation
  useEffect(() => {
    if (showAILoading && aiLoadingStep < aiLoadingSteps.length) {
      const timer = setTimeout(() => {
        setAiLoadingStep(aiLoadingStep + 1);
      }, aiLoadingSteps[aiLoadingStep].duration);
      
      return () => clearTimeout(timer);
    } else if (showAILoading && aiLoadingStep >= aiLoadingSteps.length) {
      completeOnboarding();
    }
  }, [showAILoading, aiLoadingStep]);

  const collectDeviceInfo = async () => {
    const browser = navigator.userAgent;
    const device = /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
    
    // Get IP via a public API
    let ip = 'Unknown';
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const ipData = await response.json();
      ip = ipData.ip;
    } catch (error) {
      console.error('Error fetching IP:', error);
    }

    setData(prev => ({
      ...prev,
      deviceInfo: { browser, device, ip }
    }));
  };

  const requestLocation = async () => {
    if (!data.locationConsent) return;

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setData(prev => ({
            ...prev,
            locationCoords: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }));
          toast({
            title: "Location captured",
            description: `Coordinates: ${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast({
            title: "Location Error",
            description: "Unable to get your location",
            variant: "destructive"
          });
        }
      );
    }
  };

  useEffect(() => {
    if (data.locationConsent) {
      requestLocation();
    }
  }, [data.locationConsent]);

  const handleAccountTypeSelect = (type: AccountType) => {
    if (type === 'company') {
      setShowCompanyWarning(true);
    } else {
      setData({ ...data, accountType: type });
      setCurrentStep(1);
    }
  };

  const handleCompanyConfirm = () => {
    setData({ ...data, accountType: 'company' });
    setShowCompanyWarning(false);
    // For companies, they need to go through payment - redirect to a payment page or show payment form
    toast({
      title: "Company Account",
      description: "Please complete verification payment of ₹20",
      variant: "default"
    });
    setCurrentStep(1);
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
          phone: data.phone || null,
          age: data.age ? parseInt(data.age) : null,
          account_type: data.accountType,
          location_coordinates: data.locationCoords ? `(${data.locationCoords.lat},${data.locationCoords.lng})` : null,
          device_info: data.deviceInfo,
          onboarding_completed: true,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Welcome to Patra!",
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

  const isStepValid = () => {
    if (currentStep === 0) return data.accountType !== null;
    if (currentStep === 1) return data.display_name.trim() !== '';
    return true;
  };

  // AI Loading Screen
  if (showAILoading) {
    const CurrentIcon = aiLoadingStep < aiLoadingSteps.length ? aiLoadingSteps[aiLoadingStep].icon : Check;
    const currentText = aiLoadingStep < aiLoadingSteps.length ? aiLoadingSteps[aiLoadingStep].text : "Complete!";
    
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

          <p className="text-sm text-slate-500 italic">
            Did you know? Digital cards are 90% more likely to be saved than paper cards! 🌱
          </p>
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

      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-violet-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl"></div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-violet-600" />
            <span className="text-sm font-medium text-slate-700">Welcome to Patra</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-violet-900 to-purple-900 bg-clip-text text-transparent mb-2">
            Let's get you started
          </h1>
          <p className="text-slate-600 text-lg">Choose the best account type for you</p>
        </div>

        <Card className="bg-white/90 backdrop-blur-xl shadow-2xl border-slate-200">
          <CardContent className="p-8">
            {currentStep === 0 && (
              <div className="space-y-6 animate-slide-up">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Choose Account Type</h2>
                  <p className="text-slate-600">Select the option that best describes you</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleAccountTypeSelect('individual')}
                    className="group relative p-6 rounded-2xl border-2 border-slate-200 hover:border-violet-500 bg-white hover:bg-violet-50/50 transition-all duration-200 text-left"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Individual</h3>
                    <p className="text-sm text-slate-600">
                      For personal use, freelancers, and professionals
                    </p>
                  </button>

                  <button
                    onClick={() => handleAccountTypeSelect('company')}
                    className="group relative p-6 rounded-2xl border-2 border-slate-200 hover:border-blue-500 bg-white hover:bg-blue-50/50 transition-all duration-200 text-left"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Company</h3>
                    <p className="text-sm text-slate-600">
                      For organizations managing employee cards
                    </p>
                    <div className="mt-3 text-xs text-orange-600 font-medium">
                      Requires verification (₹20)
                    </div>
                  </button>
                </div>
              </div>
            )}

            {currentStep === 1 && data.accountType === 'individual' && (
              <div className="space-y-6 animate-slide-up">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Personal Information</h2>
                  <p className="text-slate-600">Tell us a bit about yourself</p>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="display_name">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="display_name"
                      value={data.display_name}
                      onChange={(e) => setData({ ...data, display_name: e.target.value })}
                      placeholder="Enter your full name"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={data.phone}
                      onChange={(e) => setData({ ...data, phone: e.target.value })}
                      placeholder="+91 1234567890"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={data.email}
                      disabled
                      className="h-12 bg-muted"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Age (Optional)</Label>
                    <Input
                      id="age"
                      type="number"
                      value={data.age}
                      onChange={(e) => setData({ ...data, age: e.target.value })}
                      placeholder="25"
                      className="h-12"
                    />
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <Checkbox
                      id="location-consent"
                      checked={data.locationConsent}
                      onCheckedChange={(checked) => setData({ ...data, locationConsent: checked as boolean })}
                    />
                    <div className="flex-1">
                      <Label htmlFor="location-consent" className="text-sm font-medium cursor-pointer">
                        Share my location
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        We'll capture your device location to help personalize your experience
                      </p>
                      {data.locationCoords && (
                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>
                            {data.locationCoords.lat.toFixed(6)}, {data.locationCoords.lng.toFixed(6)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg text-xs text-muted-foreground">
                    <p className="font-medium mb-1">📱 Device Information</p>
                    <p>Browser: {data.deviceInfo.browser.substring(0, 50)}...</p>
                    <p>Device: {data.deviceInfo.device}</p>
                    <p>IP: {data.deviceInfo.ip}</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(0)}
                    className="flex-1"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    onClick={handleComplete}
                    disabled={!isStepValid() || loading}
                    className="flex-1"
                  >
                    Complete Setup
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 1 && data.accountType === 'company' && (
              <div className="space-y-6 animate-slide-up">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Building2 className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Company Account Setup</h2>
                  <p className="text-slate-600">Complete verification to activate</p>
                </div>

                <div className="p-6 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Verification Payment Required</h4>
                      <p className="text-sm text-slate-600 mb-3">
                        Company accounts require a one-time verification fee of ₹20. Your account will be activated within 1-2 hours after payment verification.
                      </p>
                      <Button className="bg-orange-600 hover:bg-orange-700">
                        Pay ₹20 & Verify
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(0)}
                  className="w-full"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back to Account Selection
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Company Warning Dialog */}
      <AlertDialog open={showCompanyWarning} onOpenChange={setShowCompanyWarning}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-xl">
              <AlertCircle className="w-6 h-6 text-orange-600" />
              Company Account Information
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4 text-left">
              <p className="text-base">
                You're about to create a <strong>Company Account</strong>. Please read this carefully:
              </p>
              
              <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800 space-y-2">
                <h4 className="font-semibold text-slate-900">⚠️ Important Notes:</h4>
                <ul className="text-sm space-y-1 list-disc list-inside text-slate-700">
                  <li>Company accounts <strong>cannot be changed</strong> to individual accounts</li>
                  <li>Verification fee: <strong>₹20</strong> (one-time, non-refundable)</li>
                  <li>Account activation: <strong>1-2 hours</strong> after verification</li>
                  <li>Must have at least <strong>1 employee</strong> (excluding directors)</li>
                </ul>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 space-y-2">
                <h4 className="font-semibold text-slate-900">✨ Company Features:</h4>
                <ul className="text-sm space-y-1 list-disc list-inside text-slate-700">
                  <li>Create ID cards for multiple employees</li>
                  <li>Specialized dashboard for employee management</li>
                  <li>Bulk card printing requests</li>
                  <li>Board of Directors cards (up to 3 members)</li>
                  <li>Centralized profile management</li>
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleCompanyConfirm} className="bg-blue-600 hover:bg-blue-700">
              I Understand, Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
