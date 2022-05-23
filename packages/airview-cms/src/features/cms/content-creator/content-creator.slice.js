import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalEnabled: false,
};

export const contentCreatorSlice = createSlice({
  name: "contentCreatorSlice",
  initialState,
  reducers: {
    enableContentCreatorModal: (state) => {
      state.modalEnabled = true;
    },
    disableContentCreatorModal: (state) => {
      state.modalEnabled = false;
    },
  },
});

export const { enableContentCreatorModal, disableContentCreatorModal } =
  contentCreatorSlice.actions;

export const selectContentCreatorModalEnabledStatus = (state) =>
  state.contentCreatorSlice.modalEnabled;
