import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCmsContext } from "../cms.slice";
import { setMetaEditorInitialData, selectMetaEditorData } from "../meta-editor";
import { setBodyEditorContent } from "../body-editor";
import { useGetEntry } from "../../use-get-entry";

export function useSetCmsContext(entryId) {
  const dispatch = useDispatch();
  const metaEditorData = useSelector(selectMetaEditorData);

  useEffect(() => {
    dispatch(setCmsContext(entryId));
  }, [dispatch, entryId]);

  const {
    data: entryData,
    isUninitialized,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetEntry(entryId);

  useEffect(() => {
    if (!entryData) return;
    dispatch(setMetaEditorInitialData(entryData));
    dispatch(setBodyEditorContent(entryData));
  }, [dispatch, entryData]);

  return {
    data: metaEditorData,
    isUninitialized,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  };
}
