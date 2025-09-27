'use client';

import { useEffect } from 'react';
import { useCountries } from '@/hooks/use-countries';
import { useFilteredCountries, useCountriesLoading, useCountriesError, useCountriesCount, useCountriesActions, useSearchQuery, useSelectedRegion } from '@/hooks/use-countries-store';
import Image from 'next/image';

export function CountriesList() {
  const { data: queryCountries, isLoading: queryLoading, error: queryError } = useCountries();
  const { setCountries, setLoading, setError } = useCountriesActions();
  
  const countries = useFilteredCountries();
  const isLoading = useCountriesLoading();
  const error = useCountriesError();
  const count = useCountriesCount();
  const searchQuery = useSearchQuery();
  const selectedRegion = useSelectedRegion();

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-600">Loading countries...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-red-600">Error loading countries: {error}</div>
      </div>
    );
  }

  if (countries.length === 0 && (searchQuery.trim() || selectedRegion !== 'all')) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No countries found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery.trim() && selectedRegion !== 'all' 
              ? `No countries found matching "${searchQuery}" in ${selectedRegion}`
              : searchQuery.trim() 
              ? `No countries found matching "${searchQuery}"`
              : `No countries found in ${selectedRegion}`
            }
          </p>
          <div className="text-sm text-gray-500">
            Try adjusting your search terms or region filter
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600">
        Showing {count} countries
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {countries?.map((country) => (
        <div
          key={country.name.common}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center space-x-3">
            <Image
              src={country.flags.png}
              alt={country.flags.alt || country.name.common}
              width={32}
              height={24}
              className="object-cover rounded"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{country.name.common}</h3>
              <p className="text-sm text-gray-600">{country.region}</p>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
