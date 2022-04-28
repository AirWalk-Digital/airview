import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeModalId: null,
};

export const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    setActiveModalId(state, action) {
      state.activeModalId = action.payload;
    },
  },
});

export const { setActiveModalId } = uiSlice.actions;
