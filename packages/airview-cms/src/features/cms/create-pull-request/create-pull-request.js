import React from "react";
import PropTypes from "prop-types";
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
import { FontAwesomeSvgIcon } from "@components";
import {
  faCodeBranch,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
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
              startIcon={<FontAwesomeSvgIcon icon={faArrowUpRightFromSquare} />}
            >
              View Pull Request
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {(isError || isInvalidPr) && (
              <Typography color="error" role="alert" paragraph>
                {isInvalidPr
                  ? "Error: Unable to create pull request, branches must not match"
                  : "Error: Unable to create pull request, please try again"}
              </Typography>
            )}

            <BranchLabel label="From:" branchName={workingBranch} />
            <BranchLabel
              label="To:"
              branchName={baseBranch}
              bottomMargin={false}
            />
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

function BranchLabel({ label, branchName, bottomMargin = true }) {
  return (
    <Paper
      variant="outlined"
      sx={{ mb: bottomMargin ? 2 : 0, display: "flex" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: "0 0 auto",
          bgcolor: "grey.200",
          px: 1,
          py: 1,
        }}
      >
        <FontAwesomeSvgIcon
          icon={faCodeBranch}
          fontSize="small"
          sx={{
            color: "grey.800",
          }}
        />
      </Box>
      <Box sx={{ flexGrow: 1, px: 1, py: 1 }}>
        <Typography sx={{ lineHeight: 1.2 }}>
          <Box component="strong" sx={{ display: "block", fontSize: 14 }}>
            {label}
          </Box>{" "}
          {branchName}
        </Typography>
      </Box>
    </Paper>
  );
}

BranchLabel.propTypes = {
  label: PropTypes.string.isRequired,
  branchName: PropTypes.string.isRequired,
  bottomMargin: PropTypes.bool,
};
