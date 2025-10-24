import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Globe, 
  Smartphone, 
  Monitor,
  MapPin,
  Calendar,
  ArrowLeft
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AnalyticsData {
  id: string;
  event_type: string;
  device_type: string;
  country: string;
  city: string;
  created_at: string;
  card_id: string;
}

interface DigitalCard {
  id: string;
  title: string;
  vanity_url: string;
}

export const Analytics: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [cards, setCards] = useState<DigitalCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<string>('all');

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    if (!user) return;

    try {
      // Fetch user's cards
      const { data: cardsData, error: cardsError } = await supabase
        .from('digital_cards')
        .select('id, title, vanity_url')
        .eq('owner_user_id', user.id);

      if (cardsError) throw cardsError;
      setCards(cardsData || []);

      // Fetch analytics data
      const { data: analyticsData, error: analyticsError } = await supabase
        .from('card_analytics')
        .select('*')
        .in('card_id', cardsData?.map(card => card.id) || [])
        .order('created_at', { ascending: false });

      if (analyticsError) throw analyticsError;
      setAnalytics(analyticsData || []);
    } catch (error: any) {
      console.error('Error fetching analytics:', error);
      toast({
        title: "Error",
        description: "Failed to load analytics data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredAnalytics = selectedCard === 'all' 
    ? analytics 
    : analytics.filter(item => item.card_id === selectedCard);

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType?.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'desktop':
        return <Monitor className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case 'view':
        return 'bg-primary';
      case 'tap':
        return 'bg-accent';
      case 'share':
        return 'bg-success';
      default:
        return 'bg-muted';
    }
  };

  const getTotalViews = () => filteredAnalytics.filter(item => item.event_type === 'view').length;
  const getTotalTaps = () => filteredAnalytics.filter(item => item.event_type === 'tap').length;
  const getTotalShares = () => filteredAnalytics.filter(item => item.event_type === 'share').length;

  const getTopCountries = () => {
    const countryCount = filteredAnalytics.reduce((acc, item) => {
      if (item.country) {
        acc[item.country] = (acc[item.country] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(countryCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  };

  const getDeviceBreakdown = () => {
    const deviceCount = filteredAnalytics.reduce((acc, item) => {
      const device = item.device_type || 'Unknown';
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(deviceCount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/editor')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gradient">Analytics Dashboard</h1>
                <p className="text-sm text-foreground-muted">Track your card performance</p>
              </div>
            </div>
            <BarChart3 className="w-8 h-8 text-primary" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Card Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCard === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCard('all')}
              size="sm"
            >
              All Cards
            </Button>
            {cards.map((card) => (
              <Button
                key={card.id}
                variant={selectedCard === card.id ? 'default' : 'outline'}
                onClick={() => setSelectedCard(card.id)}
                size="sm"
              >
                {card.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-premium">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground-muted flex items-center gap-2">
                <Users className="w-4 h-4" />
                Total Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gradient">{getTotalViews()}</div>
              <p className="text-xs text-foreground-muted mt-1">Profile page visits</p>
            </CardContent>
          </Card>

          <Card className="card-premium">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground-muted flex items-center gap-2">
                <Globe className="w-4 h-4" />
                NFC Taps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gradient">{getTotalTaps()}</div>
              <p className="text-xs text-foreground-muted mt-1">Physical card taps</p>
            </CardContent>
          </Card>

          <Card className="card-premium">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground-muted flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Shares
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gradient">{getTotalShares()}</div>
              <p className="text-xs text-foreground-muted mt-1">Card shares</p>
            </CardContent>
          </Card>

          <Card className="card-premium">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground-muted flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Total Interactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gradient">{filteredAnalytics.length}</div>
              <p className="text-xs text-foreground-muted mt-1">All activities</p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Countries */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Top Countries
              </CardTitle>
              <CardDescription>Where your visitors are from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getTopCountries().map(([country, count]) => (
                  <div key={country} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm font-medium">{country || 'Unknown'}</span>
                    </div>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                ))}
                {getTopCountries().length === 0 && (
                  <p className="text-foreground-muted text-sm">No location data available</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Device Breakdown */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                Device Types
              </CardTitle>
              <CardDescription>How people access your card</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getDeviceBreakdown().map(([device, count]) => (
                  <div key={device} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getDeviceIcon(device)}
                      <span className="text-sm font-medium capitalize">{device}</span>
                    </div>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                ))}
                {getDeviceBreakdown().length === 0 && (
                  <p className="text-foreground-muted text-sm">No device data available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest interactions with your cards</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredAnalytics.length > 0 ? (
              <div className="space-y-4">
                {filteredAnalytics.slice(0, 10).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-background-subtle rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${getEventTypeColor(item.event_type)}`}></div>
                      <div>
                        <p className="text-sm font-medium capitalize">{item.event_type}</p>
                        <div className="flex items-center gap-2 text-xs text-foreground-muted">
                          {getDeviceIcon(item.device_type)}
                          <span>{item.device_type || 'Unknown device'}</span>
                          {item.city && item.country && (
                            <>
                              <span>•</span>
                              <span>{item.city}, {item.country}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-foreground-muted">
                      {new Date(item.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BarChart3 className="w-12 h-12 text-foreground-muted mx-auto mb-4" />
                <p className="text-foreground-muted">No analytics data available yet</p>
                <p className="text-sm text-foreground-muted mt-1">
                  Share your cards to start collecting analytics
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};