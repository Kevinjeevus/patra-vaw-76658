import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { MapPin, Save, Navigation } from 'lucide-react';

interface AddressEditorProps {
  userId: string;
}

export const AddressEditor: React.FC<AddressEditorProps> = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [fetchingLocation, setFetchingLocation] = useState(false);

  useEffect(() => {
    fetchAddress();
  }, [userId]);

  const fetchAddress = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('address, show_address_map, location_coordinates')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      if (data) {
        setAddress(data.address || '');
        setShowMap(data.show_address_map || false);
        
        // Parse location_coordinates if available (format: "(lat,lng)")
        if (data.location_coordinates) {
          const coords = String(data.location_coordinates).replace(/[()]/g, '').split(',');
          if (coords.length === 2) {
            setLatitude(coords[0].trim());
            setLongitude(coords[1].trim());
          }
        }
      }
    } catch (error: any) {
      console.error('Error fetching address:', error);
    }
  };

  const handleGetLocation = async () => {
    if (!navigator.geolocation) {
      toast({
        title: "Not Supported",
        description: "Geolocation is not supported by your browser",
        variant: "destructive"
      });
      return;
    }

    setFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toFixed(6));
        setLongitude(position.coords.longitude.toFixed(6));
        setFetchingLocation(false);
        toast({
          title: "Location Fetched",
          description: "Your device location has been retrieved"
        });
      },
      (error) => {
        setFetchingLocation(false);
        toast({
          title: "Error",
          description: error.message || "Failed to get your location",
          variant: "destructive"
        });
      },
      { enableHighAccuracy: true }
    );
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Build location_coordinates point if both lat/lng are provided
      let locationPoint = null;
      if (latitude && longitude) {
        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);
        if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
          locationPoint = `(${lat},${lng})`;
        } else {
          toast({
            title: "Invalid Coordinates",
            description: "Please enter valid latitude (-90 to 90) and longitude (-180 to 180)",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          address: address || null,
          show_address_map: showMap,
          location_coordinates: locationPoint
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

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Location Coordinates (Optional)</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleGetLocation}
              disabled={fetchingLocation}
            >
              <Navigation className="w-4 h-4 mr-2" />
              {fetchingLocation ? 'Fetching...' : 'Use My Location'}
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude" className="text-xs text-muted-foreground">
                Latitude
              </Label>
              <Input
                id="latitude"
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="e.g., 20.296059"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude" className="text-xs text-muted-foreground">
                Longitude
              </Label>
              <Input
                id="longitude"
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="e.g., 85.824539"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Add precise coordinates if the map shows incorrect location. Leave empty to use address only.
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
            disabled={!address && !latitude && !longitude}
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
