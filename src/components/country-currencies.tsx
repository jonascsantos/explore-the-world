import { Globe } from 'lucide-react';
import { Country } from '@/lib/api';

interface CountryCurrenciesProps {
  country: Country;
}

export function CountryCurrencies({ country }: CountryCurrenciesProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mr-4">
          <Globe className="w-6 h-6 text-teal-400" />
        </div>
        <h3 className="text-2xl font-bold text-white">Currencies</h3>
      </div>
      {country.currencies ? (
        <div className="space-y-4">
          {Object.entries(country.currencies).map(([code, currency]) => (
            <div key={code} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-white/20">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-white">{currency.name}</h4>
                  <p className="text-sm text-white/70">{code}</p>
                </div>
                <span className="text-2xl font-bold text-teal-400">{currency.symbol}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white/60">No currency information available</p>
      )}
    </div>
  );
}
