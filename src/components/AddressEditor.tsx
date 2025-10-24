import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { MapPin, Save } from 'lucide-react';

interface AddressEditorProps {
  userId: string;
}

export const AddressEditor: React.FC<AddressEditorProps> = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    fetchAddress();
  }, [userId]);

  const fetchAddress = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('address, show_address_map')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      if (data) {
        setAddress(data.address || '');
        setShowMap(data.show_address_map || false);
      }
    } catch (error: any) {
      console.error('Error fetching address:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          address: address || null,
          show_address_map: showMap
        })
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: "Saved",
        description: "Address updated successfully"
      });
    } catch (error: any) {
      console.error('Error saving address:', error);
      toast({
        title: "Error",
        description: "Failed to save address",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-border/50 shadow-lg shadow-black/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Business Address
        </CardTitle>
        <CardDescription>
          Add your business location to help customers find you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="address" className="text-sm font-medium">
            Full Address
          </Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Building Number 21, Infocity, Chandaka Industrial Estate, Patia, Odisha, Bhubaneswar, 751024"
            className="min-h-[60px]"
          />
          <p className="text-xs text-muted-foreground">
            Enter your complete business address
          </p>
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div className="space-y-1">
            <Label className="text-sm font-medium">Show map on profile</Label>
            <p className="text-xs text-muted-foreground">
              Display an interactive map with your location
            </p>
          </div>
          <Switch
            checked={showMap}
            onCheckedChange={setShowMap}
            disabled={!address}
          />
        </div>

        <Button
          onClick={handleSave}
          disabled={loading}
          className="w-full"
        >
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Saving...' : 'Save Address'}
        </Button>
      </CardContent>
    </Card>
  );
};
