import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import { useGetBranchesQuery } from "../airview-api";
import { setWorkingBranch, selectWorkingBranch } from "./working-branch.slice";

export function BranchSwitcher() {
  const dispatch = useDispatch();
  const {
    data: branches,
    isError,
    isLoading,
    isFetching,
  } = useGetBranchesQuery();
  const workingBranch = useSelector(selectWorkingBranch);

  return (
    <Box>
      <Typography
        component="label"
        id="branch-switcher-label"
        sx={{
          fontSize: 12,
          display: "inline-block",
          marginRight: 1,
          textTransform: "uppercase",
          fontWeight: "medium",
        }}
      >
        Working branch:
        {(isLoading || isError) && (
          <Typography
            component="span"
            sx={{
              fontSize: "inherit",
              fontWeight: "inherit",
              marginLeft: 1,
              color: isLoading ? "text.secondary" : "error.main",
            }}
          >
            {isError ? "Error loading branches!" : "Loading branches..."}
          </Typography>
        )}
      </Typography>

      {!(isLoading || isError) && (
        <Select
          labelId="branch-switcher-label"
          id="branch-switcher"
          value={workingBranch}
          sx={{
            height: 25,
            "& .MuiSelect-select": {
              fontSize: 13,
              paddingTop: 1,
              paddingBottom: 1,
            },
          }}
          disabled={isFetching}
          onChange={(event) => dispatch(setWorkingBranch(event.target.value))}
        >
          {branches &&
            branches.map((branch) => (
              <MenuItem value={branch.name} key={branch.name} dense>
                {branch.name}
              </MenuItem>
            ))}
        </Select>
      )}
    </Box>
  );
}
