import React, { useEffect, useState, useMemo } from "react";
import { useQueryClient } from "react-query";
import { CollectionSelector } from "../collection-selector";
import { EntrySelector } from "../entry-selector";
import { useConfig } from "../../hooks";
import styles from "./dynamic-form.module.scss";

export function EntryCreator() {
  const queryClient = useQueryClient();
  const [selectedCollection, setSelectedCollection] = useState("");
  const [formState, setFormState] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const config = useConfig();

  const frontmatterFields = config.collections[selectedCollection]?.frontmatter;

  const handleOnSelectedCollectionChange = (event) => {
    setSelectedCollection(event.target.value);
  };

  const setIntialFormState = useMemo(() => {
    return {
      name: "",
      ...Object.fromEntries(
        frontmatterFields?.map((field) => {
          return [field.name, ""];
        }) ?? []
      ),
    };
  }, [frontmatterFields]);

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
      const response = await fetch(`/api/entries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formState,
          collection: selectedCollection,
        }),
      });

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
          frontmatterFields={[
            {
              type: "string",
              label: "Name",
              name: "name",
              placeholder: "Type a name for the entry...",
            },
            ...(frontmatterFields ?? []),
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

function StringInput({ label, name, placeholder, value, onChange }) {
  return (
    <div className={styles.form_input}>
      <label>
        <span>{label}</span>
        <input type="text" {...{ name, placeholder, value, onChange }} />
      </label>
    </div>
  );
}

function TextareaInput({ label, name, placeholder, value, onChange }) {
  return (
    <div className={styles.form_input}>
      <label>
        <span>{label}</span>
        <textarea {...{ label, name, placeholder, value, onChange }} />
      </label>
    </div>
  );
}

function EntrySelectInput({ label, name, value, onChange }) {
  return (
    <div className={styles.form_input}>
      <label>
        <span>{label}</span>
        <EntrySelector {...{ label, name, value, onChange }} />
      </label>
    </div>
  );
}

function DynamicForm({
  formState,
  frontmatterFields,
  onSubmit,
  onReset,
  onChange,
  status,
}) {
  const getDynamicField = (fieldData) => {
    const { type, ...inputProps } = fieldData;

    let field;

    switch (fieldData.type) {
      case "string":
        field = <StringInput {...inputProps} />;
        break;

      case "entry_select":
        field = <EntrySelectInput {...inputProps} />;
        break;

      default:
        field = null;
        break;
    }

    return field;
  };

  return (
    <form
      onSubmit={onSubmit}
      onReset={onReset}
      noValidate
      className={styles.root}
    >
      {frontmatterFields?.map((field, index) => {
        const fieldData = {
          ...field,
          key: field.name,
          onChange,
          value: formState[field.name],
        };

        return getDynamicField(fieldData);
      })}

      <div className={styles.form_input}>
        <button type="reset">Reset</button>
        <button type="submit" className={styles.action_button}>
          Submit
        </button>
      </div>
    </form>
  );
}
