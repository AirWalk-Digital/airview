import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  CmsContextEntry,
  StaticEntry,
  AllEntriesMeta,
  ChildEntriesMeta,
  SiblingEntries,
  SingleEntryMeta,
} from "../features";

export function DemoView() {
  const { collection, entry } = useParams();

  const selectedEntry = useMemo(() => {
    if (!collection || !entry) return "";

    return `${collection}/${entry}`;
  }, [collection, entry]);

  return (
    <React.Fragment>
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
