import React from "react";
import { CollectionSelector } from "../collection-selector";
import { EntrySelector } from "../entry-selector";
import styles from "./meta-form.module.scss";

export function MetaForm({ formData, onSubmit, onChange, onReset }) {
  return (
    <React.Fragment>
      <form
        className={styles.root}
        onSubmit={onSubmit}
        onReset={onReset}
        noValidate
      >
        <div className={styles.form_input}>
          <label>
            <span>Name:</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
            />
          </label>
        </div>

        <div className={styles.form_input}>
          <label>
            <span>Collection:</span>
            <CollectionSelector
              value={formData.collection}
              onChange={onChange}
            />
          </label>
        </div>

        <div className={styles.form_input}>
          <label>
            <span>Parent:</span>
            <EntrySelector value={formData.parent} onChange={onChange} />
          </label>
        </div>

        <div className={styles.form_input}>
          <label>
            <span>Body:</span>
            <textarea name="body" value={formData.body} onChange={onChange} />
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
