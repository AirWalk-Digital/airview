import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setMetaEditorToIsLoading,
  setMetaEditorToIsSuccess,
  setMetaEditorToIsError,
} from "../meta-editor";
import { useGetEntry } from "../../use-get-entry";

export function useSetCmsContext(entryId) {
  const dispatch = useDispatch();

  const {
    data: entryData,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetEntry(entryId);

  useEffect(() => {
    if (!isLoading) return;
    dispatch(setMetaEditorToIsLoading());
  }, [dispatch, isLoading]);

  useEffect(() => {
    if (!isFetching) return;
    dispatch(setMetaEditorToIsLoading());
  }, [dispatch, isFetching]);

  useEffect(() => {
    if (!isSuccess || isFetching) return;

    const data = entryData?.["_index"]?.data;

    dispatch(setMetaEditorToIsSuccess(data));
  }, [dispatch, isSuccess, isFetching, entryData]);

  useEffect(() => {
    if (!isError) return;
    dispatch(setMetaEditorToIsError(error));
  }, [dispatch, isError, error]);
}
