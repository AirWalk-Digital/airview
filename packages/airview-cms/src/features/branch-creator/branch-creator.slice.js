import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalEnabled: false,
  branchName: "",
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
    setBranchName: {
      reducer: (state, action) => {
        state.branchName = action.payload;
      },
      prepare: (value) => {
        return { payload: value.trim() };
      },
    },
    clearBranchName: (state) => {
      state.branchName = "";
    },
  },
});

export const {
  enableBranchCreatorModal,
  disableBranchCreatorModal,
  setBranchName,
  clearBranchName,
} = branchCreatorSlice.actions;

export const selectBranchCreatorModalEnabledStatus = (state) =>
  state.branchCreatorSlice.modalEnabled;

export const selectBranchCreatorBranchName = (state) =>
  state.branchCreatorSlice.branchName;

export const selectIsBranchCreatorBranchNameValid = (state) => {
  const requestedBranchName = state.branchCreatorSlice.branchName;

  if (!requestedBranchName) {
    return undefined;
  }

  return new RegExp("^[a-z0-9_-]+$").test(requestedBranchName);
};
