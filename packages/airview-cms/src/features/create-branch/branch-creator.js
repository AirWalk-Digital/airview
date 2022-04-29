import React, { useState } from "react";
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
import { setActiveModalId } from "../editor/ui-slice";
import { fetchBranches, setWorkingBranch } from "../editor/branch-slice";
import { BRANCH_CREATOR_MODAL_ID } from "../../constants";

const initialState = {
  branchName: "",
  valid: undefined,
  errorMessage: null,
  submitting: false,
  success: false,
};

export function BranchCreatorModal() {
  const [state, setState] = useState({ ...initialState });
  const dispatch = useDispatch();

  const branches = useSelector((state) => state.branchesSlice.branches);

  const workingBranch = useSelector(
    (state) => state.branchesSlice.workingBranch
  );

  const workingBranchSha = branches?.find(
    (branch) => branch.name === workingBranch
  )?.sha;

  const activeModalId = useSelector((state) => state.uiSlice.activeModalId);

  const closeDialog = () => {
    if (state.submitting) return;
    dispatch(setActiveModalId(null));
  };

  const handleOnChange = (event) => {
    const input = event.target.value.trim();

    setState((prevState) => ({
      ...prevState,
      branchName: input,
      valid: new RegExp("^[a-z0-9_-]+$").test(input),
    }));
  };

  const cleanup = () => {
    if (state.success) {
      dispatch(fetchBranches());
      dispatch(setWorkingBranch(state.branchName));
    }

    setState({ ...initialState });
  };

  const createBranch = async () => {
    try {
      setState((prevState) => ({
        ...prevState,
        submitting: true,
        errorMessage: null,
        success: false,
      }));

      const response = await fetch("/api/branches", {
        method: "POST",
        body: JSON.stringify({
          sha: workingBranchSha,
          name: state.branchName,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to create branch, please try again.");
      }

      setState((prevState) => ({
        ...prevState,
        success: true,
      }));
      closeDialog();
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        errorMessage: error.message,
        submitting: false,
      }));
    }
  };

  return (
    <Dialog
      open={activeModalId === BRANCH_CREATOR_MODAL_ID}
      fullWidth
      maxWidth="xs"
      onClose={closeDialog}
      TransitionProps={{
        onExited: cleanup,
      }}
    >
      <DialogTitle>Create Branch</DialogTitle>
      <DialogContent dividers>
        <Typography>
          Branching from: <strong>{workingBranch}</strong>
        </Typography>

        {state.errorMessage && (
          <Typography color="error" role="alert" paragraph>
            Error: {state.errorMessage}
          </Typography>
        )}

        <Box component="form" noValidate autoComplete="off">
          <TextField
            name="branch-name"
            id="branch-name"
            label="Branch Name"
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            helperText="The branch name should contain no spaces and only use lowercase characters a to z, numbers 0 to 9, an undescore and hyphen"
            placeholder="my-branch-name"
            sx={{
              "& .MuiFormHelperText-root": {
                marginLeft: 0,
                marginRight: 0,
                marginTop: 1,
              },
            }}
            value={state.branchName}
            onChange={handleOnChange}
            error={state.valid === undefined || state.valid ? false : true}
            autoComplete="off"
            disabled={state.submitting}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          size="small"
          onClick={closeDialog}
          disabled={state.submitting}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          disableElevation
          onClick={createBranch}
          disabled={!state.valid || state.submitting || !workingBranchSha}
        >
          {state.submitting ? "Working..." : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function RevealBranchCreatorModalBtn() {
  const dispatch = useDispatch();
  const activeModalId = useSelector((state) => state.uiSlice.activeModalId);

  const handleOnClick = () =>
    dispatch(setActiveModalId(BRANCH_CREATOR_MODAL_ID));

  return (
    <Button
      variant="text"
      size="small"
      disabled={Boolean(activeModalId)}
      onClick={handleOnClick}
    >
      Create Branch
    </Button>
  );
}
