import React from "react";
import { AllEntriesMeta, EntryBody } from "../../features";
import styles from "./entry-view.module.scss";

export function EntryView() {
  return (
    <div className={styles.root}>
      <div>
        <AllEntriesMeta />
      </div>
      <div>
        <EntryBody />
      </div>
      <div>
        <span>Meta Editor</span>
      </div>
    </div>
  );
}
