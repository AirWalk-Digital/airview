import React, { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import matter from "gray-matter";
import { blobToBase64 } from "../../util";
import { useGetEntryMeta, useGetEntryBody, useConfig } from "../../hooks";
import { EntrySelector } from "../entry-selector";
import { DynamicForm } from "../dynamic-form";

global.Buffer = global.Buffer || require("buffer").Buffer;

const makeMarkdownFileBlob = async (body, frontmatter) => {
  return await blobToBase64(
    new Blob([matter.stringify(body, frontmatter)], {
      type: "text/plain",
    })
  );
};

export function EntryEditor() {
  const queryClient = useQueryClient();
  const [selectedEntry, setSelectedEntry] = useState("");
  const config = useConfig();
  const { data: entryMeta } = useGetEntryMeta(selectedEntry);
  const { data: entryBody } = useGetEntryBody(selectedEntry);
  const [formState, setFormState] = useState(null);
  const [formFields, setFormFields] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const handleOnFieldChange = (event) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      setFormSubmitting(true);

      const { meta = [], additionalFiles = [] } =
        config.collections[entryMeta.collection];

      const metaData = [...meta, { name: "title" }].map(({ name }) => [
        name,
        formState[name],
      ]);

      const bodyData = await Promise.all(
        additionalFiles.map(async ({ name }) => [
          name,
          await makeMarkdownFileBlob(formState[name], null),
        ])
      );

      const payload = {
        "_index.md": await makeMarkdownFileBlob(
          formState["_index.md"],
          Object.fromEntries(metaData)
        ),
        ...Object.fromEntries(bodyData),
      };

      const response = await fetch(`/api/content/${entryMeta.id}/main`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        queryClient.invalidateQueries("entries_meta");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFormSubmitting(false);
    }
  };

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
          onChange={handleOnFieldChange}
          onSubmit={handleOnSubmit}
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
