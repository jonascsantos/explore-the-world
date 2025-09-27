import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Country } from '@/lib/api';

interface CountryHeroProps {
  country: Country;
  backgroundImageUrl?: string | null;
  isImageLoading: boolean;
}

export function CountryHero({ country, backgroundImageUrl, isImageLoading }: CountryHeroProps) {
  return (
    <div className="min-h-[95vh] relative">

      <div className="relative min-h-[95vh] flex items-center overflow-hidden w-full">
        {backgroundImageUrl ? (
          <Image
            src={backgroundImageUrl}
            alt={`${country.name.common} landscape`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900"></div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/40"></div>
        
        {isImageLoading && (
          <div className="absolute top-4 right-4 z-30">
            <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Loading image...
            </div>
          </div>
        )}
        
        <div className="absolute top-10 left-0 right-0 z-20 p-6 container mx-auto">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="inline-flex items-center text-white/90 hover:text-white transition-colors duration-200 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Countries
            </Link>
          </div>
        </div>

        <div className="container mx-auto">
          <div className="relative z-20 px-6">
            <div className="flex">
              <div className="text-white flex-col flex gap-6">
                <div className="relative w-min pl-8 pr-12 pt-6">
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl p-8"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-3xl p-8"></div>
                  
                  <div className="relative flex items-start mb-8">
                    <div className="w-1 h-36 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full mr-6 mt-2 shadow-lg"></div>
                    <div>
                      <p className="text-lg text-white/90 mb-2 ml-1.5 tracking-wide drop-shadow-lg">Discover</p>
                      <h1 className="text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-none drop-shadow-2xl">
                        {country.name.common}
                      </h1>
                      {country.name.common !== country.name.official && (
                        <p className="text-2xl text-white/80 font-light mb-8 drop-shadow-lg xs:text-clip sm:truncate">
                          {country.name.official}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-6 xs:grid-cols-1 text-start">
                  <div className="w-min md:w-auto text-center bg-white/10 backdrop-blur-xs rounded-2xl p-6 border border-white/20 shadow-xl">
                    <p className="text-3xl font-bold text-white mb-1 drop-shadow-lg text-start">{country.population?.toLocaleString() || 'N/A'}</p>
                    <p className="text-sm text-white/80 text-start">Population</p>
                  </div>
                  <div className="w-min md:w-auto text-center bg-white/10 backdrop-blur-xs rounded-2xl p-6 border border-white/20 shadow-xl">
                    <p className="text-3xl font-bold text-white mb-1 drop-shadow-lg text-start">{country.capital?.join(', ') || 'N/A'}</p>
                    <p className="text-sm text-white/80 text-start">Capital</p>
                  </div>
                  <div className="w-min md:w-auto text-center bg-white/10 backdrop-blur-xs rounded-2xl p-6 border border-white/20 shadow-xl">
                    <p className="text-3xl font-bold text-white mb-1 drop-shadow-lg text-start">{country.region}</p>
                    <p className="text-sm text-white/80 text-start">Region</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
