import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { history, AirviewRouter } from "../airview-router";
import { QueryMetaInvalidator } from "../query-meta-invalidator";
import { ConfigProvider } from "../config-provider";

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
    <AirviewRouter history={history}>
      <ConfigProvider {...{ config }}>
        <QueryClientProvider client={queryClient}>
          <QueryMetaInvalidator>{children}</QueryMetaInvalidator>
        </QueryClientProvider>
      </ConfigProvider>
    </AirviewRouter>
  );
}
