import React, { useState } from "react";
import { useGetEntryBody } from "./hooks";
import { EntrySelector } from "./entry-selector";
import { PrintJson } from "./components";

export function EntryBody() {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const { status, data: entryBody } = useGetEntryBody(selectedEntry);

  const handleOnChange = (entry) => setSelectedEntry(entry);

  return (
    <div>
      <h3>Entry Body</h3>
      <p>
        <i>useGetEntryBody(entryId)</i>
      </p>
      <EntrySelector onChange={handleOnChange} />
      {status === "loading" ? (
        <div>Loading entry body</div>
      ) : (
        <PrintJson data={entryBody} />
      )}
      <hr />
    </div>
  );
}
