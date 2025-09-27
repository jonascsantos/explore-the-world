import { useMemo } from 'react';
import { useCountriesStore as useCountriesStoreBase } from '@/store/countries-store';

export const useCountriesStore = () => useCountriesStoreBase();

export const useCountries = () => useCountriesStoreBase(state => state.countries);
export const useFilteredCountries = () => useCountriesStoreBase(state => state.filteredCountries);
export const useCountriesLoading = () => useCountriesStoreBase(state => state.isLoading);
export const useCountriesError = () => useCountriesStoreBase(state => state.error);

export const useSearchQuery = () => useCountriesStoreBase(state => state.searchQuery);
export const useSelectedRegion = () => useCountriesStoreBase(state => state.selectedRegion);
export const useSortBy = () => useCountriesStoreBase(state => state.sortBy);
export const useSortOrder = () => useCountriesStoreBase(state => state.sortOrder);
export const useCountriesActions = () => {
  const setCountries = useCountriesStoreBase(state => state.setCountries);
  const setSearchQuery = useCountriesStoreBase(state => state.setSearchQuery);
  const setSelectedRegion = useCountriesStoreBase(state => state.setSelectedRegion);
  const setSortBy = useCountriesStoreBase(state => state.setSortBy);
  const setSortOrder = useCountriesStoreBase(state => state.setSortOrder);
  const setLoading = useCountriesStoreBase(state => state.setLoading);
  const setError = useCountriesStoreBase(state => state.setError);
  const applyFilters = useCountriesStoreBase(state => state.applyFilters);
  const clearFilters = useCountriesStoreBase(state => state.clearFilters);

  return useMemo(() => ({
    setCountries,
    setSearchQuery,
    setSelectedRegion,
    setSortBy,
    setSortOrder,
    setLoading,
    setError,
    applyFilters,
    clearFilters,
  }), [setCountries, setSearchQuery, setSelectedRegion, setSortBy, setSortOrder, setLoading, setError, applyFilters, clearFilters]);
};

export const useRegions = () => {
  const countries = useCountriesStoreBase(state => state.countries);
  return useMemo(() => {
    const regions = [...new Set(countries.map(country => country.region))];
    return regions.sort();
  }, [countries]);
};

export const useCountriesCount = () => useCountriesStoreBase(state => state.filteredCountries.length);
