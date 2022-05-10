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
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
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
  const [createPullRequest, { data, isLoading, isSuccess, isError, reset }] =
    useCreatePullRequestMutation();

  const isInvalidPr = baseBranch === workingBranch;

  const handleOnSubmit = () => {
    createPullRequest({
      baseBranch,
      headBranch: workingBranch,
    });
  };

  const handleOnClose = () => {
    if (isLoading) return;
    dispatch(disableCreatePullRequestModal());
  };

  const handleOnExited = () => {
    reset();
  };

  return (
    <Dialog
      open={dialogEnabled}
      fullWidth
      maxWidth="xs"
      onClose={handleOnClose}
      TransitionProps={{
        onExited: handleOnExited,
      }}
    >
      <DialogTitle>Create Pull request</DialogTitle>

      <DialogContent dividers>
        {isSuccess ? (
          <React.Fragment>
            <Typography paragraph>
              Your pull request has been successfully created, you can view the
              PR by following the link below.
            </Typography>

            <Button
              variant="contained"
              size="small"
              disableElevation
              component="a"
              href={data}
              target="_blank"
              startIcon={<OpenInNewIcon />}
            >
              View Pull Request
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {(isError || isInvalidPr) && (
              <Typography color="error" role="alert" paragraph>
                {isInvalidPr
                  ? 'Unable to create pull request, "from" branch must not equal "to" branch.'
                  : "Error: Unable to create pull request, please try again"}
              </Typography>
            )}

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
          </React.Fragment>
        )}
      </DialogContent>

      <DialogActions>
        {isSuccess ? (
          <Button variant="outlined" size="small" onClick={handleOnClose}>
            Close
          </Button>
        ) : (
          <React.Fragment>
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
              disabled={isLoading || isInvalidPr}
            >
              Create
            </Button>
          </React.Fragment>
        )}
      </DialogActions>
    </Dialog>
  );
}
