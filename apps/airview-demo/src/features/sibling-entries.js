import { useGetSiblingEntriesMeta } from "airview-cms";
import { DataOutput } from "../components";

export function SiblingEntries({ entryId }) {
  const { data, isLoading, isFetching, isError, error } =
    useGetSiblingEntriesMeta(entryId);

  return (
    <DataOutput
      title="Sibling Entries Meta"
      {...{ isLoading, isFetching, isError, error, data }}
    />
  );
}
