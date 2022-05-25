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
  setInitialCollection,
} from "./content-creator.slice";
import { CollectionSelector } from "./collection-selector";
import { FormFields } from "./form-fields";

export function ContentCreator() {
  const dispatch = useDispatch();
  const dialogEnabled = useSelector(selectContentCreatorModalEnabledStatus);

  const handleOnClose = () => {
    dispatch(disableContentCreatorModal());
  };

  return (
    <Dialog
      open={dialogEnabled}
      fullWidth
      maxWidth="xs"
      onClose={handleOnClose}
      TransitionProps={{
        onExited: () => dispatch(setInitialCollection()),
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
          <CollectionSelector />
          <FormFields />
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
