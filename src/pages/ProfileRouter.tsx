import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { PublicProfile } from './PublicProfile';
import { CompanyProfile } from './CompanyProfile';
import { Loader2 } from 'lucide-react';

export const ProfileRouter: React.FC = () => {
    const { vanity } = useParams<{ vanity: string }>();
    const [type, setType] = useState<'individual' | 'company' | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const defineProfileType = async () => {
            if (!vanity) {
                setLoading(false);
                return;
            }

            try {
                // Check if it's a company vanity (case-insensitive)
                const { data: companyProfile } = await supabase
                    .from('profiles')
                    .select('id, account_type')
                    .ilike('vanity_url', vanity)
                    .ilike('account_type', 'company')
                    .maybeSingle();

                if (companyProfile) {
                    setType('company');
                } else {
                    // If not a company profile, assume it's a personal/individual profile for PublicProfile to handle
                    // PublicProfile handles its own internal check against digital_cards table
                    setType('individual');
                }
            } catch (err) {
                console.error('Error determining profile type:', err);
                setType('individual'); // Fallback
            } finally {
                setLoading(false);
            }
        };

        defineProfileType();
    }, [vanity]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (type === 'company') {
        return <CompanyProfile />;
    }

    return <PublicProfile />;
};
