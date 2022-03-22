import React, { useEffect, useState, useMemo } from "react";
import { useQueryClient } from "react-query";
import { CollectionSelector } from "../collection-selector";
import { useConfig, useSlugify } from "../../hooks";
import { DynamicForm } from "../dynamic-form";

export function EntryCreator() {
  const queryClient = useQueryClient();
  const [selectedCollection, setSelectedCollection] = useState("");
  const [formState, setFormState] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const config = useConfig();
  const slugify = useSlugify();

  const meta = config.collections[selectedCollection]?.meta;

  const handleOnSelectedCollectionChange = (event) => {
    setSelectedCollection(event.target.value);
  };

  const setIntialFormState = useMemo(() => {
    return {
      name: "",
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

    try {
      const mappedBody = {
        entity: formState.name,
        collection: selectedCollection,
        content: [{ name: "index.md", body: "" }],
        ...formState,
      };
      const response = await fetch(
        `/api/content/${mappedBody.collection}/${slugify(mappedBody.name)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mappedBody),
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
              label: "Name",
              name: "name",
              placeholder: "Type a name for the entry...",
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
