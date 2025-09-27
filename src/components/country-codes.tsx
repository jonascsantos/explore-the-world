import { Users } from 'lucide-react';
import { Country } from '@/lib/api';

interface CountryWithCioc extends Country {
  cioc?: string;
}

interface CountryCodesProps {
  country: CountryWithCioc;
}

export function CountryCodes({ country }: CountryCodesProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mr-4">
          <Users className="w-6 h-6 text-teal-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Country Codes</h3>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-white/20">
          <span className="text-white/70">ISO 3166-1 alpha-2</span>
          <span className="font-mono font-semibold bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg text-teal-400 border border-white/20">{country.cca2}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-white/20">
          <span className="text-white/70">ISO 3166-1 alpha-3</span>
          <span className="font-mono font-semibold bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg text-teal-400 border border-white/20">{country.cca3}</span>
        </div>
                    {country.cioc && (
                      <div className="flex justify-between items-center py-2">
                        <span className="text-white/70">IOC Code</span>
                        <span className="font-mono font-semibold bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg text-teal-400 border border-white/20">{country.cioc}</span>
                      </div>
                    )}
      </div>
    </div>
  );
}
