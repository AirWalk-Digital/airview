import React, { useState } from "react";
import { useGetEntryMeta, useGetEntryBody } from "../hooks";
import { MetaForm } from "../meta-form/meta-form";
import { EntrySelector } from "../entry-selector";

/*
  state for selected entry
  does lookup of entry meta
  does lookup of entry body
  if loading do not show form
  if error show feedback
  if we have both entry meta and entry body show form
  on submit of form push data to api and await response
  if successfull - refetch entry meta and body to update form?
  */

export function EntryEditor() {
  const [selectedEntry, setSelectedEntry] = useState(null);

  const { data: entryMeta } = useGetEntryMeta(selectedEntry);

  const { data: entryBody } = useGetEntryBody(selectedEntry);

  const handleSelectedEntryChange = (entryId) => setSelectedEntry(entryId);

  return (
    <div>
      <h3>Edit Entry</h3>
      <EntrySelector onChange={handleSelectedEntryChange} />
      <hr />
      {entryMeta && entryBody && (
        <MetaForm
          initialFormData={{ ...entryMeta, body: entryBody }}
          key={selectedEntry}
        />
      )}
    </div>
  );
}
