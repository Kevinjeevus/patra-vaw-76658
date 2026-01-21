import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { HeroButton } from '@/components/ui/hero-button';
import { Menu, X, ArrowLeft } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [accountType, setAccountType] = useState<string | null>(null);

  React.useEffect(() => {
    if (user) {
      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl('test'); // Just dummy to trigger some effect? No.

      const fetchType = async () => {
        const { data } = await supabase.from('profiles').select('account_type').eq('user_id', user.id).single();
        if (data) setAccountType(data.account_type);
      };
      fetchType();
    }
  }, [user]);

  const isLandingPage = location.pathname === '/';

  const handleBackClick = () => {
    // Check if there's history to go back to (length > 2 because first page is 1, and we likely came from somewhere)
    // However, window.history.length can be unreliable. 
    // Let's check if we have a state or just try navigate(-1).
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(accountType === 'company' ? '/dashboard' : '/editor');
    }
  };

  const handleLogoClick = () => {
    if (user) {
      navigate(accountType === 'company' ? '/dashboard' : '/editor');
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-glass-border">
      <div className="container mx-auto px-4 bg-slate-50">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            {/* Back Button (only on non-landing pages) */}
            {!isLandingPage && (
              <button
                onClick={handleBackClick}
                className="flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                <span className="hidden sm:inline font-medium">Back</span>
              </button>
            )}

            {/* Logo */}
            <div
              className="flex items-center cursor-pointer group"
              onClick={handleLogoClick}
            >
              <div className="text-2xl font-bold text-slate-900 flex items-center gap-1">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">P</span>
                </div>
                <span className="group-hover:text-slate-600 transition-colors">atra</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/yourself-ai" className="text-foreground-muted hover:text-foreground transition-colors">
              Yourself AI
            </Link>
            <a href="#features" className="text-foreground-muted hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#templates" className="text-foreground-muted hover:text-foreground transition-colors">
              Templates
            </a>
            <Link to="/pricing" className="text-foreground-muted hover:text-foreground transition-colors">
              Pricing
            </Link>
            <a href="#about" className="text-foreground-muted hover:text-foreground transition-colors">
              About
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <HeroButton variant="ghost" size="sm" onClick={() => window.location.href = '/auth'}>
              Sign In
            </HeroButton>
            <HeroButton variant="primary" size="sm" onClick={() => window.location.href = '/auth'}>
              Get Started
            </HeroButton>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-foreground-muted hover:text-foreground transition-colors" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-glass-border">
            <div className="flex flex-col space-y-4">
              <Link to="/yourself-ai" className="text-foreground-muted hover:text-foreground transition-colors px-4 py-2">
                Yourself AI
              </Link>
              <a href="#features" className="text-foreground-muted hover:text-foreground transition-colors px-4 py-2">
                Features
              </a>
              <a href="#templates" className="text-foreground-muted hover:text-foreground transition-colors px-4 py-2">
                Templates
              </a>
              <Link to="/pricing" className="text-foreground-muted hover:text-foreground transition-colors px-4 py-2">
                Pricing
              </Link>
              <a href="#about" className="text-foreground-muted hover:text-foreground transition-colors px-4 py-2">
                About
              </a>
              <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-glass-border">
                <HeroButton variant="ghost" size="sm" className="justify-start" onClick={() => window.location.href = '/auth'}>
                  Sign In
                </HeroButton>
                <HeroButton variant="primary" size="sm" onClick={() => window.location.href = '/auth'}>
                  Get Started
                </HeroButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};