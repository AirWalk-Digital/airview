import { createSlice } from "@reduxjs/toolkit";
import { resetWorkingBranch } from "./toolbar";
import { selectDoesMetaEditorHaveEdits } from "./meta-editor";

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

export function disableCms() {
  return (dispatch, getState) => {
    const metaEdits = selectDoesMetaEditorHaveEdits(getState());

    const runDisableActions = () => {
      dispatch(cmsSlice.actions.disableCms());
      dispatch(resetWorkingBranch());
    };

    if (metaEdits) {
      if (
        confirm(
          "You have unsaved changes; if you continue, your changes will be lost. Continue?"
        )
      ) {
        runDisableActions();
      } else {
        return;
      }
    }

    runDisableActions();
  };
}
