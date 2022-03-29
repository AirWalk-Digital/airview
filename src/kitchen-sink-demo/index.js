import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MainView } from "./views/main-view";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

export function ReactQueryDemo() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainView />
    </QueryClientProvider>
  );
}
