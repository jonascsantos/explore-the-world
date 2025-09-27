'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';

interface QueryProviderProps {
  children: ReactNode;
}

let globalQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 30 * 60 * 1000,
          gcTime: 2 * 60 * 60 * 1000,
          retry: 1,
          refetchOnWindowFocus: false,
          refetchOnMount: false,
          refetchOnReconnect: false,
          refetchInterval: false,
          refetchIntervalInBackground: false,
        },
      },
    });
  }
  
  if (!globalQueryClient) {
    console.log('Creating new global QueryClient instance');
    globalQueryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 30 * 60 * 1000,
          gcTime: 2 * 60 * 60 * 1000,
          retry: 1,
          refetchOnWindowFocus: false,
          refetchOnMount: false,
          refetchOnReconnect: false,
          refetchInterval: false,
          refetchIntervalInBackground: false,
        },
      },
    });
  }
  
  return globalQueryClient;
}

export function QueryProvider({ children }: QueryProviderProps) {
  const queryClient = getQueryClient();
  console.log('QueryProvider render - QueryClient instance:', queryClient === globalQueryClient ? 'SAME' : 'DIFFERENT');

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
