import { useGetCollectionEntries } from "airview-cms";
import { DataOutput } from "../components";

// REQUIRES hook to get collections

export function CollectionEntries() {
  const { data, isLoading, isFetching, isError, error } =
    useGetCollectionEntries("knowledge");

  return (
    <DataOutput
      title="Collection Entries"
      {...{ isLoading, isFetching, isError, error, data }}
    />
  );
}
