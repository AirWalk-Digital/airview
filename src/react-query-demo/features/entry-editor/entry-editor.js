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

/*
function useConfig() {
  return {
    application: {
      meta: [
        {
          type: "string",
          name: "title",
          label: "Title",
          placeholder: "Enter a title",
        },
      ],
      placeholder: "Main body placeholder",
    },
    document: {
      meta: [
        {
          type: "string",
          name: "title",
          label: "Title",
          placeholder: "Enter a title",
        },
        {
          type: "checkbox",
          name: "published",
          label: "Published",
        },
      ],
      placeholder: "Main body placeholder",
      additionalFiles: [
        {
          name: "section_two.md",
          placeholder: "Section Two placeholder",
        },
      ],
    },
  };
}

function useGetEntryMeta() {
  return {
    collection: "document",
    meta: {
      title: "Open a new tab",
      published: false,
    },
  };
}

function useGetEntryBody() {
  return {
    "_index.md": "Some body content",
    "section_two.md": "Some extra content",
  };
}
*/

export function EntryEditor() {
  const selectedEntry = "knowledge/composing_a_new_message";
  const config = useConfig();
  const { data: entryMeta } = useGetEntryMeta(selectedEntry);
  const { data: entryBody } = useGetEntryBody(selectedEntry);
  const [formState, setFormState] = useState(null);
  const [formFields, setFormFields] = useState(null);

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

      const stateBodyData = additionalFiles.map(({ name }) => [
        name,
        matter(atob(entryBody[name]) ?? "",
      ]);

      stateBodyData.push(["_index.md", entryBody["_index.md"]]);

      return {
        ...Object.fromEntries(stateMetaData),
        ...Object.fromEntries(stateBodyData),
      };
    }

    setFormState(makeInitialFormState());
  }, [config, entryMeta, entryBody]);

  console.log(formState);

  return null;

  // const {
  //   meta = [],
  //   additionalFiles = [],
  //   placeholder,
  // } = config[entryMeta.collection];

  // function makeFormFields() {
  //   return [
  //     ...meta,
  //     ...[...additionalFiles, { name: "_index.md", placeholder }].map(
  //       (file) => {
  //         return {
  //           type: "textarea",
  //           name: file.name,
  //           label: file.name,
  //           placeholder: file.placeholder,
  //         };
  //       }
  //     ),
  //   ];
  // }

  // const formFields = makeFormFields();

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

  return <span>EntryEditor</span>;
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
