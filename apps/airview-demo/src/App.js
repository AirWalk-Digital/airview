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
          <h2>CMS Context Entry</h2>
          <p>
            <em>knowledge/place_call_on_hold</em>
          </p>
          <CmsContextEntry />
          <hr />
          <h2>Static Entry</h2>
          <p>
            <em>knowledge/place_call_on_hold</em>
          </p>
          <StaticEntry />
        </div>
        <div style={{ width: "50%" }}>
          <h2>All Entries Meta</h2>
          <AllEntriesMeta />
          <hr />
          <h2>Child Entries Meta</h2>
          <p>
            <em>application/ms_teams</em>
          </p>
          <ChildEntriesMeta />
          <hr />
          <h2>Sibling Entries Meta</h2>
          <p>
            <em>knowledge/composing_a_new_message</em>
          </p>
          <SiblingEntries />
          <hr />
          <h2>Single Entry Meta</h2>
          <p>
            <em>knowledge/place_call_on_hold</em>
          </p>
          <SingleEntryMeta />
        </div>
      </div>
    </AirviewCMS>
  );
}

export default App;
