import { notFound } from 'next/navigation';
import { countriesApi } from '@/lib/api';
import { CountryDetails } from '@/components/country-details';
import { createQueryClient } from '@/lib/query-client-server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

interface CountryPageProps {
  params: {
    name: string;
  };
}

export async function generateStaticParams() {
  const countries = await countriesApi.getAll();
  
  return countries.map((country) => ({
    name: encodeURIComponent(country.name.common.toLowerCase().replace(/\s+/g, '-')),
  }));
}

export async function generateMetadata({ params }: CountryPageProps) {
  const { name } = await params;
  const countryName = decodeURIComponent(name).replace(/-/g, ' ');
  
  try {
    const countries = await countriesApi.getAll();
    const country = countries.find(
      (c) => c.name.common.toLowerCase() === countryName.toLowerCase()
    );
    
    if (!country) {
      return {
        title: 'Country Not Found',
        description: 'The requested country could not be found.',
      };
    }

    return {
      title: `${country.name.common} - Countries Explorer`,
      description: `Learn about ${country.name.common}, a country in ${country.region}. Population: ${country.population?.toLocaleString() || 'Unknown'}.`,
    };
  } catch {
    return {
      title: 'Country Not Found',
      description: 'The requested country could not be found.',
    };
  }
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { name } = await params;
  const countryName = decodeURIComponent(name).replace(/-/g, ' ');
  
  try {
    const queryClient = createQueryClient();
    
    await queryClient.prefetchQuery({
      queryKey: ['country', countryName.toLowerCase().trim()],
      queryFn: () => countriesApi.getByName(countryName),
    });

    return (
      <div className="min-h-screen bg-gray-50">
        <div>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <CountryDetails countryName={countryName} />
          </HydrationBoundary>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
