import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseBranch = "main"; // need to read this from a config

export const fetchBranches = createAsyncThunk(
  "branchesSlice/fetchBranches",
  async (arg, { signal, rejectWithValue }) => {
    try {
      const response = await fetch("/api/branches", {
        cache: "no-cache",
        signal,
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue({
          name: "Fetch Error",
          message: data.message,
          code: response.status,
        });
      }

      return data;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

const initialState = {
  status: "idle",
  error: null,
  baseBranch,
  workingBranch: baseBranch,
  branches: null,
};

export const branchesSlice = createSlice({
  name: "branchesSlice",
  initialState,
  reducers: {
    setWorkingBranch(state, action) {
      state.workingBranch = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchBranches.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchBranches.fulfilled, (state, action) => {
      state.branches = [...action.payload];
      state.status = "fulfilled";
    });
    builder.addCase(fetchBranches.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export const { setWorkingBranch } = branchesSlice.actions;
