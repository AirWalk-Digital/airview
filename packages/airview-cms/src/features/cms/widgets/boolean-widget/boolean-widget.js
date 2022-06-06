import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { FormControl, FormControlLabel, Switch } from "@mui/material";
import {
  selectCmsBusyStatus,
  selectIsWorkingBranchProtected,
} from "../../cms.slice";

export function BooleanWidget({ label, value, defaultValue, onChange }) {
  const handleOnChange = (event) => onChange(event.target.checked);
  const cmsBusy = useSelector(selectCmsBusyStatus);
  const protectedBranch = useSelector(selectIsWorkingBranchProtected);

  return (
    <FormControl
      fullWidth
      margin="normal"
      disabled={cmsBusy || protectedBranch}
    >
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
