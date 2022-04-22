import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AirviewFetchError } from "../../util";

const baseBranch = "main"; // need to read this from a config

export const fetchAllEntriesMeta = createAsyncThunk(
  "entriesMeta/fetchEntriesMeta",
  async (
    { branchSha, workingBranch },
    { getState, signal, rejectWithValue }
  ) => {
    try {
      console.log("fetching");
      const response = await fetch(
        branchSha
          ? `/api/entries/${workingBranch}?${branchSha}`
          : `/api/entries/${workingBranch}`
      );

      const entriesMetaData = await response.json();

      if (!response.ok) {
        throw new AirviewFetchError(response.status, entriesMetaData.message);
      }

      return entriesMetaData;
    } catch (error) {
      return rejectWithValue({ ...error });
    }
  }
);

const initialState = {
  status: "idle",
  error: null,
  entriesMeta: [],
};

export const entriesMetaSlice = createSlice({
  name: "entriesMeta",
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchAllEntriesMeta.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllEntriesMeta.fulfilled, (state, action) => {
      state.entriesMeta.splice(0, state.entriesMeta.length);
      state.entriesMeta.push(action.payload);
      state.status = "fulfilled";
    });
    builder.addCase(fetchAllEntriesMeta.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});
