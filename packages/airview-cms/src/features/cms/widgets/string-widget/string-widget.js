import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

export function StringWidget({
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

StringWidget.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
