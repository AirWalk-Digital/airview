import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { history, AirviewRouter } from "../airview-router";
import { QueryMetaInvalidator } from "../query-meta-invalidator";
import { ConfigProvider } from "../airview-config";
import { AirviewStoreProvider } from "../airview-store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

export function Airview({ config, children }) {
  return (
    <AirviewRouter history={history}>
      <ConfigProvider {...{ config }}>
        <AirviewStoreProvider>
          <QueryClientProvider client={queryClient}>
            <QueryMetaInvalidator>{children}</QueryMetaInvalidator>
          </QueryClientProvider>
        </AirviewStoreProvider>
      </ConfigProvider>
    </AirviewRouter>
  );
}
