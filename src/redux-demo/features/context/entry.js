import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import matter from "gray-matter";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { airviewApi, useGetEntryQuery, useLazyGetEntryQuery } from "../api";

const set = require("lodash/set");

const initialState = {
  status: "idle",
  error: null,
  id: null,
  originalData: null,
  editsData: null,
};

export const fetchContextData = createAsyncThunk(
  "entry/fetchEntryData",
  async ({ id, branch }, { signal, rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`/api/content/${id}/${branch}`, {
        signal,
      });

      const data = await response.json();

      if (response.ok) {
        const parsedMarkdown = Object.entries(data).map(([key, entryData]) => {
          const { data, content } = matter(atob(entryData));

          return [key, { data, content }];
        });

        return Object.fromEntries(parsedMarkdown);
      }

      console.log("error", data);
    } catch (error) {
      return rejectWithValue({ ...error });
    }
  }
);

export const contextSlice = createSlice({
  name: "context",
  initialState,
  reducers: {
    setContextId(state, action) {
      state.id = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setContextData(state, action) {
      state.originalData = action.payload;
      state.editsData = action.payload;
    },
    persistEdits(state, action) {
      const { path, value } = action.payload;

      set(state.editsData, path, value);
    },
    clearEdits(state) {
      state.editsData = state.originalData;
    },
    resetContextState(state) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContextData.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchContextData.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.originalData = action.payload;
      state.editsData = action.payload;
    });
    builder.addCase(fetchContextData.rejected, (state, action) => {
      if (action.meta.aborted) {
        return;
      }

      state.status = "failed";
      state.error = action.payload;
    });
  },
});

const {
  setStatus,
  setError,
  setContextId,
  setContextData,
  persistEdits,
  clearEdits,
  resetContextState,
} = contextSlice.actions;

export { persistEdits, clearEdits };

export function useGetContext(id) {
  const {
    editsData: data,
    status,
    error,
  } = useSelector((state) => state.context);

  console.log(airviewApi);

  const dispatch = useDispatch();

  // const {
  //   status: queryStatus,
  //   data: queryData,
  //   error: queryError,
  // } = useGetEntryQuery({ id, branch: "main" });

  const [trigger, { status: queryStatus, data: queryData, error: queryError }] =
    useLazyGetEntryQuery();

  useEffect(() => {
    if (!id) return;

    const request = trigger({ id, branch: "main" });
    dispatch(setContextId(id));

    return () => {
      request.abort();
      // -> {name: 'AbortError', message: 'Aborted'}
    };
  }, [dispatch, id, trigger]);

  useEffect(() => {
    dispatch(setStatus(queryStatus));
  }, [dispatch, queryStatus]);

  useEffect(() => {
    dispatch(setError(queryError));
  }, [dispatch, queryError]);

  useEffect(() => {
    dispatch(setContextData(queryData));
  }, [dispatch, queryData]);

  // useEffect(() => {
  //   return () => dispatch(resetContextState());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(setContextId(id));
  //   const entryRequest = dispatch(fetchContextData({ id, branch: "main" }));

  //   return () => {
  //     entryRequest.abort();
  //   };
  // }, [dispatch, id]);

  return { data, status, error };
}
