"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      gcTime: 0,
      staleTime: 1000,
    },
    mutations: {
      onError(err: any) {
        console.error(err);
      },
    },
  },
});

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
