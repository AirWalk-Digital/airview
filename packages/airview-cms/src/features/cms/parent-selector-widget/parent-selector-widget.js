import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { selectCmsContext } from "../cms.slice";
import { useGetAllEntriesMeta } from "../../use-get-all-entries-meta";

/*
EDGE CASE:
-------------
Enter edit mode > switch from branch "main" to "one". Parent is now empty as the selected value (in frontmatter is not present in the selct UI). This is due to "useGetAllEntriesMeta" returning all entries for the working branch, where the selected entry does not exist
*/

export function ParentSelectorWidget({ id, value = "", onChange }) {
  const cmsContext = useSelector(selectCmsContext);

  const { data: entries } = useGetAllEntriesMeta(({ data }) => {
    const filteredData = data
      ?.map((dataItem) => ({
        id: dataItem.id,
        title: dataItem.meta.title,
      }))
      .filter((dataItem) => dataItem.id !== cmsContext);

    return { data: filteredData };
  });

  const noSelection = (
    <Typography component="em" sx={{ color: "text.disabled" }}>
      None
    </Typography>
  );

  return (
    <FormControl fullWidth size="small" margin="normal">
      <InputLabel id={`parent-select-label-${id}`} shrink>
        Parent
      </InputLabel>
      <Select
        notched
        displayEmpty
        labelId={`parent-select-label-${id}`}
        id={`parent-select-${id}`}
        value={value}
        label="Parent"
        onChange={onChange}
      >
        <MenuItem value="">{noSelection}</MenuItem>
        {entries.map((entry) => (
          <MenuItem key={entry.id} value={entry.id}>
            {entry.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

ParentSelectorWidget.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
