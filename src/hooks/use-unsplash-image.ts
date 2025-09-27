import { useQuery } from '@tanstack/react-query';
import { getUnsplashService } from '@/lib/unsplash-api';

interface UseUnsplashImageOptions {
  countryName: string;
  enabled?: boolean;
}

export function useUnsplashImage({ countryName, enabled = true }: UseUnsplashImageOptions) {
  return useQuery({
    queryKey: ['unsplash-image', countryName],
    queryFn: async () => {
      const unsplashService = getUnsplashService();
      return await unsplashService.getCountryImage(countryName);
    },
    enabled: enabled && !!countryName,
    staleTime: 2 * 60 * 60 * 1000,
    gcTime: 4 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
