import React, { useEffect, useState, useMemo } from "react";
import { useQueryClient } from "react-query";
import matter from "gray-matter";
import { blobToBase64, slugifyString } from "../../util";
import { CollectionSelector } from "../collection-selector";
import { useConfig, useGetCurrentBranch } from "../../hooks";
import { DynamicForm } from "../dynamic-form";

global.Buffer = global.Buffer || require("buffer").Buffer;

export function EntryCreator() {
  const queryClient = useQueryClient();
  const [selectedCollection, setSelectedCollection] = useState("");
  const [formState, setFormState] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const config = useConfig();
  const { data: currentBranch } = useGetCurrentBranch();

  const meta = config.collections[selectedCollection]?.meta;

  const handleOnSelectedCollectionChange = (event) => {
    setSelectedCollection(event.target.value);
  };

  const setIntialFormState = useMemo(() => {
    return {
      title: "",
      ...Object.fromEntries(
        meta?.map((field) => {
          return [field.name, ""];
        }) ?? []
      ),
    };
  }, [meta]);

  const handleOnFormInputChange = (event) => {
    event.preventDefault();

    setFormState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleOnFormReset = (event) => {
    event.preventDefault();

    setFormState(setIntialFormState);
  };

  const handleOnFormSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitting(true);

    const markdownBlob = new Blob([matter.stringify("", formState)], {
      type: "text/plain",
    });

    const b64Contents = await blobToBase64(markdownBlob);

    console.log(slugifyString(formState.title));

    try {
      const response = await fetch(
        `/api/content/${selectedCollection}/${slugifyString(formState.title)}/${
          currentBranch.name
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(b64Contents),
        }
      );

      if (response.ok) {
        queryClient.invalidateQueries("entries_meta");
      }
    } catch (error) {
      console.warn(error);
    } finally {
      setSelectedCollection("");
      setFormSubmitting(false);
    }
  };

  useEffect(() => {
    if (!selectedCollection) {
      setFormState(null);
      return;
    }

    setFormState(setIntialFormState);
  }, [setIntialFormState, selectedCollection]);

  return (
    <div>
      <h3>Create Entry</h3>
      <CollectionSelector
        onChange={handleOnSelectedCollectionChange}
        value={selectedCollection}
      />
      {formSubmitting && <div>Creating entry, please wait</div>}
      {selectedCollection && formState && !formSubmitting && (
        <DynamicForm
          formState={formState}
          meta={[
            {
              type: "string",
              label: "Title",
              name: "title",
              placeholder: "Type a title for the entry...",
            },
            ...(meta ?? []),
          ]}
          onChange={handleOnFormInputChange}
          onSubmit={handleOnFormSubmit}
          onReset={handleOnFormReset}
        />
      )}

      <hr />
    </div>
  );
}
