import React from "react";
import { TextField } from "@mui/material";

export function TextFieldWidget(props) {
  const textFieldConfigProps = {
    autoComplete: "off",
    fullWidth: true,
    size: "small",
  };

  return <TextField {...{ ...props, ...textFieldConfigProps }} />;
}
