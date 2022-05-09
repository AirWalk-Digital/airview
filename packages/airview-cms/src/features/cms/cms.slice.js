import { createSlice } from "@reduxjs/toolkit";
import { resetWorkingBranch } from "./toolbar";

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

export const { enableCms } = cmsSlice.actions;

export const selectCmsEnabledStatus = (state) => state.cmsSlice.cmsEnabled;

/* create thunk for disable CMS
- check we have edits, if true show pop-up before we continue
- switch branch to main
*/

export function disableCms() {
  return (dispatch) => {
    dispatch(cmsSlice.actions.disableCms());
    dispatch(resetWorkingBranch());
  };
}
