import React, { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { useGetEntryMeta, useGetEntryBody } from "../../hooks";
import { MetaForm } from "../meta-form";
import { EntrySelector } from "../entry-selector";

export function EntryEditor() {
  const queryClient = useQueryClient();
  const [selectedEntry, setSelectedEntry] = useState("");
  const [formData, setFormData] = useState();
  const [formSubmitting, setFormSubmitting] = useState(false);

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
      const response = await fetch(`/api/entries/${selectedEntry}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        queryClient.invalidateQueries("entries_meta");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnFormReset = (event) => {
    event.preventDefault();
    setFormData({ ...entryMeta, body: entryBody });
  };

  useEffect(() => {
    if (entryMetaIsFetching || entryBodyIsFetching) return;

    setFormData({ ...entryMeta, body: entryBody });
    setFormSubmitting(false);
  }, [entryMeta, entryBody, entryMetaIsFetching, entryBodyIsFetching]);

  return (
    <div>
      <h3>Edit Entry</h3>
      {formSubmitting ? (
        <div>Form submitting</div>
      ) : (
        <>
          <EntrySelector
            onChange={handleSelectedEntryChange}
            value={selectedEntry}
            style={{ marginBottom: 32 }}
          />
          {selectedEntry && !formData && <div>Loading form data...</div>}
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
      <hr />
    </div>
  );
}
