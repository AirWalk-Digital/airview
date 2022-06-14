import { useMemo } from "react";
import { useParams } from "react-router-dom";

export function useGetEntryId() {
  const { collection, entry } = useParams();

  const selectedEntry = useMemo(() => {
    if (!collection || !entry) return "";

    return `${collection}/${entry}`;
  }, [collection, entry]);

  return selectedEntry;
}
