import { Building } from 'lucide-react';
import { Country } from '@/lib/api';

interface CountryLanguagesProps {
  country: Country;
}

export function CountryLanguages({ country }: CountryLanguagesProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mr-4">
          <Building className="w-6 h-6 text-emerald-400" />
        </div>
        <h3 className="text-2xl font-bold text-white">Languages</h3>
      </div>
      {country.languages ? (
        <div className="flex flex-wrap gap-3">
          {Object.values(country.languages).map((language, index) => (
            <span key={index} className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white border border-white/20 hover:bg-white/20 transition-colors">
              {language}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-white/60">No language information available</p>
      )}
    </div>
  );
}
