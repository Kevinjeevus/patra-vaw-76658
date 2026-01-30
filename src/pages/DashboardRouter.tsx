import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Dashboard } from './Dashboard';
import { CompanyDashboard } from './CompanyDashboard';
import { useQuery } from '@tanstack/react-query';

export const DashboardRouter: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: accountType, isLoading } = useQuery({
    queryKey: ['profile-account-type', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('account_type')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching account type:', error);
        return 'individual';
      }
      return data?.account_type || 'individual';
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  if (!user) {
    React.useEffect(() => {
      navigate('/auth');
    }, [navigate]);
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return accountType === 'company' ? <CompanyDashboard /> : <Dashboard />;
};
