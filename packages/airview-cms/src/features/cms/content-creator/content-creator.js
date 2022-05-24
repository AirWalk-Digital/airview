import React, { useEffect } from "react";
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
  selectContentCreatorSelectedCollection,
  disableContentCreatorModal,
  setInitialCollection,
  setCollection,
  setInitialData,
  selectContentCreatorData,
  persitData,
} from "./content-creator.slice";
import { CollectionSelectorWidget, DynamicWidget } from "../widgets";
import { selectAllCollections } from "../config-slice";

export function ContentCreator() {
  const dispatch = useDispatch();
  const dialogEnabled = useSelector(selectContentCreatorModalEnabledStatus);
  const selectedCollection = useSelector(
    selectContentCreatorSelectedCollection
  );
  const collectionsData = useSelector(selectAllCollections);
  const collectionsFields = collectionsData[selectedCollection]?.fields;
  const formData = useSelector(selectContentCreatorData);

  console.log("collectionsFields", collectionsFields);
  console.log("formData", formData);

  const handleOnClose = () => {
    dispatch(disableContentCreatorModal());
  };

  useEffect(() => {
    dispatch(setInitialCollection());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setInitialData());
  }, [selectedCollection, dispatch]);

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
          <CollectionSelectorWidget
            value={selectedCollection}
            onChange={(collection) => dispatch(setCollection(collection))}
          />
          {selectedCollection
            ? collectionsFields.map((collectionFieldData) => {
                return (
                  <DynamicWidget
                    key={collectionFieldData.name}
                    fieldData={collectionFieldData}
                    value={formData[collectionFieldData.name]}
                    onChange={(value) =>
                      dispatch(
                        persitData({
                          key: collectionFieldData.name,
                          data: value,
                        })
                      )
                    }
                  />
                );
              })
            : null}
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
