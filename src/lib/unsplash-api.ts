interface UnsplashPhoto {
  id: string;
  slug: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
  description: string;
  user: {
    name: string;
    username: string;
  };
}

interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}

interface UnsplashCacheEntry {
  data: UnsplashPhoto[];
  timestamp: number;
  expiresAt: number;
}

const unsplashCache = new Map<string, UnsplashCacheEntry>();

const CACHE_DURATION = 2 * 60 * 60 * 1000;

export class UnsplashApiService {
  private apiKey: string;
  private baseUrl = 'https://api.unsplash.com';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private getCacheKey(query: string): string {
    return `unsplash_${query.toLowerCase().trim()}`;
  }

  private isCacheValid(entry: UnsplashCacheEntry): boolean {
    return Date.now() < entry.expiresAt;
  }

  private getCachedData(query: string): UnsplashPhoto[] | null {
    const cacheKey = this.getCacheKey(query);
    const cached = unsplashCache.get(cacheKey);
    
    if (cached && this.isCacheValid(cached)) {
      console.log(`[Unsplash API] Cache hit for query: ${query}`);
      return cached.data;
    }
    
    if (cached) {
      console.log(`[Unsplash API] Cache expired for query: ${query}`);
      unsplashCache.delete(cacheKey);
    }
    
    return null;
  }

  private setCachedData(query: string, data: UnsplashPhoto[]): void {
    const cacheKey = this.getCacheKey(query);
    const now = Date.now();
    
    unsplashCache.set(cacheKey, {
      data,
      timestamp: now,
      expiresAt: now + CACHE_DURATION
    });
    
    console.log(`[Unsplash API] Cached data for query: ${query}, expires in ${CACHE_DURATION / (60 * 60 * 1000)} hours`);
  }

  async searchPhotos(query: string, page: number = 1, perPage: number = 10): Promise<UnsplashPhoto[]> {
    const cachedData = this.getCachedData(query);
    if (cachedData) {
      return cachedData;
    }

    try {
      const url = `${this.baseUrl}/search/photos?page=${page}&query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`;
      
      console.log(`[Unsplash API] Fetching images for query: ${query}`);
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Client-ID ${this.apiKey}`,
          'Accept': 'application/json',
        },
        next: { revalidate: CACHE_DURATION / 1000 }
      });

      if (!response.ok) {
        throw new Error(`Unsplash API error: ${response.status} ${response.statusText}`);
      }

      const data: UnsplashSearchResponse = await response.json();
      
      if (!data.results || data.results.length === 0) {
        console.warn(`[Unsplash API] No results found for query: ${query}`);
        return [];
      }

      this.setCachedData(query, data.results);
      
      console.log(`[Unsplash API] Found ${data.results.length} images for query: ${query}`);
      return data.results;
      
    } catch (error) {
      console.error(`[Unsplash API] Error fetching images for query "${query}":`, error);
      
      return [];
    }
  }

  async getCountryImage(countryName: string): Promise<string | null> {
    try {
      const searchQueries = [
        countryName,
        `${countryName} landscape`,
        `${countryName} city`,
        `${countryName} nature`,
        `${countryName} travel`
      ];

      for (const query of searchQueries) {
        const photos = await this.searchPhotos(query, 1, 5);
        
        if (photos.length > 0) {
          const selectedPhoto = photos[0];
          const imageUrl = selectedPhoto.urls.regular || selectedPhoto.urls.full;
          
          console.log(`[Unsplash API] Selected image for ${countryName}: ${selectedPhoto.alt_description || selectedPhoto.description}`);
          return imageUrl;
        }
      }

      console.warn(`[Unsplash API] No images found for country: ${countryName}`);
      return null;
      
    } catch (error) {
      console.error(`[Unsplash API] Error getting image for country "${countryName}":`, error);
      return null;
    }
  }

  clearCache(): void {
    unsplashCache.clear();
    console.log('[Unsplash API] Cache cleared');
  }

  getCacheStats(): { size: number; entries: string[] } {
    return {
      size: unsplashCache.size,
      entries: Array.from(unsplashCache.keys())
    };
  }
}

let unsplashService: UnsplashApiService | null = null;

export function getUnsplashService(): UnsplashApiService {
  if (!unsplashService) {
    const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
    
    if (!apiKey) {
      throw new Error('NEXT_PUBLIC_UNSPLASH_ACCESS_KEY environment variable is required');
    }
    
    unsplashService = new UnsplashApiService(apiKey);
  }
  
  return unsplashService;
}

export type { UnsplashPhoto, UnsplashSearchResponse };
