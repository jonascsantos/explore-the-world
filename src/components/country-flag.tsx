import Image from 'next/image';
import { Country } from '@/lib/api';

interface CountryFlagProps {
  country: Country;
}

export function CountryFlag({ country }: CountryFlagProps) {
  return (
    <div className="lg:col-span-4">
      <div className="sticky top-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">National Flag</h3>
          <div className="aspect-[4/3] relative bg-white/5 rounded-xl shadow-lg overflow-hidden border border-white/10">
            <Image
              src={country.flags.svg}
              alt={country.flags.alt || country.name.common}
              fill
              className="object-contain p-6"
            />
          </div>
          <p className="text-sm text-white/70 mt-4 text-center">
            Official flag of {country.name.common}
          </p>
        </div>
      </div>
    </div>
  );
}
