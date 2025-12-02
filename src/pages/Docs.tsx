import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import ReactMarkdown from 'react-markdown';
import {
  ArrowLeft,
  TreePine,
  Smartphone,
  Globe,
  Zap,
  Shield,
  Users,
  Heart,
  Leaf,
  Palette,
  Code,
  FileText,
  History,
  Terminal
} from 'lucide-react';

export const Docs: React.FC = () => {
  const navigate = useNavigate();
  const [changelog, setChangelog] = useState<string>('');
  const [loadingChangelog, setLoadingChangelog] = useState(false);

  useEffect(() => {
    fetchChangelog();
  }, []);

  const fetchChangelog = async () => {
    setLoadingChangelog(true);
    try {
      // Try to find a page with slug 'changelog'
      const { data, error } = await supabase
        .from('documentation_pages')
        .select('content')
        .eq('slug', 'changelog')
        .maybeSingle();

      if (data) {
        setChangelog(data.content);
      } else {
        // Fallback or empty state
        setChangelog('# No changelog found.\n\nCheck back later for updates!');
      }
    } catch (error) {
      console.error('Error fetching changelog:', error);
      setChangelog('Failed to load changelog.');
    } finally {
      setLoadingChangelog(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Patra Documentation
              </h1>
              <p className="text-sm text-muted-foreground">Everything you need to know about Patra</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Tabs defaultValue="guide" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="guide" className="gap-2">
              <FileText className="w-4 h-4" />
              Guide
            </TabsTrigger>
            <TabsTrigger value="changelog" className="gap-2">
              <History className="w-4 h-4" />
              Changelog
            </TabsTrigger>
            <TabsTrigger value="developer" className="gap-2">
              <Terminal className="w-4 h-4" />
              Developer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guide" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Environmental Impact */}
            <Card className="border-green-200 dark:border-green-900 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-600" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TreePine className="w-6 h-6 text-green-600 dark:text-green-400" />
                  Environmental Impact
                </CardTitle>
                <CardDescription>
                  Go Digital, Save Trees. Every card counts.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="p-4 rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/50">
                    <Leaf className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-700 dark:text-green-400">500+</div>
                    <div className="text-xs text-muted-foreground">Trees saved / 10k users</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/50">
                    <TreePine className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-700 dark:text-green-400">85%</div>
                    <div className="text-xs text-muted-foreground">Less carbon footprint</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/50">
                    <Globe className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-700 dark:text-green-400">100%</div>
                    <div className="text-xs text-muted-foreground">Digital = Zero waste</div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  By choosing Patra's digital cards, you're not just modernizing your networking — you're actively contributing to environmental conservation. Each digital card you create and share replaces dozens of physical cards throughout its lifetime.
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Why Patra */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    Why Patra?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Smartphone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Always Accessible</h4>
                      <p className="text-xs text-muted-foreground mt-1">Available 24/7, anywhere in the world.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Instant Updates</h4>
                      <p className="text-xs text-muted-foreground mt-1">Real-time updates for everyone.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Shield className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Privacy Control</h4>
                      <p className="text-xs text-muted-foreground mt-1">You decide what to share.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Where to Use */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Where to Use
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      'Networking Events',
                      'Email Signatures',
                      'Social Media Profiles',
                      'Conferences & Meetups',
                      'Job Applications',
                      'Business Meetings'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Templates & Customization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  Design & Customization
                </CardTitle>
                <CardDescription>Make it truly yours</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Templates
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Choose from our collection of professionally designed templates. From "Classic" professional layouts to "Modern" glassmorphism designs, we have something for everyone.
                  </p>
                  <ul className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <li className="bg-muted/50 p-2 rounded">Classic</li>
                    <li className="bg-muted/50 p-2 rounded">Modern</li>
                    <li className="bg-muted/50 p-2 rounded">Minimal</li>
                    <li className="bg-muted/50 p-2 rounded">Bento Grid</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Custom CSS
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    For developers and designers, we offer full control via Custom CSS. Override styles, add animations, and create a completely unique look.
                  </p>
                  <div className="bg-muted p-3 rounded-lg font-mono text-xs overflow-x-auto">
                    <span className="text-purple-400">.card-container</span> {'{'} <br />
                    &nbsp;&nbsp;background: <span className="text-orange-400">linear-gradient</span>(...);<br />
                    {'}'}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="changelog" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card>
              <CardHeader>
                <CardTitle>Changelog</CardTitle>
                <CardDescription>Latest updates and improvements to Patra</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingChangelog ? (
                  <div className="space-y-4">
                    <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
                    <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
                  </div>
                ) : (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown>{changelog}</ReactMarkdown>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="developer" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="w-6 h-6 text-primary" />
                  Developer Resources
                </CardTitle>
                <CardDescription>Build on top of Patra</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4 p-6 border rounded-xl bg-card/50 hover:bg-card/80 transition-colors">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Code className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">API Access</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Integrate Patra cards into your own applications. Get profile data, generate QR codes, and more.
                      </p>
                      <Button variant="outline" onClick={() => navigate('/settings?tab=developer')} className="w-full">
                        Get API Key
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4 p-6 border rounded-xl bg-card/50 hover:bg-card/80 transition-colors">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Webhooks</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Listen to real-time events like card updates, new connections, and analytics triggers.
                      </p>
                      <Button variant="outline" className="w-full" disabled>
                        Coming Soon
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="bg-muted/30 p-6 rounded-xl">
                  <h3 className="font-semibold mb-2">Quick Start</h3>
                  <div className="bg-black/90 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    curl -X GET https://api.patra.me/v1/cards/username \<br />
                    &nbsp;&nbsp;-H "Authorization: Bearer YOUR_API_KEY"
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};