import { MapPin } from 'lucide-react';
import { Country } from '@/lib/api';

interface CountryGeographyProps {
  country: Country;
}

export function CountryGeography({ country }: CountryGeographyProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mr-4">
          <MapPin className="w-6 h-6 text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Geography</h3>
      </div>
      <div className="space-y-4">
        {country.area && (
          <div className="flex justify-between items-center py-2 border-b border-white/20">
            <span className="text-white/70">Area</span>
            <span className="font-semibold text-white">{country.area.toLocaleString()} km²</span>
          </div>
        )}
        <div className="flex justify-between items-center py-2 border-b border-white/20">
          <span className="text-white/70">Region</span>
          <span className="font-semibold text-white">{country.region}</span>
        </div>
        {country.subregion && (
          <div className="flex justify-between items-center py-2">
            <span className="text-white/70">Subregion</span>
            <span className="font-semibold text-white">{country.subregion}</span>
          </div>
        )}
      </div>
    </div>
  );
}
