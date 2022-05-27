import React from "react";
import { AirviewCMS } from "airview-cms";
import { config } from "./config";
import {
  CmsContextEntry,
  StaticEntry,
  AllEntriesMeta,
  ChildEntriesMeta,
  SiblingEntries,
  SingleEntryMeta,
} from "./features";

function App() {
  return (
    <AirviewCMS config={config}>
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
