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
} from "../features";

export function MainView() {
  return (
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
          <EntryCreator />
        </div>
      }
    />
  );
}
