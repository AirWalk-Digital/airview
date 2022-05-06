import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cmsEnabled: false,
};

export const cmsSlice = createSlice({
  name: "cmsSlice",
  initialState,
  reducers: {
    enableCms: (state) => {
      state.cmsEnabled = true;
    },
    disableCms: (state) => {
      state.cmsEnabled = false;
    },
  },
});

export const { enableCms, disableCms } = cmsSlice.actions;

export const selectCmsEnabledStatus = (state) => state.cmsSlice.cmsEnabled;
