import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalEnabled: false,
};

export const createPullRequestSlice = createSlice({
  name: "createPullRequestSlice",
  initialState,
  reducers: {
    enableCreatePullRequestModal: (state) => {
      state.modalEnabled = true;
    },
    disableCreatePullRequestModal: (state) => {
      state.modalEnabled = false;
    },
  },
});

export const { enableCreatePullRequestModal, disableCreatePullRequestModal } =
  createPullRequestSlice.actions;

export const selectCreatePullRequestModalEnabledStatus = (state) =>
  state.createPullRequestSlice.modalEnabled;
