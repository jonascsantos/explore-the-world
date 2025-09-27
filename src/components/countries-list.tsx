'use client';

import { useEffect } from 'react';
import { useCountries } from '@/hooks/use-countries';
import { useFilteredCountries, useCountriesLoading, useCountriesError, useCountriesCount, useCountriesActions } from '@/hooks/use-countries-store';
import Image from 'next/image';

export function CountriesList() {
  const { data: queryCountries, isLoading: queryLoading, error: queryError } = useCountries();
  const { setCountries, setLoading, setError } = useCountriesActions();
  
  const countries = useFilteredCountries();
  const isLoading = useCountriesLoading();
  const error = useCountriesError();
  const count = useCountriesCount();

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
