import React from 'react';
import { MapPin } from 'lucide-react';

interface AddressMapDisplayProps {
  address: string;
  showMap?: boolean;
  className?: string;
}

export const AddressMapDisplay: React.FC<AddressMapDisplayProps> = ({ 
  address, 
  showMap = false,
  className = ''
}) => {
  if (!address) return null;

  // Encode address for Google Maps embed
  const encodedAddress = encodeURIComponent(address);
  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}`;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border/50">
        <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm mb-1">Location</h4>
          <p className="text-sm text-muted-foreground break-words">{address}</p>
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline mt-2 inline-block"
          >
            Open in Google Maps →
          </a>
        </div>
      </div>

      {showMap && (
        <div className="relative w-full h-64 rounded-lg overflow-hidden border border-border/50">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          />
        </div>
      )}
    </div>
  );
};
