import React, { useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCmsBusyStatus } from "../../cms.slice";

export function DateWidget({
  value,
  onChange,
  label,
  required = false,
  minDate,
  maxDate,
  defaultValue = dayjs(),
  format = "DD/MM/YYYY",
}) {
  const [errorCode, setErrorCode] = useState(null);
  const cmsBusy = useSelector(selectCmsBusyStatus);

  const getErrorText = () => {
    let errorMessage;

    switch (errorCode) {
      case "invalidDate":
        errorMessage = "Invalid date";
        break;
      case "minDate":
        errorMessage = `Date should be no earlier than ${dayjs(minDate).format(
          format
        )}`;
        break;
      case "maxDate":
        errorMessage = `Date should be no greater than ${dayjs(maxDate).format(
          format
        )}`;
        break;
      default:
        errorMessage = "Date input error";
    }

    return errorMessage;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label={label}
        value={value ?? defaultValue}
        minDate={minDate ? dayjs(minDate) : null}
        maxDate={maxDate ? dayjs(maxDate) : null}
        onChange={(newValue) => {
          onChange(newValue.toISOString());
        }}
        onError={(reason) => setErrorCode(reason)}
        inputFormat={format}
        disabled={cmsBusy}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            fullWidth
            margin="normal"
            helperText={
              errorCode ? getErrorText() : params?.inputProps?.placeholder
            }
            required={required}
            onKeyDown={(e) => e.preventDefault()}
            sx={{
              "& .MuiInputBase-root": {
                pointerEvents: "none",
              },

              "& .MuiInputBase-root button": {
                pointerEvents: "all",
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}

DateWidget.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  defaultValue: PropTypes.string,
  format: PropTypes.string,
};
