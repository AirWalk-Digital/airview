import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { setWorkingBranch, fetchBranches } from "./branch-slice";
import { version } from "../../../package.json";

export function TopBar() {
  return (
    <AppBar
      color="transparent"
      sx={{
        boxShadow: 0,
        borderBottom: 1,
        borderColor: "grey.300",
      }}
    >
      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: "grey.300",
          bgcolor: "grey.50",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flex: "1 1 auto",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                variant="h6"
                component="h1"
                sx={{
                  color: "primary.main",
                  lineHeight: 1,
                }}
              >
                Airview CMS
              </Typography>
              <Typography
                variant="caption"
                component="span"
                sx={{
                  color: "text.primary",
                  display: "block",
                  lineHeight: 1.2,
                  textTransform: "uppercase",
                  fontSize: 11,
                }}
              >
                Version: {version}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              flex: "0 1 auto",
              "& > .MuiButton-root": {
                marginLeft: (theme) => theme.spacing(2),
              },
            }}
          >
            <Button variant="contained" disableElevation size="small">
              Create New
            </Button>
            <Button variant="contained" disableElevation size="small">
              Exit
            </Button>
          </Box>
        </Box>
      </Toolbar>
      <Toolbar
        variant="dense"
        sx={{
          bgcolor: "common.white",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            flex: "1 1 auto",
          }}
        >
          <BranchSwitcher />
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            justifyContent: "flex-end",
            "& > .MuiButton-root": {
              marginLeft: (theme) => theme.spacing(1),
            },
          }}
        >
          {/*<Button
            variant="text"
            size="small"
            disabled={Boolean(uiSlice.activeModalId)}
            onClick={() => dispatch(setActiveModalId(BRANCH_SWITCHER_MODAL_ID))}
          >
            Switch Branch
          </Button>*/}
          <Button variant="text" size="small">
            Create Branch
          </Button>
          <Button variant="text" size="small">
            Create Pull Request
          </Button>
          <Button variant="text" size="small" color="error">
            Clear Changes
          </Button>
          <Button variant="text" size="small">
            Save Changes
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function BranchSwitcher() {
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
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={getValue()}
      sx={{
        height: 25,
        "& .MuiSelect-select": {
          fontSize: 13,
          paddingTop: 1,
          paddingBottom: 1,
        },
      }}
      disabled={status === "loading" || status === "idle" || status === "error"}
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
  );
}
