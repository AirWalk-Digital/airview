import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalEnabled: false,
};

export const branchCreatorSlice = createSlice({
  name: "branchCreatorSlice",
  initialState,
  reducers: {
    enableBranchCreatorModal: (state) => {
      state.modalEnabled = true;
    },
    disableBranchCreatorModal: (state) => {
      state.modalEnabled = false;
    },
  },
});

export const { enableBranchCreatorModal, disableBranchCreatorModal } =
  branchCreatorSlice.actions;

export const selectBranchCreatorModalEnabledStatus = (state) =>
  state.branchCreatorSlice.modalEnabled;
