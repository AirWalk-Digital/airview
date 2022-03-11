import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Container } from "./components";
import { AllEntriesMeta } from "./all-entries-meta";
import { EntriesByCollection } from "./entries-by-collection";
import { EntryBody } from "./entry-body";
import { ChildEntriesMeta } from "./child-entries-meta";
import { SiblingEntriesMeta } from "./sibling-entries-meta";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function ReactQueryDemo() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container
        leftSlot={
          <React.Fragment>
            <AllEntriesMeta />
            <EntriesByCollection />
            <EntryBody />
            <ChildEntriesMeta />
            <SiblingEntriesMeta />
          </React.Fragment>
        }
        rightSlot={<span>Creator form here...</span>}
      />
    </QueryClientProvider>
  );
}
