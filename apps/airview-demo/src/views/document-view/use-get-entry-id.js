import { useMemo } from "react";
import { useParams } from "react-router-dom";
//import { useLocation } from "react-router-dom";

export function useGetEntryId() {
  // const location = useLocation();
  // return location.pathname;

  const params = useParams();
  const path = params["*"];

  const entry = useMemo(() => {
    if (!params.collection || !params.entry) return "";

    return { collection: params.collection, entry: params.entry, path };
  }, [params.collection, params.entry, path]);

  return entry;
}
