import { MapPin, ExternalLink } from 'lucide-react';
import { Country } from '@/lib/api';

interface CountryMapsProps {
  country: Country;
}

export function CountryMaps({ country }: CountryMapsProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mr-4">
          <MapPin className="w-6 h-6 text-emerald-400" />
        </div>
        <h3 className="text-2xl font-bold text-white">Where is {country.name.common}?</h3>
      </div>
      {country.maps ? (
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="relative w-full h-80 rounded-xl overflow-hidden border border-white/20 shadow-lg">
              <iframe
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${country.latlng[1] - 5},${country.latlng[0] - 5},${country.latlng[1] + 5},${country.latlng[0] + 5}&layer=mapnik&marker=${country.latlng[0]},${country.latlng[1]}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                className="rounded-xl"
                title={`Map of ${country.name.common}`}
              />
            </div>
            
            <div className="flex gap-4">
              <a 
                href={country.maps.openStreetMaps} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in OpenStreetMap
              </a>
              <a 
                href={`https://www.google.com/maps/search/${encodeURIComponent(country.name.common)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-white/60">No map information available</p>
      )}
    </div>
  );
}
