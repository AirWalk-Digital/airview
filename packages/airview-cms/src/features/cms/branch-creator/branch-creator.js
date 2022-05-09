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
import { useCreateBranchMutation, useGetBranchesQuery } from "../../store";
import { selectWorkingBranch, setWorkingBranch } from "../toolbar";
import {
  selectBranchCreatorBranchName,
  selectBranchCreatorModalEnabledStatus,
  selectIsBranchCreatorBranchNameValid,
  disableBranchCreatorModal,
  setBranchName,
  clearBranchName,
} from "./branch-creator.slice";

export function BranchCreator() {
  const dispatch = useDispatch();
  const dialogEnabled = useSelector(selectBranchCreatorModalEnabledStatus);
  const workingBranch = useSelector(selectWorkingBranch);
  const branchName = useSelector(selectBranchCreatorBranchName);
  const validBranchName = useSelector(selectIsBranchCreatorBranchNameValid);
  const { data: branches } = useGetBranchesQuery();

  const workingBranchSha = branches?.find(
    (branch) => branch.name === workingBranch
  )?.sha;

  const isBranchNameUnique = () => {
    return branches?.find((branch) => branch.name === branchName)
      ? false
      : true;
  };

  const [
    createBranch,
    {
      isLoading: createBranchIsLoading,
      isError: createBranchIsError,
      error: createBranchError,
      reset: resetCreateBranch,
    },
  ] = useCreateBranchMutation();

  const handleOnClose = () => {
    dispatch(disableBranchCreatorModal());
  };

  const handleOnExit = () => {
    dispatch(clearBranchName());

    if (createBranchIsError) {
      resetCreateBranch();
    }
  };

  const handleOnSubmit = async () => {
    try {
      await createBranch({
        baseBranchSha: workingBranchSha,
        branchName,
      }).unwrap();
      dispatch(disableBranchCreatorModal());
      dispatch(setWorkingBranch(branchName));
    } catch {
      return;
    }
  };

  return (
    <Dialog
      open={dialogEnabled}
      fullWidth
      maxWidth="xs"
      onClose={handleOnClose}
      TransitionProps={{
        onExit: handleOnExit,
      }}
    >
      <DialogTitle>Create Branch</DialogTitle>
      <DialogContent dividers>
        <Typography>
          Branching from: <strong>{workingBranch}</strong>
        </Typography>

        {createBranchIsError && (
          <Typography color="error" role="alert" paragraph>
            Error:{" "}
            {createBranchError?.data?.message ??
              "Unable to create branch, please try again"}
          </Typography>
        )}

        <Box
          id="branchCreatorForm"
          component="form"
          noValidate
          autoComplete="off"
        >
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
            value={branchName}
            onChange={(event) => dispatch(setBranchName(event.target.value))}
            error={
              (!validBranchName && validBranchName !== undefined) ||
              !isBranchNameUnique()
            }
            autoComplete="off"
            disabled={createBranchIsLoading || !branches}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          size="small"
          onClick={handleOnClose}
          disabled={createBranchIsLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="branchCreatorForm"
          variant="contained"
          size="small"
          disableElevation
          onClick={handleOnSubmit}
          disabled={
            !validBranchName ||
            createBranchIsLoading ||
            !workingBranchSha ||
            !isBranchNameUnique()
          }
        >
          {createBranchIsLoading ? "Working..." : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
