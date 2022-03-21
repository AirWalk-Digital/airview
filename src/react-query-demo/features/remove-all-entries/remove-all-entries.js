import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useGetAllEntriesMeta } from "../../hooks";

export function RemoveAllEntries() {
  const queryClient = useQueryClient();
  const { data: entries, isLoading, isFetching } = useGetAllEntriesMeta();
  const [submitting, setSubmitting] = useState(false);

  const removeAllEntries = async () => {
    setSubmitting(true);

    try {
      const response = await fetch(`/api/entries/`, {
        method: "DELETE",
      });

      if (response.ok) {
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
      <h3>Remove All Entries</h3>
      {isFetching || isLoading ? (
        <div>Fetching entries</div>
      ) : (
        <>
          {!entries.length ? (
            <div>There are no entries to remove...</div>
          ) : (
            <>
              {submitting ? (
                <div>Removing all entries...</div>
              ) : (
                <button onClick={removeAllEntries}>Remove all entries</button>
              )}
            </>
          )}
        </>
      )}

      <hr />
    </div>
  );
}