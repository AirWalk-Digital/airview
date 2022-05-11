import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCmsContext } from "../cms.slice";
import { setMetaEditorInitialData } from "../meta-editor";
import { useGetEntry } from "../../use-get-entry";

export function useSetCmsContext(entryId) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCmsContext(entryId));
  }, [dispatch, entryId]);

  const { data: entryData } = useGetEntry(entryId);

  useEffect(() => {
    const data = entryData?.["_index"]?.data ?? {};

    dispatch(setMetaEditorInitialData(data));
  }, [dispatch, entryData]);

  // return the edits data for a user to user
}
