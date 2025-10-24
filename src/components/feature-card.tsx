import React from 'react';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: boolean;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  gradient = false,
  className = ""
}) => {
  return (
    <div className={`group cursor-pointer ${className}`}>
      <Card className="card-premium h-full p-6 transition-all duration-500 group-hover:scale-105">
        <div className="space-y-4">
          {/* Icon */}
          <div className={`
            w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300
            ${gradient 
              ? 'bg-gradient-primary group-hover:bg-gradient-warm' 
              : 'bg-secondary group-hover:bg-card-hover'
            }
          `}>
            <Icon 
              className={`
                w-6 h-6 transition-all duration-300
                ${gradient 
                  ? 'text-primary-foreground' 
                  : 'text-foreground group-hover:text-primary'
                }
              `} 
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-gradient transition-all duration-300">
              {title}
            </h3>
            <p className="text-foreground-muted leading-relaxed text-sm">
              {description}
            </p>
          </div>
        </div>

        {/* Hover Glow */}
        <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-500 pointer-events-none"></div>
      </Card>
    </div>
  );
};