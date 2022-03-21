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
            <span>Entity:</span>
            <input
              type="text"
              name="entity"
              value={formData.entity}
              onChange={onChange}
            />
          </label>
        </div>

        <div className={styles.form_input}>
          <label>
            <span>Collection:</span>
            <CollectionSelector
              name="collection"
              value={formData.collection}
              onChange={onChange}
            />
          </label>
        </div>

        <div className={styles.form_input}>
          <label>
            <span>Parent:</span>
            <EntrySelector
              name="parent"
              value={formData.parent}
              onChange={onChange}
            />
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
