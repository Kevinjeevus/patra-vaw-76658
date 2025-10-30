import React, { useState, useEffect, useRef } from 'react';
import { DocsLayout } from '@/components/DocsLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { 
  TreePine, 
  Leaf,
  Globe,
  Sparkles,
  Smartphone,
  Zap,
  Shield,
  Users,
  User,
  Link2,
  Award,
  Camera,
  Palette,
  Code,
  Rocket,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Star,
  Edit3,
  Settings,
  Eye,
  Share2,
  Layers,
  Image as ImageIcon,
  Type,
  Layout,
  GitBranch,
  Download
} from 'lucide-react';

const mainSections = [
  {
    id: 'welcome',
    title: 'Welcome to Patra',
    icon: Sparkles,
    description: 'Your digital identity, reimagined'
  },
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Rocket,
    description: 'Create your first digital card',
    link: '/editor'
  },
  {
    id: 'editor',
    title: 'Using the Editor',
    icon: Edit3,
    description: 'Master the card editor',
    link: '/editor'
  },
  {
    id: 'customization',
    title: 'Customization Guide',
    icon: Palette,
    description: 'Make your card uniquely yours'
  },
  {
    id: 'sharing',
    title: 'Sharing Your Card',
    icon: Share2,
    description: 'Get your card out there',
    link: '/:username'
  },
  {
    id: 'settings',
    title: 'Account & Settings',
    icon: Settings,
    description: 'Manage your profile',
    link: '/settings'
  },
  {
    id: 'advanced',
    title: 'Advanced Features',
    icon: Code,
    description: 'For power users and developers'
  }
];

