import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Country } from '@/lib/api';

interface CountriesState {
  countries: Country[];
  filteredCountries: Country[];
  
  searchQuery: string;
  selectedRegion: string;
  sortBy: 'name' | 'region' | 'population';
  sortOrder: 'asc' | 'desc';
  
  isLoading: boolean;
  error: string | null;
  
  setCountries: (countries: Country[]) => void;
  setSearchQuery: (query: string) => void;
  setSelectedRegion: (region: string) => void;
  setSortBy: (sortBy: 'name' | 'region' | 'population') => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  applyFilters: () => void;
  clearFilters: () => void;
}

export const useCountriesStore = create<CountriesState>()(
  devtools(
    persist(
      (set, get) => ({
        countries: [],
        filteredCountries: [],
        searchQuery: '',
        selectedRegion: 'all',
        sortBy: 'name',
        sortOrder: 'asc',
        isLoading: false,
        error: null,
        setCountries: (countries) => {
          set({ countries, filteredCountries: countries }, false, 'setCountries');
          get().applyFilters();
        },

        setSearchQuery: (searchQuery) => {
          set({ searchQuery }, false, 'setSearchQuery');
          get().applyFilters();
        },

        setSelectedRegion: (selectedRegion) => {
          set({ selectedRegion }, false, 'setSelectedRegion');
          get().applyFilters();
        },

        setSortBy: (sortBy) => {
          set({ sortBy }, false, 'setSortBy');
          get().applyFilters();
        },

        setSortOrder: (sortOrder) => {
          set({ sortOrder }, false, 'setSortOrder');
          get().applyFilters();
        },

        setLoading: (isLoading) => {
          set({ isLoading }, false, 'setLoading');
        },

        setError: (error) => {
          set({ error }, false, 'setError');
        },

        applyFilters: () => {
          const { countries, searchQuery, selectedRegion, sortBy, sortOrder } = get();
          
          let filtered = [...countries];

          if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(country =>
              country.name.common.toLowerCase().includes(query) ||
              country.name.official.toLowerCase().includes(query)
            );
          }

          if (selectedRegion && selectedRegion !== 'all') {
            filtered = filtered.filter(country => country.region === selectedRegion);
          }
          filtered.sort((a, b) => {
            let aValue: string | number;
            let bValue: string | number;

            switch (sortBy) {
              case 'name':
                aValue = a.name.common.toLowerCase();
                bValue = b.name.common.toLowerCase();
                break;
              case 'region':
                aValue = a.region.toLowerCase();
                bValue = b.region.toLowerCase();
                break;
              case 'population':
                aValue = a.population || 0;
                bValue = b.population || 0;
                break;
              default:
                aValue = a.name.common.toLowerCase();
                bValue = b.name.common.toLowerCase();
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
          });

          set({ filteredCountries: filtered }, false, 'applyFilters');
        },

        clearFilters: () => {
          set({
            searchQuery: '',
            selectedRegion: 'all',
            sortBy: 'name',
            sortOrder: 'asc'
          }, false, 'clearFilters');
          get().applyFilters();
        },
      }),
      {
        name: 'countries-store-persist',
        partialize: (state) => ({
          searchQuery: state.searchQuery,
          selectedRegion: state.selectedRegion,
          sortBy: state.sortBy,
          sortOrder: state.sortOrder,
        }),
      }
    ),
    {
      name: 'countries-store',
    }
  )
);
