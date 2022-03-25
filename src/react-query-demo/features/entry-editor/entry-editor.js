import React, { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import matter from "gray-matter";
import {
  useGetAllEntriesMeta,
  useGetEntryMeta,
  useGetEntryBody,
  useConfig,
} from "../../hooks";
import { EntrySelector } from "../entry-selector";
import { PrintJson } from "../../components";
import { DynamicForm } from "../dynamic-form";

global.Buffer = global.Buffer || require("buffer").Buffer;

// function makePayload() {
//   const metaData = meta.map(({ name }) => [name, formState[name]]);
//   const bodyData = additionalFiles.map(({ name }) => [
//     name,
//     matter.stringify(formState[name]),
//   ]);

//   return {
//     "index.md": matter.stringify(
//       formState["_index.md"],
//       Object.fromEntries(metaData)
//     ),
//     ...Object.fromEntries(bodyData),
//   };
// }

// const payload = makePayload();

// console.log("formFields", formFields);
// console.log("formState", formState);
// console.log("payload", payload);

export function EntryEditor() {
  const [selectedEntry, setSelectedEntry] = useState("");
  const config = useConfig();
  const { data: entryMeta } = useGetEntryMeta(selectedEntry);
  const { data: entryBody } = useGetEntryBody(selectedEntry);
  const [formState, setFormState] = useState(null);
  const [formFields, setFormFields] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  useEffect(() => {
    if (!config || !entryMeta || !entryBody) {
      setFormState(null);
      return;
    }

    const { meta = [], additionalFiles = [] } =
      config.collections[entryMeta.collection];

    function makeInitialFormState() {
      const stateMetaData = meta.map(({ name }) => [
        name,
        entryMeta.meta[name] ?? "",
      ]);

      stateMetaData.push(["title", entryMeta.meta.title]);

      const stateBodyData = additionalFiles.map(({ name }) => {
        return [name, matter(atob(entryBody[name])).content];
      });

      stateBodyData.push([
        "_index.md",
        matter(atob(entryBody["_index.md"])).content,
      ]);

      return {
        ...Object.fromEntries(stateMetaData),
        ...Object.fromEntries(stateBodyData),
      };
    }

    setFormState(makeInitialFormState());
  }, [config, entryMeta, entryBody]);

  useEffect(() => {
    if (!config || !entryMeta) {
      setFormFields(null);
      return;
    }

    const {
      meta = [],
      additionalFiles = [],
      placeholder,
    } = config.collections[entryMeta.collection];

    function makeFormFields() {
      return [
        ...[
          {
            type: "string",
            name: "title",
            label: "Title",
            placeholder: "Enter a title",
          },
          ...meta,
        ],
        ...[{ name: "_index.md", placeholder }, ...additionalFiles].map(
          (file) => {
            return {
              type: "textarea",
              name: file.name,
              label: file.name,
              placeholder: file.placeholder,
            };
          }
        ),
      ];
    }

    setFormFields(makeFormFields());
  }, [config, entryMeta]);

  console.log(formState);
  console.log(formFields);

  return (
    <div>
      <h3>Edit Entry</h3>
      <EntrySelector
        onChange={(event) => setSelectedEntry(event.target.value)}
        value={selectedEntry}
        style={{ marginBottom: 16 }}
      />
      {formState && formFields && !formSubmitting && (
        <DynamicForm
          formState={formState}
          meta={formFields}
          onChange={() => {}}
          onSubmit={() => {}}
          onReset={() => {}}
        />
      )}
    </div>
  );

  // if (!formState || !formFields) {
  //   return <span>Form will not render</span>;
  // }

  // return <span>Form will render</span>;
}

/*
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

    const meta = config.collections[entryMeta.collection]?.meta ?? [];

    const bodyContent = Object.entries(entryBody).map(([fileName, content]) => {
      console.log(atob(content));
      return [fileName, matter(atob(content)).content];
    });

    const formState = {
      ...entryMeta.meta,
      ...Object.fromEntries(bodyContent),
    };

    setFormState(formState);
  }, [config, entryMeta, entryBody]);

  const formMeta = [
    {
      type: "string",
      label: "Title",
      name: "title",
      placeholder: "Type a title for the entry...",
    },
    ...(config.collections[entryMeta.collection].meta ?? []),
  ];

  return (
    <div>
      <h3>Edit Entry</h3>
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
*/