export const DocsNew: React.FC = () => {
  const [activeSection, setActiveSection] = useState('welcome');
  const [customDocs, setCustomDocs] = useState<any[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    loadCustomDocs();
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section-id');
            if (sectionId) {
              setActiveSection(sectionId);
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-100px 0px -60% 0px'
      }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref && observerRef.current) {
        observerRef.current.observe(ref);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [customDocs]);

  const loadCustomDocs = async () => {
    try {
      const { data, error } = await supabase
        .from('documentation_pages')
        .select('*')
        .eq('is_published', true)
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      if (data) setCustomDocs(data);
    } catch (error) {
      console.error('Error loading documentation:', error);
    }
  };

  const handleSectionChange = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderContent = (sectionId: string) => {
    switch (sectionId) {
      case 'welcome':
        return (
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 mb-6">
                <TreePine className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Welcome to Patra
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                The eco-friendly digital business card platform that helps you make lasting connections while protecting the planet.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 border-green-200 dark:border-green-900 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                <CardContent className="pt-6 text-center">
                  <Leaf className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-3" />
                  <div className="text-4xl font-bold text-green-700 dark:text-green-400 mb-1">500+</div>
                  <div className="text-sm text-muted-foreground">Trees saved per 10,000 users</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-blue-200 dark:border-blue-900 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
                <CardContent className="pt-6 text-center">
                  <Globe className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                  <div className="text-4xl font-bold text-blue-700 dark:text-blue-400 mb-1">85%</div>
                  <div className="text-sm text-muted-foreground">Reduced carbon footprint</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-purple-200 dark:border-purple-900 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                <CardContent className="pt-6 text-center">
                  <Zap className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
                  <div className="text-4xl font-bold text-purple-700 dark:text-purple-400 mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Digital, zero waste</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Why Go Digital?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Always Up-to-Date</h4>
                        <p className="text-sm text-muted-foreground">Change your info once, update everywhere instantly</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Never Runs Out</h4>
                        <p className="text-sm text-muted-foreground">Share unlimited times without reordering cards</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Rich Media Support</h4>
                        <p className="text-sm text-muted-foreground">Add photos, videos, portfolios, and social links</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Analytics Insights</h4>
                        <p className="text-sm text-muted-foreground">Track views and engagement with your card</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Privacy Control</h4>
                        <p className="text-sm text-muted-foreground">Choose exactly what information to share</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Planet-Friendly</h4>
                        <p className="text-sm text-muted-foreground">Zero paper waste, minimal environmental impact</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'getting-started':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-3">Getting Started</h1>
              <p className="text-lg text-muted-foreground">
                Create your professional digital identity in under 5 minutes
              </p>
            </div>

            <div className="space-y-6">
              {[
                { 
                  step: 1, 
                  title: 'Sign Up & Choose Username', 
                  description: 'Create your account and claim your unique URL (e.g., patra.app/yourname)',
                  icon: User,
                  action: 'Get started',
                  link: '/signup'
                },
                { 
                  step: 2, 
                  title: 'Open the Editor', 
                  description: 'Access the powerful card editor from your dashboard',
                  icon: Edit3,
                  action: 'Open Editor',
                  link: '/editor'
                },
                { 
                  step: 3, 
                  title: 'Add Your Information', 
                  description: 'Fill in your name, title, contact details, bio, and social links',
                  icon: Type,
                  tip: 'Pro tip: Add a professional photo for 40% more engagement'
                },
                { 
                  step: 4, 
                  title: 'Customize Your Design', 
                  description: 'Choose from beautiful templates or create your own unique style',
                  icon: Palette,
                  tip: 'Try different templates - you can always change later'
                },
                { 
                  step: 5, 
                  title: 'Preview & Publish', 
                  description: 'Review your card and make it live with one click',
                  icon: Eye,
                  action: 'View Example',
                  link: '/:username'
                },
                { 
                  step: 6, 
                  title: 'Share Your Card', 
                  description: 'Get your QR code, share your link, and start networking',
                  icon: Share2,
                  tip: 'Download your QR code to use on email signatures and presentations'
                }
              ].map((item) => (
                <Card key={item.step} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="flex items-start gap-4 pt-6">
                    <div className="bg-gradient-to-br from-primary to-purple-600 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <item.icon className="w-5 h-5 text-primary" />
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mb-3">{item.description}</p>
                      {item.tip && (
                        <div className="bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 text-sm p-3 rounded-lg border border-blue-200 dark:border-blue-900">
                          💡 {item.tip}
                        </div>
                      )}
                      {item.action && (
                        <Button variant="outline" size="sm" className="mt-3">
                          {item.action}
                          <ExternalLink className="w-3 h-3 ml-2" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-purple-500/5">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Rocket className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Ready to Launch?</h3>
                    <p className="text-muted-foreground mb-4">
                      Head to the editor and start building your digital presence. Need help? Continue reading below for detailed guides on each feature.
                    </p>
                    <Button>
                      Open Editor
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'editor':
        return (
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl font-bold">Using the Editor</h1>
                <Button variant="outline" size="sm">
                  Open Editor
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </div>
              <p className="text-lg text-muted-foreground">
                Master the card editor with this comprehensive guide
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layout className="w-5 h-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">Full Name</h4>
                    <p className="text-sm text-muted-foreground">Your display name (required)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Job Title / Tagline</h4>
                    <p className="text-sm text-muted-foreground">What you do or your professional headline</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Bio</h4>
                    <p className="text-sm text-muted-foreground">Brief description about yourself (supports markdown)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Company</h4>
                    <p className="text-sm text-muted-foreground">Your current organization</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Link2 className="w-5 h-5" />
                    Contact & Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">Email Address</h4>
                    <p className="text-sm text-muted-foreground">Professional email for contact</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone Number</h4>
                    <p className="text-sm text-muted-foreground">Optional contact number</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Website / Portfolio</h4>
                    <p className="text-sm text-muted-foreground">Personal or company website</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Social Links</h4>
                    <p className="text-sm text-muted-foreground">LinkedIn, Twitter, Instagram, GitHub, etc.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Profile Photo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-3">
                    Upload a professional photo to personalize your card
                  </p>
                  <div className="text-sm space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Square format recommended (1:1 ratio)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Minimum 400x400 pixels</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>JPG or PNG, under 2MB</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Clear, well-lit, professional</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Banner Image
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-3">
                    Customize your card header with a banner
                  </p>
                  <div className="text-sm space-y-2">
                    <div>
                      <span className="font-semibold">Gradient:</span> Default smooth gradient background
                    </div>
                    <div>
                      <span className="font-semibold">Solid Color:</span> Choose from presets or custom hex
                    </div>
                    <div>
                      <span className="font-semibold">Image:</span> Upload custom banner (1200x400px recommended)
                    </div>
                    <div>
                      <span className="font-semibold">Pattern:</span> Dots, lines, waves, or grid overlays
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <Sparkles className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Editor Tips</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Your changes auto-save as you type</li>
                      <li>• Use the preview button to see how your card looks on mobile</li>
                      <li>• Markdown is supported in the bio field for bold, italic, and links</li>
                      <li>• Reorder social links by dragging them</li>
                      <li>• Toggle visibility for any field you don't want to display</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'customization':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-3">Customization Guide</h1>
              <p className="text-lg text-muted-foreground">
                Make your card stand out with powerful customization options
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Card Templates
                </CardTitle>
                <CardDescription>Choose from professionally designed templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 mb-6">
                  {[
                    { 
                      name: 'Classic', 
                      description: 'Traditional professional design with clean layout and centered alignment',
                      best: 'Corporate professionals, consultants',
                      free: true 
                    },
                    { 
                      name: 'Modern', 
                      description: 'Bold gradients with glass morphism effects and contemporary styling',
                      best: 'Designers, creatives, tech professionals',
                      free: true 
                    },
                    { 
                      name: 'Minimal', 
                      description: 'Ultra-clean design focusing on content with subtle accents',
                      best: 'Minimalists, photographers, writers',
                      free: true 
                    },
                    { 
                      name: 'Bento Grid', 
                      description: 'Modern grid-based layout with dynamic card sections',
                      best: 'Multi-hyphenates, portfolio showcasing',
                      premium: true 
                    },
                    { 
                      name: 'Magazine', 
                      description: 'Editorial-style two-column layout with featured content areas',
                      best: 'Journalists, bloggers, content creators',
                      premium: true 
                    },
                    { 
                      name: 'Creative', 
                      description: 'Experimental design with animated patterns and bold colors',
                      best: 'Artists, innovators, entrepreneurs',
                      premium: true 
                    }
                  ].map((template) => (
                    <div key={template.name} className="p-4 border-2 rounded-xl hover:border-primary/50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-lg flex items-center gap-2 mb-1">
                            {template.name}
                            {template.premium && <Badge variant="secondary">Premium</Badge>}
                            {template.free && <Badge variant="outline" className="text-green-600 border-green-600">Free</Badge>}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                          <p className="text-xs text-muted-foreground">
                            <span className="font-semibold">Best for:</span> {template.best}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <h4 className="font-semibold">How to Apply Templates</h4>
                  <ol className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="font-semibold text-foreground">1.</span>
                      Navigate to the Templates section from your dashboard
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-foreground">2.</span>
                      Browse available Card or Profile templates with live previews
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-foreground">3.</span>
                      Click on any template to see full-screen preview
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-foreground">4.</span>
                      Click "Apply Template" to instantly update your card
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-foreground">5.</span>
                      Further customize colors, fonts, and layout in the editor
                    </li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Colors & Themes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">Color Customization</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-gradient-to-r from-blue-500 to-purple-500"></div>
                        <span className="text-sm">Primary accent color</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-gradient-to-r from-slate-100 to-slate-300 border"></div>
                        <span className="text-sm">Background color</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-slate-900"></div>
                        <span className="text-sm">Text color</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded border-2 border-slate-300"></div>
                        <span className="text-sm">Border color</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-gradient-to-br from-green-400 to-blue-500"></div>
                        <span className="text-sm">Banner gradient</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-slate-500/10 backdrop-blur"></div>
                        <span className="text-sm">Card overlay</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">Theme Modes</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg bg-white">
                      <h5 className="font-semibold mb-1">☀️ Light Mode</h5>
                      <p className="text-sm text-muted-foreground">Clean and professional for all contexts</p>
                    </div>
                    <div className="p-4 border rounded-lg bg-slate-900 text-white">
                      <h5 className="font-semibold mb-1">🌙 Dark Mode</h5>
                      <p className="text-sm text-slate-400">Modern and eye-friendly display</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    Your card automatically adapts to visitors' system preferences
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Custom CSS (Advanced)
                </CardTitle>
                <CardDescription>For developers who want complete control</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-900">
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    <strong>⚠️ Advanced Feature:</strong> Custom CSS requires knowledge of web styling. Incorrect CSS may break your card layout.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Available CSS Classes</h4>
                  <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs space-y-2 text-green-400">
                    <div><span className="text-blue-400">.card-container</span> <span className="text-slate-500">/* Main wrapper */</span></div>
                    <div><span className="text-blue-400">.card-header</span> <span className="text-slate-500">/* Header with avatar & banner */</span></div>
                    <div><span className="text-blue-400">.card-content</span> <span className="text-slate-500">/* Main content area */</span></div>
                    <div><span className="text-blue-400">.card-section</span> <span className="text-slate-500">/* Individual sections */</span></div>
                    <div><span className="text-blue-400">.bento-grid</span> <span className="text-slate-500">/* Grid layout container */</span></div>
                    <div><span className="text-blue-400">.social-links</span> <span className="text-slate-500">/* Social media links */</span></div>
                    <div><span className="text-blue-400">.contact-info</span> <span className="text-slate-500">/* Contact details */</span></div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">CSS Variables (Theme-aware)</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Always use HSL color variables to maintain dark mode compatibility:
                  </p>
                  <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs space-y-1 text-green-400">
                    <div>background: hsl(var(--background));</div>
                    <div>color: hsl(var(--foreground));</div>
                    <div>border: 1px solid hsl(var(--border));</div>
                    <div>background: hsl(var(--primary));</div>
                    <div>color: hsl(var(--muted-foreground));</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Example Custom Styles</h4>
                  <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-green-400">
                    <div><span className="text-blue-400">.card-container</span> {'{'}</div>
                    <div className="pl-4">border-radius: 24px;</div>
                    <div className="pl-4">box-shadow: 0 8px 32px rgba(0,0,0,0.1);</div>
                    <div>{'}'}</div>
                    <div className="mt-2"><span className="text-blue-400">.card-header</span> {'{'}</div>
                    <div className="pl-4">backdrop-filter: blur(10px);</div>
                    <div>{'}'}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'sharing':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-3">Sharing Your Card</h1>
              <p className="text-lg text-muted-foreground">
                Multiple ways to share your digital identity with the world
              </p>
            </div>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link2 className="w-5 h-5" />
                  Your Custom URL
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Your card is accessible via your unique username:
                  </p>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm flex items-center justify-between">
                    <span>https://patra.app/<span className="text-primary font-bold">your-username</span></span>
                    <Button variant="outline" size="sm">
                      Copy Link
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Username Requirements</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• 3-30 characters long</li>
                    <li>• Letters, numbers, hyphens (-), and underscores (_) only</li>
                    <li>• Must start with a letter or number</li>
                    <li>• Case insensitive (stored as lowercase)</li>
                    <li>• No spaces or special characters</li>
                    <li>• Reserved words and inappropriate terms blocked</li>
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-900">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    💡 <strong>Pro Tip:</strong> Choose a username that matches your professional brand. It's easier to share and remember!
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    QR Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white p-6 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-slate-900 mx-auto mb-3 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs">QR Code Preview</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Your unique QR code</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Use Your QR Code On:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Email signatures</li>
                      <li>• Presentation slides</li>
                      <li>• LinkedIn profile</li>
                      <li>• Physical materials (if needed)</li>
                      <li>• Conference badges</li>
                    </ul>
                  </div>

                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download QR Code
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Sharing Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <h4 className="font-semibold text-sm mb-1">📧 Email Signature</h4>
                    <p className="text-xs text-muted-foreground">Add your link to every email you send</p>
                  </div>
                  
                  <div className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <h4 className="font-semibold text-sm mb-1">🔗 LinkedIn Bio</h4>
                    <p className="text-xs text-muted-foreground">Include in your profile summary</p>
                  </div>
                  
                  <div className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <h4 className="font-semibold text-sm mb-1">📱 Social Media</h4>
                    <p className="text-xs text-muted-foreground">Share on Twitter, Instagram, Facebook</p>
                  </div>
                  
                  <div className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <h4 className="font-semibold text-sm mb-1">💬 Messaging Apps</h4>
                    <p className="text-xs text-muted-foreground">Send via WhatsApp, Telegram, Slack</p>
                  </div>

                  <div className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <h4 className="font-semibold text-sm mb-1">🎯 NFC Tags</h4>
                    <p className="text-xs text-muted-foreground">Program NFC stickers or cards (advanced)</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Card Views & Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Track how many people view your card and engage with your content:
                </p>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-1">247</div>
                    <div className="text-xs text-muted-foreground">Total Views</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-1">18</div>
                    <div className="text-xs text-muted-foreground">This Week</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-1">42</div>
                    <div className="text-xs text-muted-foreground">Link Clicks</div>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Privacy Note:</strong> We only track anonymous view counts. No personal information about your visitors is collected.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <TreePine className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Environmental Impact Tracker</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Every time someone views your digital card instead of receiving a paper business card, you're making a positive environmental impact.
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        ~0.02 trees saved per 100 views
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl font-bold">Account & Settings</h1>
                <Button variant="outline" size="sm">
                  Open Settings
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </div>
              <p className="text-lg text-muted-foreground">
                Manage your account, privacy, and preferences
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">Change Username</h4>
                    <p className="text-sm text-muted-foreground">Update your custom URL slug</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email Address</h4>
                    <p className="text-sm text-muted-foreground">Update your login email</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Password</h4>
                    <p className="text-sm text-muted-foreground">Change your account password</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Profile Visibility</h4>
                    <p className="text-sm text-muted-foreground">Make your card public or private</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Privacy & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Active Sessions</h4>
                    <p className="text-sm text-muted-foreground">Manage logged-in devices</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Data Export</h4>
                    <p className="text-sm text-muted-foreground">Download all your card data</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Delete Account</h4>
                    <p className="text-sm text-muted-foreground">Permanently remove your account</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Subscription
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">Current Plan</h4>
                    <p className="text-sm text-muted-foreground">View your subscription tier</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Upgrade</h4>
                    <p className="text-sm text-muted-foreground">Unlock premium templates and features</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Billing History</h4>
                    <p className="text-sm text-muted-foreground">View past invoices and payments</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Payment Method</h4>
                    <p className="text-sm text-muted-foreground">Update your card details</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">Theme</h4>
                    <p className="text-sm text-muted-foreground">Light, dark, or system preference</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Language</h4>
                    <p className="text-sm text-muted-foreground">Interface language settings</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Choose what updates you receive</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Analytics</h4>
                    <p className="text-sm text-muted-foreground">Enable or disable view tracking</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <Shield className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Your Data, Your Control</h4>
                    <p className="text-sm text-muted-foreground">
                      We take privacy seriously. You can export all your data at any time, and deletion is permanent. We never sell your information to third parties.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'advanced':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-3">Advanced Features</h1>
              <p className="text-lg text-muted-foreground">
                Power user features and developer tools
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="w-5 h-5" />
                  Card Modes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Multiple Card Views</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access different versions of your card by adding query parameters to your URL:
                  </p>

                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="font-mono text-sm mb-2 text-primary">
                        patra.app/username
                      </div>
                      <p className="text-sm text-muted-foreground">Default profile view with all sections</p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="font-mono text-sm mb-2 text-primary">
                        patra.app/username?card
                      </div>
                      <p className="text-sm text-muted-foreground">Compact business card view</p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="font-mono text-sm mb-2 text-primary">
                        patra.app/username?minimal
                      </div>
                      <p className="text-sm text-muted-foreground">Minimal view with essential info only</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-900">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    💡 <strong>Use Case:</strong> Use the <code className="bg-blue-200 dark:bg-blue-900 px-1 rounded">?card</code> parameter when embedding your card or when you want a quick-share version.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  API Access (Coming Soon)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm mb-3">
                    We're building an API to let you integrate Patra cards into your applications. Features will include:
                  </p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Programmatically create and update cards</li>
                    <li>• Fetch card data as JSON</li>
                    <li>• Batch operations for teams</li>
                    <li>• Webhook notifications for card views</li>
                    <li>• Custom integrations with CRM systems</li>
                  </ul>
                </div>
                <Button variant="outline" disabled>
                  Join API Waitlist
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Team Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Premium plans include team management:
                  </p>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Centralized team dashboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Branded templates for consistency</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Bulk card creation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Analytics across all team members</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Link2 className="w-5 h-5" />
                    Custom Domain
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Enterprise plans can use custom domains:
                  </p>
                  <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                    cards.yourcompany.com/username
                  </div>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Strengthen your brand identity</li>
                    <li>• SSL certificate included</li>
                    <li>• Easy DNS configuration</li>
                    <li>• Redirect support</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Export & Backup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Export your card data in multiple formats:
                </p>

                <div className="grid grid-cols-3 gap-3">
                  <Button variant="outline" className="flex-col h-auto py-4">
                    <Code className="w-5 h-5 mb-2" />
                    <span className="text-xs">JSON</span>
                  </Button>
                  <Button variant="outline" className="flex-col h-auto py-4">
                    <Type className="w-5 h-5 mb-2" />
                    <span className="text-xs">vCard</span>
                  </Button>
                  <Button variant="outline" className="flex-col h-auto py-4">
                    <ImageIcon className="w-5 h-5 mb-2" />
                    <span className="text-xs">PDF</span>
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  <strong>vCard format</strong> can be imported directly into contacts apps on iOS, Android, Outlook, and more.
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 dark:border-purple-900 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Sparkles className="w-8 h-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Have a Feature Request?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      We're constantly improving Patra based on user feedback. Let us know what features you'd like to see next!
                    </p>
                    <Button variant="outline">
                      Submit Feedback
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div>
            <h1 className="text-4xl font-bold mb-4">Documentation</h1>
            <p className="text-lg text-muted-foreground">
              Select a topic from the sidebar to learn more
            </p>
          </div>
        );
    }
  };

  return (
    <DocsLayout activeSection={activeSection} onSectionChange={handleSectionChange}>
      <div className="space-y-24">
        {/* Render default sections with infinite scroll */}
        {defaultSections.map((sectionId) => (
          <section
            key={sectionId}
            ref={(el) => (sectionRefs.current[sectionId] = el)}
            data-section-id={sectionId}
            className="scroll-mt-24"
          >
            {renderDefaultContent(sectionId)}
          </section>
        ))}

        {/* Render custom documentation from database */}
        {customDocs.map((doc) => (
          <section
            key={doc.page_id}
            ref={(el) => (sectionRefs.current[doc.page_id] = el)}
            data-section-id={doc.page_id}
            className="scroll-mt-24"
          >
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-4">{doc.title}</h1>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <div 
                    className="prose prose-sm max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: doc.content }}
                  />
                </CardContent>
              </Card>
            </div>
          </section>
        ))}
      </div>
    </DocsLayout>
  );
};
