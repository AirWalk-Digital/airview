import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  disableCreatePullRequestModal,
  selectCreatePullRequestModalEnabledStatus,
} from "./create-pull-request.slice";
import { selectBaseBranch, selectWorkingBranch } from "../toolbar";
import { useCreatePullRequestMutation } from "../../store";

export function CreatePullRequest() {
  const dispatch = useDispatch();
  const dialogEnabled = useSelector(selectCreatePullRequestModalEnabledStatus);
  const baseBranch = useSelector(selectBaseBranch);
  const workingBranch = useSelector(selectWorkingBranch);
  const [createPullRequest, { isLoading, isError, error }] =
    useCreatePullRequestMutation();

  const isValidPr = baseBranch !== workingBranch;

  const handleOnSubmit = async () => {
    try {
      await createPullRequest({
        baseBranch,
        headBranch: workingBranch,
      }).unwrap();
      dispatch(disableCreatePullRequestModal());
    } catch {
      return;
    }
  };

  const handleOnClose = () => {
    if (isLoading) return;
    dispatch(disableCreatePullRequestModal());
  };

  return (
    <Dialog
      open={dialogEnabled}
      fullWidth
      maxWidth="xs"
      onClose={handleOnClose}
    >
      <DialogTitle>Create Pull request</DialogTitle>
      <DialogContent dividers>
        {isError ||
          (!isValidPr && (
            <Typography color="error" role="alert" paragraph>
              {!isValidPr
                ? "Unable to create pull request, from branch must not equal to branch."
                : error?.data?.message ??
                  "Error: Unable to create pull request, please try again"}
            </Typography>
          ))}

        <Paper variant="outlined" sx={{ px: 2, py: 1, mb: 2 }}>
          <Typography sx={{ lineHeight: 1.2 }}>
            <Box component="strong" sx={{ display: "block" }}>
              From:
            </Box>{" "}
            {workingBranch}
          </Typography>
        </Paper>

        <Paper variant="outlined" sx={{ px: 2, py: 1 }}>
          <Typography sx={{ lineHeight: 1.2 }}>
            <Box component="strong" sx={{ display: "block" }}>
              To:
            </Box>{" "}
            {baseBranch}
          </Typography>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          size="small"
          onClick={handleOnClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          disableElevation
          onClick={handleOnSubmit}
          disabled={isLoading || !isValidPr}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
