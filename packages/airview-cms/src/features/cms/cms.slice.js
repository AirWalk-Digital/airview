import { createSlice } from "@reduxjs/toolkit";
import { resetWorkingBranch } from "./toolbar";

const initialState = {
  cmsEnabled: false,
  cmsContext: null,
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
    setCmsContext: (state, action) => {
      state.cmsContext = action.payload;
    },
  },
});

export const { enableCms, setCmsContext } = cmsSlice.actions;

export const selectCmsEnabledStatus = (state) => state.cmsSlice.cmsEnabled;

export const selectCmsContext = (state) => state.cmsSlice.cmsContext;

// check we have edits, if true show pop-up before we continue
export function disableCms() {
  return (dispatch) => {
    dispatch(cmsSlice.actions.disableCms());
    dispatch(resetWorkingBranch());
  };
}
