import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  DialogContentText,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { usePutEntryMutation } from "../../store";
import {
  selectContentCreatorModalEnabledStatus,
  disableContentCreatorModal,
  setInitialCollection,
} from "./content-creator.slice";
import { CollectionSelector } from "./collection-selector";
import { FormFields } from "./form-fields";
import { prepareEntryPayload } from "./prepare-entry-payload";
import { PUT_ENTRY_FIXED_CACHE_KEY } from "./constants";

export function ContentCreator() {
  const dispatch = useDispatch();
  const dialogEnabled = useSelector(selectContentCreatorModalEnabledStatus);
  const [putEntry, { isLoading, isError, error }] = usePutEntryMutation({
    fixedCacheKey: PUT_ENTRY_FIXED_CACHE_KEY,
  });

  const closeModal = () => {
    dispatch(disableContentCreatorModal());
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const payload = dispatch(prepareEntryPayload());

    try {
      await putEntry(payload).unwrap();
      closeModal();
    } catch {
      return;
    }
  };

  return (
    <Dialog
      open={dialogEnabled}
      fullWidth
      maxWidth="xs"
      onClose={closeModal}
      TransitionProps={{
        onExited: () => dispatch(setInitialCollection()),
      }}
    >
      <DialogTitle>Create New</DialogTitle>
      <DialogContent dividers>
        {isError && (
          <DialogContentText color="error" role="alert">
            <strong>Error: </strong>
            {error?.data?.message ?? "Unable to create entry, please try again"}
          </DialogContentText>
        )}

        <DialogContentText variant="body1" color="text.primary">
          <strong>Note:</strong> fields marked with an asterisk are required
        </DialogContentText>

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
          onClick={closeModal}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          form="contentCreatorForm"
          variant="contained"
          size="small"
          disableElevation
          onClick={handleOnSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Working..." : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
