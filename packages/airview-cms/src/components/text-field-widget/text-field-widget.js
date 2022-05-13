import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

export function TextFieldWidget({
  label,
  value = "",
  required = false,
  placeholder,
  onChange,
}) {
  const handleOnChange = (event) => onChange(event.target.value);

  return (
    <TextField
      label={label}
      autoComplete="off"
      fullWidth
      size="small"
      margin="normal"
      value={value}
      required={required}
      placeholder={placeholder}
      onChange={handleOnChange}
    />
  );
}

TextFieldWidget.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
