import styles from "./dynamic-form.module.scss";

export function TextareaInput({ label, name, placeholder, value, onChange }) {
  return (
    <div className={styles.form_input}>
      <label>
        <span>{label}</span>
        <textarea {...{ label, name, placeholder, value, onChange }} />
      </label>
    </div>
  );
}
