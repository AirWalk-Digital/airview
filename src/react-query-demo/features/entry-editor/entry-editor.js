import React, { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import {
  useGetAllEntriesMeta,
  useGetEntryMeta,
  useGetEntryBody,
} from "../../hooks";
import { MetaForm } from "../meta-form";
import { EntrySelector } from "../entry-selector";

export function EntryEditor() {
  const queryClient = useQueryClient();
  const [selectedEntry, setSelectedEntry] = useState("");
  const [formData, setFormData] = useState();
  const [formSubmitting, setFormSubmitting] = useState(false);

  const {
    isLoading: allEntriesIsLoading,
    isFetching: allEntriesIsFetching,
    data: entries,
  } = useGetAllEntriesMeta();

  const { isFetching: entryMetaIsFetching, data: entryMeta } =
    useGetEntryMeta(selectedEntry);

  const { isFetching: entryBodyIsFetching, data: entryBody } =
    useGetEntryBody(selectedEntry);

  const handleSelectedEntryChange = (event) => {
    setFormData(null);
    setSelectedEntry(event.target.value);
  };

  const handleOnFormChange = (event) => {
    setFormData((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  // Look to use React-Query mutation hook:
  // https://react-query.tanstack.com/guides/mutations
  const handleOnFormSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitting(true);

    try {
      const { body, ...postData } = formData;
      postData.content = [{ name: "_index.md", content: body }];
      const response = await fetch(`/api/content/${selectedEntry}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        queryClient.invalidateQueries("entries_meta");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const handleOnFormReset = (event) => {
    event.preventDefault();
    setFormData({ ...entryMeta, body: entryBody });
  };

  useEffect(() => {
    if (entryMetaIsFetching || entryBodyIsFetching) return;

    if (!entryMeta || !entryBody) {
      setSelectedEntry("");
    }

    if (entryMeta && entryBody) {
      setFormData({ ...entryMeta, body: entryBody });
      setFormSubmitting(false);
    }
  }, [entryMeta, entryBody, entryMetaIsFetching, entryBodyIsFetching]);

  return (
    <div>
      <h3>Edit Entry</h3>
      {allEntriesIsLoading || allEntriesIsFetching ? (
        <div>Fetching entries</div>
      ) : (
        <>
          {!entries.length ? (
            <div>There are no entries to edit...</div>
          ) : (
            <>
              {formSubmitting ? (
                <div>Form submitting</div>
              ) : (
                <>
                  <EntrySelector
                    onChange={handleSelectedEntryChange}
                    value={selectedEntry}
                    style={{ marginBottom: 32 }}
                  />
                  {selectedEntry && !formData && (
                    <div>Loading form data...</div>
                  )}
                  {selectedEntry && formData && (
                    <MetaForm
                      formData={formData}
                      onReset={handleOnFormReset}
                      onChange={handleOnFormChange}
                      onSubmit={handleOnFormSubmit}
                    />
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
