'use client';

import { useEffect, useMemo } from 'react';
import { useCountries } from '@/hooks/use-countries';
import { useFilteredCountries, useCountriesActions } from '@/hooks/use-countries-store';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { Country } from '@/lib/api';

export function CountriesByRegion() {
  const { data: queryCountries, isLoading: queryLoading, error: queryError } = useCountries();
  const { setCountries, setLoading, setError } = useCountriesActions();
  
  const countries = useFilteredCountries();

  useEffect(() => {
    if (queryCountries) {
      setCountries(queryCountries);
      setLoading(false);
      setError(null);
    }
  }, [queryCountries, setCountries, setLoading, setError]);

  useEffect(() => {
    setLoading(queryLoading);
  }, [queryLoading, setLoading]);

  useEffect(() => {
    if (queryError) {
      setError(queryError.message);
    }
  }, [queryError, setError]);

  const regionGroups = useMemo(() => {
    const groups: Record<string, Country[]> = {};
    
    countries.forEach(country => {
      if (!groups[country.region]) {
        groups[country.region] = [];
      }
      groups[country.region].push(country);
    });

    return Object.entries(groups)
      .map(([region, countries]) => ({
        region,
        countries,
        total: countries.length
      }))
      .sort((a, b) => a.region.localeCompare(b.region));
  }, [countries]);

  if (queryLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-600">Loading countries...</div>
      </div>
    );
  }

  if (queryError) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-red-600">Error loading countries: {queryError.message}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {regionGroups.map((group) => (
        <div key={group.region} className="space-y-6 mb-12">
          <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900">{group.region}</h2>
            </div>
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
              {group.total} {group.total === 1 ? 'country' : 'countries'}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {group.countries.map((country) => (
              <Link
                key={country.name.common}
                href={`/country/${encodeURIComponent(country.name.common.toLowerCase().replace(/\s+/g, '-'))}`}
                className="group"
              >
                <Card className="hover:shadow-xl py-2transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm group-hover:scale-105 group-hover:-translate-y-1">
                  <CardContent className="px-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Image
                          width={48}
                          height={36}
                          src={country.flags.svg}
                          alt={country.flags.alt || country.name.common}
                          className="rounded-lg object-cover h-9 w-12 border border-gray-200 shadow-sm"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                          {country.name.common}
                        </h3>
                        <p className="text-xs text-gray-500 truncate">
                          {country.capital?.join(', ') || 'N/A'}
                        </p>
                        {country.population && (
                          <p className="text-xs text-gray-400 mt-1">
                            {country.population.toLocaleString()} people
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
