const API_BASE_URL = 'https://restcountries.com/v3.1';

export interface Country {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  population: number;
  region: string;
  subregion: string;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  languages: Record<string, string>;
  currencies: Record<string, { name: string; symbol: string }>;
  area: number;
  borders: string[];
  cca2: string;
  cca3: string;
  latlng: [number, number];
}

export const countriesApi = {
  getAll: async (): Promise<Country[]> => {
    const response = await fetch(`${API_BASE_URL}/all?fields=name,region,flags,population,capital,area`, {
      next: { revalidate: 3600 }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    return response.json();
  },

  getByName: async (name: string): Promise<Country> => {
    const response = await fetch(`${API_BASE_URL}/name/${encodeURIComponent(name)}?fullText=true&fields=name,region,flags,population,capital,area,maps,languages,currencies,borders,cca2,cca3,latlng`, {
      next: { revalidate: 3600 }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch country');
    }
    const countries = await response.json();
    return countries[0];
  },

  getByRegion: async (region: string): Promise<Country[]> => {
    const response = await fetch(`${API_BASE_URL}/region/${encodeURIComponent(region)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch countries by region');
    }
    return response.json();
  },

  getByCode: async (code: string): Promise<Country> => {
    const response = await fetch(`${API_BASE_URL}/alpha/${encodeURIComponent(code)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch country by code');
    }
    const countries = await response.json();
    return countries[0];
  },
};
