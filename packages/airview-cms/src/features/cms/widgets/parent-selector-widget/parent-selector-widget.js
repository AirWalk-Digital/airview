import React, { useMemo, useId } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { selectCmsContext } from "../../cms.slice";
import { useGetAllEntriesMeta } from "../../../use-get-all-entries-meta";

export function ParentSelectorWidget({ value = "", onChange }) {
  const id = useId();

  const cmsContext = useSelector(selectCmsContext);

  const { data: entries } = useGetAllEntriesMeta(({ data }) => {
    const filteredData = data?.map((dataItem) => ({
      id: dataItem.id,
      title: dataItem.meta.title,
    }));

    return { data: filteredData };
  });

  // Remove current context entry to prevent self as parent selection
  const filteredEntries = useMemo(
    () => entries.filter((entry) => entry.id !== cmsContext),
    [entries, cmsContext]
  );

  // Derrive if working branch no longer has selected parent
  const isInvalidSelection = useMemo(() => {
    if (!value) return false;

    return entries.find((entry) => entry.id === value) ? false : true;
  }, [value, entries]);

  const noSelection = (
    <Typography component="em" sx={{ color: "text.disabled" }}>
      None
    </Typography>
  );

  const handleOnChange = (event) => onChange(event.target.value);

  return (
    <FormControl
      fullWidth
      size="small"
      margin="normal"
      error={isInvalidSelection}
    >
      <InputLabel id={`parent-select-label-${id}`} shrink>
        Parent Entry
      </InputLabel>
      <Select
        notched
        displayEmpty
        labelId={`parent-select-label-${id}`}
        id={`parent-select-${id}`}
        value={value}
        label="Parent Entry"
        onChange={handleOnChange}
      >
        <MenuItem value="">{noSelection}</MenuItem>
        {filteredEntries.map((entry) => (
          <MenuItem key={entry.id} value={entry.id}>
            {entry.title}
          </MenuItem>
        ))}
      </Select>
      {isInvalidSelection && (
        <FormHelperText>
          Error: selected parent entry does not exist in this branch!
        </FormHelperText>
      )}
    </FormControl>
  );
}

ParentSelectorWidget.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
