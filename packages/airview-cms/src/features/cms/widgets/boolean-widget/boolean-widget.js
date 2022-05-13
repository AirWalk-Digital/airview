import React from "react";
import PropTypes from "prop-types";
import { FormControl, FormControlLabel, Switch } from "@mui/material";

export function BooleanWidget({ label, value, defaultValue, onChange }) {
  const handleOnChange = (event) => onChange(event.target.checked);

  return (
    <FormControl fullWidth margin="normal">
      <FormControlLabel
        control={
          <Switch checked={value ?? defaultValue} onChange={handleOnChange} />
        }
        label={label}
      />
    </FormControl>
  );
}

BooleanWidget.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool,
  defaultValue: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
};
