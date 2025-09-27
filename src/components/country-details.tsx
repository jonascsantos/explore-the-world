'use client';

import { useQuery } from '@tanstack/react-query';
import { countriesApi } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useUnsplashImage } from '@/hooks/use-unsplash-image';
import { CountryHero } from './country-hero';
import { CountryFlag } from './country-flag';
import { CountryMaps } from './country-maps';
import { CountryLanguages } from './country-languages';
import { CountryCurrencies } from './country-currencies';
import { CountryGeography } from './country-geography';
import { CountryCodes } from './country-codes';

interface CountryDetailsProps {
  countryName: string;
}

export function CountryDetails({ countryName }: CountryDetailsProps) {
  const normalizedCountryName = countryName.toLowerCase().trim();
  
  const { data: country, isLoading, error, dataUpdatedAt, isStale, isFetching } = useQuery({
    queryKey: ['country', normalizedCountryName],
    queryFn: () => countriesApi.getByName(countryName),
    staleTime: 30 * 60 * 1000, 
    gcTime: 2 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });

  const { data: backgroundImageUrl, isLoading: isImageLoading, error: imageError } = useUnsplashImage({
    countryName: country?.name.common || countryName,
    enabled: !!country?.name.common
  });

  console.log('CountryDetails Query State:', {
    countryName,
    normalizedCountryName,
    isLoading,
    isFetching,
    isStale,
    hasData: !!country,
    dataUpdatedAt: dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : 'N/A',
    queryKey: ['country', normalizedCountryName],
    timestamp: new Date().toLocaleTimeString()
  });

  console.log('Background Image State:', {
    backgroundImageUrl,
    isImageLoading,
    imageError,
    countryName: country?.name.common
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="space-y-4">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <Card>
          <CardContent className="py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Country Not Found</h1>
            <p className="text-gray-600 mb-6">
              The country &ldquo;{countryName}&rdquo; could not be found.
            </p>
            <Link href="/">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Countries
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <CountryHero 
        country={country} 
        backgroundImageUrl={backgroundImageUrl} 
        isImageLoading={isImageLoading} 
      />

      <div className="bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Welcome to {country.name.common}</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Discover the rich culture, geography, and unique characteristics of {country.name.common}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <CountryFlag country={country} />

            <div className="lg:col-span-8 space-y-8">
              <CountryMaps country={country} />
              
              <CountryLanguages country={country} />

              <CountryCurrencies country={country} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <CountryGeography country={country} />

                <CountryCodes country={country} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
