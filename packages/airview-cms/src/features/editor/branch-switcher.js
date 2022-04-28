import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import { setWorkingBranch, fetchBranches } from "./branch-slice";

export function BranchSwitcher() {
  const dispatch = useDispatch();
  const branchesSlice = useSelector((state) => state.branchesSlice);
  const { status, workingBranch, branches } = branchesSlice;

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const getValue = () => {
    if (status === "loading" || status === "idle" || status === "error") {
      return "placeholder";
    } else {
      return workingBranch;
    }
  };

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
      </Typography>
      <Select
        labelId="branch-switcher-label"
        id="branch-switcher"
        value={getValue()}
        sx={{
          height: 25,
          "& .MuiSelect-select": {
            fontSize: 13,
            paddingTop: 1,
            paddingBottom: 1,
          },
        }}
        disabled={
          status === "loading" || status === "idle" || status === "error"
        }
        onChange={(event) => dispatch(setWorkingBranch(event.target.value))}
      >
        {status !== "fulfilled" && (
          <MenuItem value="placeholder" dense>
            {status === "error"
              ? "Error loading branches!"
              : "Loading branches..."}
          </MenuItem>
        )}

        {branches &&
          branches.map((branch) => (
            <MenuItem value={branch.name} key={branch.name} dense>
              {branch.name}
            </MenuItem>
          ))}
      </Select>
    </Box>
  );
}
