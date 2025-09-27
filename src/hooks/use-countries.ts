import { useQuery } from '@tanstack/react-query';
import { countriesApi } from '@/lib/api';

export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: countriesApi.getAll,
  });
};

export const useCountriesByName = (name: string) => {
  return useQuery({
    queryKey: ['countries', 'search', name],
    queryFn: () => countriesApi.getByName(name),
    enabled: name.length > 0,
  });
};

export const useCountriesByRegion = (region: string) => {
  return useQuery({
    queryKey: ['countries', 'region', region],
    queryFn: () => countriesApi.getByRegion(region),
    enabled: region.length > 0,
  });
};

export const useCountryByCode = (code: string) => {
  return useQuery({
    queryKey: ['country', code],
    queryFn: () => countriesApi.getByCode(code),
    enabled: code.length > 0,
  });
};
