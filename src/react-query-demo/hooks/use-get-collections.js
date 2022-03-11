import { useMemo } from "react";
import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetCollections() {
  const { status, data: entriesMeta, error } = useGetAllEntriesMeta();

  const collections = useMemo(() => {
    if (!entriesMeta) return;

    return entriesMeta.reduce((prevValue, currentValue) => {
      if (prevValue.includes(currentValue?.collection)) return prevValue;

      return [...prevValue, currentValue?.collection];
    }, []);
  }, [entriesMeta]);

  if (entriesMeta) {
    return {
      status,
      data: collections,
    };
  }

  if (status === "error") {
    return {
      status,
      message: error.message,
    };
  }

  return {
    status,
  };
}
