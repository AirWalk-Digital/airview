import React, { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { useGetEntryMeta, useGetEntryBody } from "../../hooks";
import { MetaForm } from "../meta-form";
import { EntrySelector } from "../entry-selector";

export function EntryEditor() {
  const queryClient = useQueryClient();
  const [selectedEntry, setSelectedEntry] = useState("");
  const [formData, setFormData] = useState();
  const [formReady, setFormReady] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const {
    isLoading: entryMetaIsLoading,
    isFetching: entryMetaIsFetching,
    isError: entryMetaIsError,
    isSuccess: entryMetaIsSuccess,
    data: entryMeta,
  } = useGetEntryMeta(selectedEntry);

  const {
    isLoading: entryBodyIsLoading,
    isFetching: entryBodyIsFetching,
    isError: entryBodyIsError,
    isSuccess: entryBodyIsSuccess,
    data: entryBody,
  } = useGetEntryBody(selectedEntry);

  const handleSelectedEntryChange = (event) =>
    setSelectedEntry(event.target.value);

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
    setFormReady(false);

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
        //const data = await response.json();

        queryClient.invalidateQueries("entries_meta");
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message ?? data);
    }
  };

  const handleOnFormReset = (event) => {
    event.preventDefault();

    setFormData({ ...entryMeta, body: entryBody });
  };

  useEffect(() => {
    setFormReady(false);
    if (!entryMeta || !entryBody) return;

    setFormData({ ...entryMeta, body: entryBody });
    setFormReady(true);
    setFormSubmitting(false);
  }, [entryMeta, entryBody]);

  return (
    <div>
      <h3>Edit Entry</h3>
      {!formSubmitting && (
        <EntrySelector
          onChange={handleSelectedEntryChange}
          value={selectedEntry}
        />
      )}
      <hr />
      {formSubmitting && <div>Form submitting</div>}
      {selectedEntry && !formReady && !formSubmitting && (
        <div>Loading form</div>
      )}
      {selectedEntry && formReady && !formSubmitting && (
        <MetaForm
          formData={formData}
          onReset={handleOnFormReset}
          onChange={handleOnFormChange}
          onSubmit={handleOnFormSubmit}
        />
      )}
      <hr />
    </div>
  );
}

/*
show form
- when we have form data ready
  - is dependent on 


*/
