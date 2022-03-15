import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useGetEntryMeta, useGetEntryBody } from "../hooks";
import { MetaForm } from "../meta-form/meta-form";
import { EntrySelector } from "../entry-selector";

export function EntryEditor() {
  const queryClient = useQueryClient();
  const [selectedEntry, setSelectedEntry] = useState(null);

  const { data: entryMeta } = useGetEntryMeta(selectedEntry);

  const { data: entryBody } = useGetEntryBody(selectedEntry);

  const handleSelectedEntryChange = (entryId) => setSelectedEntry(entryId);

  const handleOnSubmit = async (formData) => {
    let data;

    try {
      const response = await fetch(`/api/entries/${selectedEntry}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log("invalidating entries_meta query");
        queryClient.invalidateQueries("entries_meta");
        console.log("invalidating entry_body query");
        queryClient.invalidateQueries("entry_body", selectedEntry);
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message ?? data);
    }
  };

  return (
    <div>
      <h3>Edit Entry</h3>
      <EntrySelector onChange={handleSelectedEntryChange} />
      <hr />
      {entryMeta && entryBody && (
        <MetaForm
          initialFormData={{ ...entryMeta, body: entryBody }}
          key={selectedEntry}
          onSubmit={handleOnSubmit}
        />
      )}
    </div>
  );
}
