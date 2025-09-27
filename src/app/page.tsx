import { CountriesByRegion } from '@/components/countries-by-region';
import { createQueryClient } from '@/lib/query-client-server';
import { countriesApi } from '@/lib/api';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { HeroSearchClient } from '@/components/hero-search-client';

export default async function Home() {
  const queryClient = createQueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: ['countries'],
    queryFn: countriesApi.getAll,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div 
        className="relative overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1541343672885-9be56236302a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4MDk0ODR8MHwxfHNlYXJjaHwxfHxIdW5nYXJ5fGVufDB8fHx8MTc1ODk3NTMxOHww&ixlib=rb-4.1.0&q=80&w=1080')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/40"/>
        
        <div className="relative z-20 container mx-auto px-6 sm:py-24 md:py-32">
          <div className="text-center text-white max-w-6xl mx-auto">
            <div className="relative">
              
              <div className="relative">
                <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight leading-none drop-shadow-2xl">
                  Explore the World
                </h1>
                <p className="text-2xl md:text-3xl text-white/90 font-light mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
                  Discover the world through detailed information about countries, their cultures, and unique characteristics.
                </p>

                <HeroSearchClient />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CountriesByRegion />
        </HydrationBoundary>
      </div>
    </div>
  );
}