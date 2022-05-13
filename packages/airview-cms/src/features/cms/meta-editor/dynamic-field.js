import React from "react";
import { ParentSelectorWidget } from "../parent-selector-widget";
import { BooleanWidget } from "../boolean-widget";
import { TextFieldWidget } from "../text-field-widget";

export function DynamicField({ fieldData, value, onChange }) {
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
    case "parent_select": {
      field = <ParentSelectorWidget value={value} onChange={onChange} />;
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
    default: {
      field = null;
    }
  }

  return field;
}
