import React, { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import {
  useGetAllEntriesMeta,
  useGetEntryMeta,
  useGetEntryBody,
  useConfig,
} from "../../hooks";
import { EntrySelector } from "../entry-selector";
import { PrintJson } from "../../components";

export function EntryEditor() {
  const config = useConfig();
  const queryClient = useQueryClient();
  const [selectedEntry, setSelectedEntry] = useState("2");
  const [formState, setFormState] = useState(null);

  const { isFetching: entryMetaIsFetching, data: entryMeta } =
    useGetEntryMeta(selectedEntry);

  const { isFetching: entryBodyIsFetching, data: entryBody } =
    useGetEntryBody(selectedEntry);

  useEffect(() => {
    if (entryMetaIsFetching || entryBodyIsFetching) {
      setFormState(null);
    }
  }, [entryMetaIsFetching, entryBodyIsFetching]);

  useEffect(() => {
    if (!entryMeta || !entryBody) return;

    const frontmatterFields =
      config.collections[entryMeta.collection].frontmatter;

    const formState = {
      ...Object.fromEntries(
        frontmatterFields.map((field) => {
          const { name } = field;

          return [name, entryMeta[name]];
        })
      ),
      body: entryBody["index.md"].content,
    };

    setFormState(formState);
  }, [config, entryMeta, entryBody]);

  return (
    <div>
      <EntrySelector
        onChange={(event) => setSelectedEntry(event.target.value)}
        value={selectedEntry}
        style={{ marginBottom: 32 }}
      />
      <PrintJson data={formState} />
    </div>
  );
}

export function EntryEditorOld() {
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

  console.log(formData);

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
                  {selectedEntry && formData && <span>Form</span>}
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
