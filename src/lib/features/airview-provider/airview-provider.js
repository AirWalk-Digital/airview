import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "../../features";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

export function AirviewProvider({ config, children }) {
  return (
    <BrowserRouter>
      <ConfigProvider {...{ config }}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
}
