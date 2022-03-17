import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { EntrySelector } from "../entry-selector";

export function EntryRemover() {
  const queryClient = useQueryClient();
  const [selectedEntry, setSelectedEntry] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSelectedEntryChange = (event) => {
    setSelectedEntry(event.target.value);
  };

  const removeEntry = async () => {
    setSubmitting(true);

    try {
      const response = await fetch(`/api/entries/${selectedEntry}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSelectedEntry("");
        queryClient.invalidateQueries("entries_meta");
      }
    } catch (error) {
      console.warn(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h3>Remove Entry</h3>
      {submitting ? (
        <div>Removing entry...</div>
      ) : (
        <>
          <EntrySelector
            onChange={handleSelectedEntryChange}
            value={selectedEntry}
            style={{ marginBottom: 32 }}
          />
          <br />
          <button onClick={removeEntry} style={{ marginBottom: 16 }}>
            Remove Entry
          </button>
        </>
      )}
      <hr />
    </div>
  );
}
