import React, { useState } from "react";
import { CollectionSelector } from "../collection-selector";
import { EntrySelector } from "../entry-selector";
import styles from "./meta-form.module.scss";

export function MetaForm({ initialFormData, onSubmit }) {
  const setIntialFormData = () => {
    return (
      initialFormData ?? {
        name: "",
        collection: "",
        parent: "",
        body: "",
      }
    );
  };

  const [formData, setFormData] = useState(setIntialFormData());

  const handleOnChange = (name, value) => {
    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleOnReset = (event) => {
    setFormData(setIntialFormData());
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <React.Fragment>
      <form
        onSubmit={handleOnSubmit}
        onReset={handleOnReset}
        className={styles.root}
      >
        <div className={styles.form_input}>
          <label>
            <span>Name:</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(event) =>
                handleOnChange(event.target.name, event.target.value)
              }
            />
          </label>
        </div>

        <div className={styles.form_input}>
          <label>
            <span>Collection:</span>
            <CollectionSelector
              defaultValue={formData.collection}
              onChange={(value) => handleOnChange("collection", value)}
            />
          </label>
        </div>

        <div className={styles.form_input}>
          <label>
            <span>Parent:</span>
            <EntrySelector
              defaultValue={formData.parent}
              onChange={(value) => handleOnChange("parent", value)}
            />
          </label>
        </div>

        <div className={styles.form_input}>
          <label>
            <span>Body:</span>
            <textarea
              name="body"
              value={formData.body}
              onChange={(event) =>
                handleOnChange(event.target.name, event.target.value)
              }
            />
          </label>
        </div>

        <div className={styles.form_input}>
          <button type="reset">Reset</button>
          <button type="submit" className={styles.action_button}>
            Submit
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}
