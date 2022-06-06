import React, { useState } from "react";
import {
  CmsContextEntry,
  StaticEntry,
  AllEntriesMeta,
  ChildEntriesMeta,
  SiblingEntries,
  SingleEntryMeta,
  EntrySelector,
} from "../features";

export function DemoView() {
  const [selectedEntry, setSelectedEntry] = useState("");

  return (
    <React.Fragment>
      <div style={{ padding: "48px 16px 16px 16px" }}>
        <EntrySelector value={selectedEntry} onChange={setSelectedEntry} />
      </div>

      {selectedEntry && (
        <div style={{ display: "flex", padding: "16px" }}>
          <div style={{ width: "50%" }}>
            <CmsContextEntry entryId={selectedEntry} />
            <StaticEntry entryId={selectedEntry} />
          </div>
          <div style={{ width: "50%" }}>
            <AllEntriesMeta />
            <ChildEntriesMeta entryId={selectedEntry} />
            <SiblingEntries entryId={selectedEntry} />
            <SingleEntryMeta entryId={selectedEntry} />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
