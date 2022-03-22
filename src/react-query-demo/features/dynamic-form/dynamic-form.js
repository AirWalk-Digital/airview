import styles from "./dynamic-form.module.scss";
import { EntrySelectInput } from "./entry-select-input";
import { StringInput } from "./string-input";
import { TextareaInput } from "./textarea-input";

function getDynamicField(fieldData) {
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
}

export function DynamicForm({
  formState,
  frontmatterFields,
  onSubmit,
  onReset,
  onChange,
  status,
}) {
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
