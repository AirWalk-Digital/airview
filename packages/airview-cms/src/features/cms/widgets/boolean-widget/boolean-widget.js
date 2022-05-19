import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { FormControl, FormControlLabel, Switch } from "@mui/material";
import { selectCmsBusyStatus } from "../../cms.slice";

export function BooleanWidget({ label, value, defaultValue, onChange }) {
  const handleOnChange = (event) => onChange(event.target.checked);
  const cmsBusy = useSelector(selectCmsBusyStatus);

  return (
    <FormControl fullWidth margin="normal" disabled={cmsBusy}>
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
