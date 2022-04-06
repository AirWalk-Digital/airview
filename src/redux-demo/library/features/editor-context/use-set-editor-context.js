import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setContextId,
  setStatus,
  setError,
  setContextData,
  resetContextState,
} from "./editor-context-slice";
import { useGetEntry } from "../entry";

export function useSetEditorContext(id) {
  const dispatch = useDispatch();

  const {
    editsData: data,
    status,
    error,
  } = useSelector((state) => state.editorContext);

  useEffect(() => {
    dispatch(resetContextState());
  }, [dispatch, id]);

  useEffect(() => {
    return () => dispatch(resetContextState());
  }, [dispatch]);

  const {
    status: entryQueryStatus,
    data: entryQueryData,
    error: entryQueryError,
  } = useGetEntry(id);

  useEffect(() => {
    dispatch(setContextId(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!entryQueryStatus) return;
    dispatch(setStatus(entryQueryStatus));
  }, [dispatch, entryQueryStatus]);

  useEffect(() => {
    if (!entryQueryError) return;
    dispatch(setError(entryQueryError));
  }, [dispatch, entryQueryError]);

  useEffect(() => {
    if (!entryQueryData) return;
    dispatch(setContextData(entryQueryData));
  }, [dispatch, entryQueryData]);

  return { data, status, error };
}
