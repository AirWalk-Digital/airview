import React from "react";
import { Container } from "../components";
import {
  AllEntriesMeta,
  EntriesByCollection,
  EntryMeta,
  EntryBody,
  ChildEntriesMeta,
  SiblingEntriesMeta,
  EntryEditor,
  EntryCreator,
  EntryRemover,
  RemoveAllEntries,
} from "../features";

export function MainView() {
  return (
    <Container
      leftSlot={
        <React.Fragment>
          <AllEntriesMeta />
          <EntriesByCollection />
          <EntryMeta />
          {/*<EntryBody />
          <ChildEntriesMeta />
          <SiblingEntriesMeta />*/}
        </React.Fragment>
      }
      rightSlot={
        <div>
          {/*<EntryCreator />
          <EntryRemover />
          <RemoveAllEntries />
          <EntryEditor />*/}
        </div>
      }
    />
  );
}
