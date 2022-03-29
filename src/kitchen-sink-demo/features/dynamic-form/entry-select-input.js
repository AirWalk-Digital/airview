import styles from "./dynamic-form.module.scss";
import { EntrySelector } from "../entry-selector";

export function EntrySelectInput({ label, name, value, onChange }) {
  return (
    <div className={styles.form_input}>
      <label>
        <span>{label}</span>
        <EntrySelector {...{ label, name, value, onChange }} />
      </label>
    </div>
  );
}
