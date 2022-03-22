import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useGetCurrentBranch, useGetAllEntriesMeta } from "../../hooks";
import { EntrySelector } from "../entry-selector";

export function EntryRemover() {
  const queryClient = useQueryClient();
  const { data: entries, isLoading, isFetching } = useGetAllEntriesMeta();
  const [selectedEntry, setSelectedEntry] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { data: currentBranch } = useGetCurrentBranch();

  const handleSelectedEntryChange = (event) => {
    setSelectedEntry(event.target.value);
  };

  const removeEntry = async () => {
    setSubmitting(true);

    try {
      const response = await fetch(
        `/api/content/${selectedEntry}/${currentBranch.name}`,
        {
          method: "DELETE",
        }
      );

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
      {isFetching || isLoading ? (
        <div>Fetching entries</div>
      ) : (
        <>
          {!entries.length ? (
            <div>There are no entries to remove...</div>
          ) : (
            <>
              {submitting ? (
                <div>Removing entry...</div>
              ) : (
                <>
                  <EntrySelector
                    onChange={handleSelectedEntryChange}
                    value={selectedEntry}
                    style={{ marginBottom: 32 }}
                  />
                  {selectedEntry && (
                    <>
                      <br />
                      <button
                        onClick={removeEntry}
                        style={{ marginBottom: 16 }}
                      >
                        Remove Entry
                      </button>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}

      <hr />
    </div>
  );
}
