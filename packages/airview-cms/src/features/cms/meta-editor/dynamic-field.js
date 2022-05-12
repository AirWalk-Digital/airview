import React from "react";
import { ParentSelectorWidget } from "../parent-selector-widget";
import { TextFieldWidget } from "@components";

export function DynamicField({ fieldData, value, onChange }) {
  let field = null;

  switch (fieldData.widget) {
    case "string":
      field = (
        <TextFieldWidget
          label={fieldData.label}
          name={fieldData.name}
          required={fieldData.required}
          placeholder={fieldData.placeholder}
          value={value}
          onChange={onChange}
        />
      );
      break;
    case "parent_select":
      field = (
        <ParentSelectorWidget value={value} onChange={onChange} id="test" />
      );
      break;
    default:
      field = null;
  }

  return field;
}
