import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setActiveModalId } from "./ui-slice";
import { BRANCH_SWITCHER_MODAL_ID } from "../../constants";

export function SwitchBranch() {
  const dispatch = useDispatch();
  const uiSlice = useSelector((state) => state.uiSlice);
  const closeDialog = () => dispatch(setActiveModalId(null));

  return (
    <Dialog
      open={uiSlice.activeModalId === BRANCH_SWITCHER_MODAL_ID}
      fullWidth
      maxWidth="xs"
      onClose={closeDialog}
    >
      <DialogTitle>Switch Branch</DialogTitle>
      <DialogContent>
        <BranchSelector />
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={closeDialog}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function BranchSelector() {
  //const dispatch = useDispatch();
  //const branchesSlice = useSelector((state) => state.branchesSlice);
  //const { status, workingBranch, branches } = branchesSlice;

  // if (status === "idle" || (status === "loading" && !branches)) {
  //   return <DialogContentText>Loading branches...</DialogContentText>;
  // }

  // if (status === "error") {
  //   return <DialogContentText>Error</DialogContentText>;
  // }

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        //value={age}
        label="Age"
        //onChange={handleChange}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
}
