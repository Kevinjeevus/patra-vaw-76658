import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Briefcase, 
  Mail, 
  Phone, 
  Calendar, 
  ExternalLink,
  Heart,
  Globe,
  Share,
  MessageCircle
} from 'lucide-react';

interface CardData {
  fullName: string;
  about: string;
  dob: string;
  location: string;
  timezone: string;
  pronunciation: string;
  pronoun: string;
  languages: string[];
  jobTitle: string;
  company: string;
  email: string;
  phone: string;
  contactForm: string;
  calendar: string;
  socialLinks: Array<{ platform: string; url: string; icon: string | React.ReactElement }>;
  paymentLinks: Array<{ platform: string; url: string; icon: string | React.ReactElement }>;
  customLinks: Array<{ title: string; url: string }>;
  interests: string[];
  photos: string[];
  backgroundColor: string;
  textColor: string;
  accentColor: string;
}

interface CardPreviewProps {
  cardData: CardData;
}

export const CardPreview: React.FC<CardPreviewProps> = ({ cardData }) => {
  const displayName = cardData.fullName || 'Your Name';
  const displayTitle = cardData.jobTitle || 'Your Title';
  const displayCompany = cardData.company || 'Your Company';

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gradient mb-1">Live Preview</h3>
        <p className="text-sm text-foreground-muted">See how your card will look</p>
      </div>

      {/* Mobile Preview */}
      <div className="bg-background-subtle p-4 rounded-lg">
        <div className="mx-auto max-w-sm">
          <div className="bg-card rounded-xl shadow-glow overflow-hidden">
            {/* Header with gradient background */}
            <div 
              className="relative h-32 p-6 flex items-end"
              style={{ background: `linear-gradient(135deg, ${cardData.accentColor}, ${cardData.backgroundColor})` }}
            >
              {/* Avatar placeholder */}
              <div className="w-20 h-20 bg-background rounded-full border-4 border-card shadow-lg flex items-center justify-center text-2xl font-bold text-gradient">
                {displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Name and title */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-card-foreground">{displayName}</h2>
                  {cardData.pronunciation && (
                    <span className="text-sm text-foreground-muted">({cardData.pronunciation})</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-foreground-muted">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-sm">{displayTitle} at {displayCompany}</span>
                </div>
                {cardData.pronoun && (
                  <div className="mt-1">
                    <Badge variant="outline" className="text-xs">{cardData.pronoun}</Badge>
                  </div>
                )}
              </div>

              {/* Location */}
              {cardData.location && (
                <div className="flex items-center gap-2 text-foreground-muted">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{cardData.location}</span>
                </div>
              )}

              {/* About */}
              {cardData.about && (
                <div className="space-y-2">
                  <p className="text-sm text-card-foreground leading-relaxed">{cardData.about}</p>
                </div>
              )}

              {/* Languages */}
              {cardData.languages.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-card-foreground">Languages</h4>
                  <div className="flex flex-wrap gap-1">
                    {cardData.languages.map((language) => (
                      <Badge key={language} variant="secondary" className="text-xs">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact buttons */}
              <div className="grid grid-cols-2 gap-2">
                {cardData.email && (
                  <Button variant="outline" size="sm" className="gap-2 text-xs">
                    <Mail className="w-3 h-3" />
                    Email
                  </Button>
                )}
                {cardData.phone && (
                  <Button variant="outline" size="sm" className="gap-2 text-xs">
                    <Phone className="w-3 h-3" />
                    Call
                  </Button>
                )}
                {cardData.contactForm && (
                  <Button variant="outline" size="sm" className="gap-2 text-xs">
                    <MessageCircle className="w-3 h-3" />
                    Contact
                  </Button>
                )}
                {cardData.calendar && (
                  <Button variant="outline" size="sm" className="gap-2 text-xs">
                    <Calendar className="w-3 h-3" />
                    Book Meeting
                  </Button>
                )}
              </div>

              {/* Social links */}
              {cardData.socialLinks.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-card-foreground">Connect</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {cardData.socialLinks.slice(0, 4).map((link, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="gap-2 text-xs justify-start"
                      >
                        <span>{link.icon}</span>
                        {link.platform}
                      </Button>
                    ))}
                  </div>
                  {cardData.socialLinks.length > 4 && (
                    <p className="text-xs text-foreground-muted">
                      +{cardData.socialLinks.length - 4} more
                    </p>
                  )}
                </div>
              )}

              {/* Payment links */}
              {cardData.paymentLinks.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-card-foreground">Send Money</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {cardData.paymentLinks.slice(0, 4).map((link, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="gap-2 text-xs justify-start"
                      >
                        <span>{link.icon}</span>
                        {link.platform}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom links */}
              {cardData.customLinks.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-card-foreground">Links</h4>
                  <div className="space-y-1">
                    {cardData.customLinks.slice(0, 3).map((link, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="gap-2 text-xs justify-start w-full"
                      >
                        <Globe className="w-3 h-3" />
                        {link.title}
                        <ExternalLink className="w-3 h-3 ml-auto" />
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Interests */}
              {cardData.interests.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-card-foreground flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Interests
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {cardData.interests.slice(0, 6).map((interest) => (
                      <Badge key={interest} variant="outline" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                    {cardData.interests.length > 6 && (
                      <Badge variant="outline" className="text-xs">
                        +{cardData.interests.length - 6} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
                <Button size="sm" className="gap-2 btn-gradient">
                  <Share className="w-3 h-3" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <ExternalLink className="w-3 h-3" />
                  Save Contact
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick tips */}
      <Card className="bg-background-subtle">
        <CardHeader className="pb-3">
          <h4 className="text-sm font-medium">Preview Tips</h4>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-foreground-muted space-y-1">
            <p>• Fill in your information to see the preview update</p>
            <p>• This is how your card will look on mobile devices</p>
            <p>• Colors and layout will adapt to your design choices</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};