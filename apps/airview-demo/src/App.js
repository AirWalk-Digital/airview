import React, { useState } from "react";
import { AirviewCMS } from "airview-cms";
import { config } from "./config";
import {
  CmsContextEntry,
  StaticEntry,
  AllEntriesMeta,
  ChildEntriesMeta,
  SiblingEntries,
  SingleEntryMeta,
  EntrySelector,
} from "./features";

function App() {
  const [selectedEntry, setSelectedEntry] = useState("");

  return (
    <AirviewCMS config={config}>
      <div style={{ padding: "48px 16px 16px 16px" }}>
        <EntrySelector value={selectedEntry} onChange={setSelectedEntry} />
      </div>
      <div style={{ display: "flex", padding: "16px" }}>
        <div style={{ width: "50%" }}>
          <CmsContextEntry />
          <StaticEntry />
        </div>
        <div style={{ width: "50%" }}>
          <AllEntriesMeta />
          <ChildEntriesMeta />
          <SiblingEntries />
          <SingleEntryMeta />
        </div>
      </div>
    </AirviewCMS>
  );
}

export default App;
