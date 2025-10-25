import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Bug, MessageSquare, Lightbulb, HelpCircle, Send } from 'lucide-react';

interface FeedbackFormProps {
  type: 'bug' | 'feedback' | 'feature' | 'support';
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ type }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [signature, setSignature] = useState('');

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (data) {
      setProfile(data);
      setSignature(data.display_name || '');
    }
  };

  const getDeviceInfo = () => {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
    };
  };

  const getIPAddress = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Failed to get IP:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !subject.trim() || !content.trim()) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const ipAddress = await getIPAddress();
      const deviceInfo = getDeviceInfo();

      const { error } = await supabase
        .from('feedback_submissions')
        .insert({
          user_id: user.id,
          type: type,
          subject: subject,
          content: content,
          user_signature: signature,
          user_email: user.email,
          user_phone: profile?.phone || null,
          user_name: profile?.display_name || user.email?.split('@')[0] || 'User',
          ip_address: ipAddress,
          device_info: deviceInfo,
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Your submission has been sent to the admin team',
      });

      setSubject('');
      setContent('');
    } catch (error: any) {
      console.error('Error submitting feedback:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'bug': return <Bug className="w-6 h-6" />;
      case 'feature': return <Lightbulb className="w-6 h-6" />;
      case 'support': return <HelpCircle className="w-6 h-6" />;
      default: return <MessageSquare className="w-6 h-6" />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'bug': return 'Report a Bug';
      case 'feature': return 'Suggest a Feature';
      case 'support': return 'Get Support';
      default: return 'Send Feedback';
    }
  };

  const getDescription = () => {
    switch (type) {
      case 'bug': return 'Found a bug? Help us improve by reporting it.';
      case 'feature': return 'Have an idea? Share your feature request with us.';
      case 'support': return 'Need help? Our team is here to assist you.';
      default: return 'Share your thoughts and help us improve.';
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          {getIcon()}
          {getTitle()}
        </CardTitle>
        <CardDescription>{getDescription()}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profile?.display_name || ''}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={user?.email || ''}
                disabled
                className="bg-muted"
              />
            </div>
          </div>

          {profile?.phone && (
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={profile.phone}
                disabled
                className="bg-muted"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief description of your issue or suggestion"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Details *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Provide as much detail as possible..."
              rows={8}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signature">Signature</Label>
            <Input
              id="signature"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder="Your name or signature"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            <Send className="w-4 h-4 mr-2" />
            {loading ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
