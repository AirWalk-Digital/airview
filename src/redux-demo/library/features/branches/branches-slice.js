import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AirviewFetchError } from "../../util";

const baseBranch = "main"; // need to read this from a config

export const fetchBranches = createAsyncThunk(
  "branches/fetchBranches",
  async (arg, { signal, rejectWithValue }) => {
    try {
      const response = await fetch("/api/branches", {
        cache: "no-cache",
        signal,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new AirviewFetchError(response.status, data.message);
      }

      return data;
    } catch (error) {
      return rejectWithValue({ ...error });
    }
  }
);

const initialState = {
  status: "idle",
  error: null,
  workingBranch: baseBranch,
  branches: [],
};

export const branchesSlice = createSlice({
  name: "branches",
  initialState,
  reducers: {
    setWorkingBranch(state, action) {
      state.workingBranch = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchBranches.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchBranches.fulfilled, (state, action) => {
      state.branches.push(action.payload);
      state.status = "fulfilled";
    });
    builder.addCase(fetchBranches.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export const { setWorkingBranch } = branchesSlice.actions;
