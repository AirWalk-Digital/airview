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
import { DynamicForm } from "../dynamic-form";

export function EntryEditor() {
  const config = useConfig();
  const queryClient = useQueryClient();
  const [selectedEntry, setSelectedEntry] = useState("");
  const [formState, setFormState] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

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

    const meta = config.collections[entryMeta.collection].meta;

    const formState = {
      ...Object.fromEntries(
        meta.map((field) => {
          const { name } = field;

          return [name, entryMeta.meta[name]];
        })
      ),
      title: entryMeta.meta.title,
      body: entryBody.find((f) => f.name === "index.md").body,
    };

    setFormState(formState);
  }, [config, entryMeta, entryBody]);

  return (
    <div>
      <EntrySelector
        onChange={(event) => setSelectedEntry(event.target.value)}
        value={selectedEntry}
        style={{ marginBottom: 16 }}
      />
      {selectedEntry && formState && !formSubmitting && (
        <DynamicForm
          formState={formState}
          meta={[
            {
              type: "string",
              label: "Title",
              name: "title",
              placeholder: "Type a title for the entry...",
            },
            ...(config.collections[entryMeta.collection].meta ?? []),
          ]}
          onChange={() => {}}
          onSubmit={() => {}}
          onReset={() => {}}
        />
      )}
    </div>
  );
}
