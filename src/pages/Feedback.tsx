import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { FeedbackForm } from '@/components/FeedbackForm';

export const Feedback: React.FC = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: 'bug' | 'feedback' | 'feature' | 'support' }>();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate('/settings')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Settings
          </Button>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <FeedbackForm type={type as any || 'feedback'} />
      </div>
    </div>
  );
};
