import styles from "./dynamic-form.module.scss";

export function StringInput({ label, name, placeholder, value, onChange }) {
  return (
    <div className={styles.form_input}>
      <label>
        <span>{label}</span>
        <input type="text" {...{ name, placeholder, value, onChange }} />
      </label>
    </div>
  );
}
