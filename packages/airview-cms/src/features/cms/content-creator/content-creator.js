import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  selectContentCreatorModalEnabledStatus,
  disableContentCreatorModal,
} from "./content-creator.slice";
import { CollectionSelectorWidget, StringWidget } from "../widgets";

export function ContentCreator() {
  const dispatch = useDispatch();
  const dialogEnabled = useSelector(selectContentCreatorModalEnabledStatus);

  const handleOnClose = () => {
    dispatch(disableContentCreatorModal());
  };
  const handleOnExit = () => {};

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
      <DialogTitle>Create New</DialogTitle>
      <DialogContent dividers>
        <Box
          id="contentCreatorForm"
          component="form"
          noValidate
          autoComplete="off"
        >
          <StringWidget
            label="Title"
            value=""
            placeholder="Enter a title for this content"
            onChange={() => {}}
            required
          />
          <CollectionSelectorWidget />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          size="small"
          onClick={handleOnClose}
          //disabled={createBranchIsLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="branchCreatorForm"
          variant="contained"
          size="small"
          disableElevation
          //onClick={handleOnSubmit}
          // disabled={
          //   !validBranchName ||
          //   createBranchIsLoading ||
          //   !workingBranchSha ||
          //   !isBranchNameUnique()
          // }
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
