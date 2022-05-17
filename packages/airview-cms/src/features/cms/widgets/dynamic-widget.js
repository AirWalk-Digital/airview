import React from "react";
import { EntrySelectWidget } from "./entry-select-widget";
import { BooleanWidget } from "./boolean-widget";
import { TextFieldWidget } from "./text-field-widget";
import { DateWidget } from "./date-widget";

export function DynamicWidget({ fieldData, value, onChange }) {
  let field = null;

  switch (fieldData.widget) {
    case "string": {
      const { label, required, placeholder } = fieldData;

      field = (
        <TextFieldWidget
          value={value}
          onChange={onChange}
          {...{ label, required, placeholder }}
        />
      );
      break;
    }
    case "entrySelect": {
      const { excludeSelf, collection } = fieldData;

      field = (
        <EntrySelectWidget
          value={value}
          onChange={onChange}
          {...{ excludeSelf, collection }}
        />
      );
      break;
    }
    case "boolean": {
      const { label, defaultValue } = fieldData;

      field = (
        <BooleanWidget
          value={value}
          onChange={onChange}
          {...{ label, defaultValue }}
        />
      );
      break;
    }
    case "date": {
      const {
        label,
        required,
        readOnly,
        disabled,
        minDate,
        maxDate,
        defaultValue,
        format,
      } = fieldData;

      field = (
        <DateWidget
          value={value}
          onChange={onChange}
          {...{
            label,
            required,
            readOnly,
            disabled,
            minDate,
            maxDate,
            defaultValue,
            format,
          }}
        />
      );
      break;
    }
    default: {
      field = null;
    }
  }

  return field;
}
