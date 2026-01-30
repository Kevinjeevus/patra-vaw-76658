import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2, MapPin, Building2, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const CompanyProfileEditor = ({ user }: { user: any }) => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState<any>({
        company_name: '',
        bio: '',
        address: '',
        location_coordinates: '',
        vanity_url: '',
        company_logo_url: ''
    });

    useEffect(() => {
        fetchProfile();
    }, [user]);

    const fetchProfile = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('company_name, bio, address, location_coordinates, vanity_url, company_logo_url')
                .eq('user_id', user.id)
                .single();

            if (error) throw error;
            if (data) {
                setProfile({
                    ...data,
                    // Convert point to string if needed or handle parsing
                    location_coordinates: data.location_coordinates ? `${(data.location_coordinates as any).x},${(data.location_coordinates as any).y}` : ''
                });
            }
        } catch (error) {
            console.error('Error fetching company profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (key: string, value: string) => {
        setProfile((prev: any) => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // Parse coordinates
            let coords = null;
            if (profile.location_coordinates) {
                const parts = profile.location_coordinates.split(',').map((p: string) => parseFloat(p.trim()));
                if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                    coords = `(${parts[0]},${parts[1]})`;
                }
            }

            const { error } = await supabase
                .from('profiles')
                .update({
                    company_name: profile.company_name,
                    bio: profile.bio,
                    address: profile.address,
                    vanity_url: profile.vanity_url,
                    location_coordinates: coords
                    // Logo upload logic is handled separately usually, but we can add URL field
                })
                .eq('user_id', user.id);

            if (error) throw error;
            toast({ title: 'Company Profile Updated', description: 'Your company details have been saved.' });
        } catch (error) {
            console.error('Error saving profile:', error);
            toast({ title: 'Error', description: 'Failed to save company profile.', variant: 'destructive' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <Loader2 className="animate-spin" />;

    return (
        <div className="space-y-6">
            <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Company Details</h3>
                <p className="text-sm text-muted-foreground mb-6">These details will be displayed on your invites and main company profile.</p>

                <div className="grid gap-6">
                    <div className="space-y-2">
                        <Label>Company Name</Label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input
                                value={profile.company_name || ''}
                                onChange={(e) => handleChange('company_name', e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Company Handle (Vanity URL)</Label>
                        <div className="relative">
                            <Globe className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input
                                value={profile.vanity_url || ''}
                                onChange={(e) => handleChange('vanity_url', e.target.value)}
                                className="pl-10"
                                placeholder="my-company"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">https://patra.app/{profile.vanity_url}</p>
                    </div>

                    <div className="space-y-2">
                        <Label>About (Bio)</Label>
                        <Textarea
                            value={profile.bio || ''}
                            onChange={(e) => handleChange('bio', e.target.value)}
                            placeholder="Tell us about your company..."
                            rows={4}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Address</Label>
                        <Input
                            value={profile.address || ''}
                            onChange={(e) => handleChange('address', e.target.value)}
                            placeholder="123 Corporate Blvd"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Coordinates (Lat, Lng)</Label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input
                                value={profile.location_coordinates || ''}
                                onChange={(e) => handleChange('location_coordinates', e.target.value)}
                                className="pl-10"
                                placeholder="34.0522, -118.2437"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">Used for maps if address is not sufficient.</p>
                    </div>

                    <Button onClick={handleSave} disabled={saving}>
                        {saving ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
                        Save Company Profile
                    </Button>
                </div>
            </Card>
        </div>
    );
};
