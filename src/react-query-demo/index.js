import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Container } from "./components";
import { AllEntriesMeta } from "./all-entries-meta";
import { EntriesByCollection } from "./entries-by-collection";
import { EntryMeta } from "./entry-meta";
import { EntryBody } from "./entry-body";
import { ChildEntriesMeta } from "./child-entries-meta";
import { SiblingEntriesMeta } from "./sibling-entries-meta";
import { EntryEditor } from "./entry-editor/entry-editor";

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
            <EntryMeta />
            <EntryBody />
            <ChildEntriesMeta />
            <SiblingEntriesMeta />
          </React.Fragment>
        }
        rightSlot={
          <div>
            <EntryEditor />
          </div>
        }
      />
    </QueryClientProvider>
  );
}
