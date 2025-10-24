import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  TreePine, 
  Smartphone, 
  Globe, 
  Zap, 
  Shield, 
  Users, 
  Heart,
  Leaf
} from 'lucide-react';

export const Docs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
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
              <h1 className="text-2xl font-bold">Patra Documentation</h1>
              <p className="text-sm text-muted-foreground">Why, where, how, and when to use Patra</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Environmental Impact */}
          <Card className="border-green-200 dark:border-green-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TreePine className="w-6 h-6 text-green-600 dark:text-green-400" />
                Environmental Impact: Go Digital, Save Trees
              </CardTitle>
              <CardDescription>
                Every digital card you create helps protect our planet
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-lg border border-green-200 dark:border-green-900">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <Leaf className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-green-700 dark:text-green-400">500+</div>
                    <div className="text-sm text-muted-foreground">Trees saved per 10,000 users</div>
                  </div>
                  <div>
                    <TreePine className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-green-700 dark:text-green-400">85%</div>
                    <div className="text-sm text-muted-foreground">Less carbon footprint</div>
                  </div>
                  <div>
                    <Globe className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-green-700 dark:text-green-400">100%</div>
                    <div className="text-sm text-muted-foreground">Digital = Zero waste</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <strong>Did you know?</strong> A single traditional business card requires cutting down trees, using chemicals for printing, and produces waste that often ends up in landfills.
                </p>
                <p>
                  By choosing Patra's digital cards, you're not just modernizing your networking — you're actively contributing to environmental conservation. Each digital card you create and share replaces dozens of physical cards throughout its lifetime.
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Why Patra */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-6 h-6" />
                Why Patra?
              </CardTitle>
              <CardDescription>
                The modern way to share your professional identity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Always Accessible</h4>
                  <p className="text-sm text-muted-foreground">Your digital card is available 24/7, anywhere in the world. No more running out of physical cards or scrambling to find one.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Instant Updates</h4>
                  <p className="text-sm text-muted-foreground">Changed jobs? New phone number? Update your card once and everyone who has it sees the latest information.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Privacy Control</h4>
                  <p className="text-sm text-muted-foreground">You decide what information to share and with whom. Full control over your data at all times.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Professional Networking</h4>
                  <p className="text-sm text-muted-foreground">Integrate all your professional links, portfolios, and contact methods in one beautiful interface.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Where to Use */}
          <Card>
            <CardHeader>
              <CardTitle>Where to Use Your Patra Card</CardTitle>
              <CardDescription>Perfect for every professional situation</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Networking Events:</strong> Share instantly via QR code or link</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Email Signatures:</strong> Add your card link for professional credibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Social Media Profiles:</strong> One link that contains everything</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Conferences & Meetups:</strong> Quick exchange with a simple tap</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Job Applications:</strong> Showcase your complete profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span><strong>Business Meetings:</strong> Professional introduction at your fingertips</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Separator />

          {/* How It Works */}
          <Card>
            <CardHeader>
              <CardTitle>How to Get Started</CardTitle>
              <CardDescription>Simple steps to create your digital presence</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-medium">Create Your Card</h4>
                    <p className="text-sm text-muted-foreground">Sign up and fill in your professional information, add links, and customize your design</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-medium">Customize Your Profile</h4>
                    <p className="text-sm text-muted-foreground">Choose a theme, add your photo, social links, and showcase your work</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-medium">Share Everywhere</h4>
                    <p className="text-sm text-muted-foreground">Get your unique URL and QR code to share via email, social media, or in person</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-medium">Track & Update</h4>
                    <p className="text-sm text-muted-foreground">Monitor views and engagement, update your information anytime</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* When to Update */}
          <Card>
            <CardHeader>
              <CardTitle>When to Update Your Card</CardTitle>
              <CardDescription>Keep your information current</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>When you change jobs or get promoted</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>After launching a new project or portfolio</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>When your contact information changes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Before major networking events</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>When you earn new certifications or achievements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>To refresh your professional image</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};