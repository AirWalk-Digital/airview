import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectWorkingBranch } from "../toolbar";
import {
  selectBranchCreatorModalEnabledStatus,
  disableBranchCreatorModal,
} from "./branch-creator.slice";

export function BranchCreator() {
  const dispatch = useDispatch();
  const dialogEnabled = useSelector(selectBranchCreatorModalEnabledStatus);
  const workingBranch = useSelector(selectWorkingBranch);

  const handleOnClose = () => {
    dispatch(disableBranchCreatorModal());
  };

  return (
    <Dialog
      open={dialogEnabled}
      fullWidth
      maxWidth="xs"
      onClose={handleOnClose}
      TransitionProps={{
        onExited: () => {},
      }}
    >
      <DialogTitle>Create Branch</DialogTitle>
      <DialogContent dividers>
        <Typography>
          Branching from: <strong>{workingBranch}</strong>
        </Typography>

        {/*state.errorMessage && (
          <Typography color="error" role="alert" paragraph>
            Error: 
          </Typography>
        )*/}

        <Box component="form" noValidate autoComplete="off">
          <TextField
            name="branch-name"
            id="branch-name"
            label="Branch Name"
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            helperText="The branch name should be unique, contain no spaces and only use lowercase characters a to z, numbers 0 to 9, an undescore and hyphen"
            placeholder="my-branch-name"
            sx={{
              "& .MuiFormHelperText-root": {
                marginLeft: 0,
                marginRight: 0,
                marginTop: 1,
              },
            }}
            value=""
            onChange={() => {}}
            error={false}
            autoComplete="off"
            disabled={false}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          size="small"
          onClick={handleOnClose}
          disabled={false}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          disableElevation
          onClick={() => {}}
          disabled={false}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
