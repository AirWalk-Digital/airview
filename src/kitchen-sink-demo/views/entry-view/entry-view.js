import React from "react";
import {
  AllEntriesMeta,
  EntryMeta,
  EntriesByCollection,
  ChildEntriesMeta,
  SiblingEntriesMeta,
  EntryBody,
} from "../../features";
import styles from "./entry-view.module.scss";

export function EntryView() {
  return (
    <div className={styles.root}>
      <div>
        <AllEntriesMeta />
      </div>
      <div>
        <EntriesByCollection />
        <EntryMeta />
        <ChildEntriesMeta />
        <SiblingEntriesMeta />
        <EntryBody />
      </div>
      <div>
        <span>Col three</span>
      </div>
    </div>
  );
}
