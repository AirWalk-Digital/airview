import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCmsBusyStatus } from "../../cms.slice";

export function StringWidget({
  label,
  value = "",
  required = false,
  placeholder,
  onChange,
}) {
  const handleOnChange = (event) => onChange(event.target.value);
  const cmsBusy = useSelector(selectCmsBusyStatus);

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
      disabled={cmsBusy}
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
