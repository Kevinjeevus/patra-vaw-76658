import React from 'react';
import { Card } from '@/components/ui/card';

interface BusinessCardPreviewProps {
  className?: string;
  interactive?: boolean;
}

export const BusinessCardPreview: React.FC<BusinessCardPreviewProps> = ({ 
  className = "",
  interactive = true 
}) => {
  return (
    <div className={`perspective-1000 ${className}`}>
      <div 
        className={`
          relative w-80 h-48 card-premium rounded-2xl overflow-hidden
          ${interactive ? 'hover:rotate-y-12 transition-transform duration-700 transform-gpu' : ''}
          animate-float
        `}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Card Front */}
        <div className="absolute inset-0 backface-hidden">
          <div className="h-full w-full bg-gradient-card border border-border rounded-2xl p-6 flex flex-col justify-between">
            {/* Top Section */}
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-primary-foreground rounded-full opacity-80"></div>
              </div>
              <div className="text-right">
                <div className="w-20 h-1 bg-accent rounded-full mb-2"></div>
                <div className="w-16 h-1 bg-accent/60 rounded-full"></div>
              </div>
            </div>

            {/* Middle Section */}
            <div className="space-y-3">
              <div>
                <div className="w-32 h-3 bg-foreground rounded-full mb-2"></div>
                <div className="w-24 h-2 bg-foreground-muted rounded-full"></div>
              </div>
              
              <div className="space-y-1">
                <div className="w-28 h-2 bg-foreground-muted rounded-full"></div>
                <div className="w-36 h-2 bg-foreground-muted rounded-full"></div>
                <div className="w-20 h-2 bg-foreground-muted rounded-full"></div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <div className="w-16 h-1.5 bg-accent rounded-full"></div>
                <div className="w-12 h-1.5 bg-accent/60 rounded-full"></div>
              </div>
              
              <div className="w-8 h-8 border-2 border-accent rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-accent rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-primary opacity-20 blur-xl rounded-2xl animate-glow"></div>
      </div>
    </div>
  );
};