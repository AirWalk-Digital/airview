import React, { useLayoutEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useQueryClient } from "react-query";
import {
  history,
  AirviewRouter,
  ConfigProvider,
  useHistory,
} from "../../features";

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

function QueryMetaInvalidator({ children }) {
  const queryClient = useQueryClient();
  const otherHistory = useHistory();

  useLayoutEffect(() => {
    const unlisten = otherHistory.listen(() => {
      queryClient.invalidateQueries("entries_meta");
    });

    return () => unlisten();
  }, [queryClient, otherHistory]);

  return children;
}
