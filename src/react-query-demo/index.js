import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AllEntriesMeta } from "./all-entries-meta";
import { EntriesByCollection } from "./entries-by-collection";
import { EntryBody } from "./entry-body";
import { ChildEntriesMeta } from "./child-entries-meta";
import { SiblingEntriesMeta } from "./sibling-entries-meta";

export function ReactQueryDemo() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AllEntriesMeta />
      <EntriesByCollection />
      <EntryBody />
      <ChildEntriesMeta />
      <SiblingEntriesMeta />
    </QueryClientProvider>
  );
}
