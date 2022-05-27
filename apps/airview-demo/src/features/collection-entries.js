import { useGetCollectionEntries } from "airview-cms";

// REQUIRES hook to get collections

export function CollectionEntries() {
  const { data, isLoading, isFetching, isError } =
    useGetCollectionEntries("knowledge");

  if (isLoading || isFetching)
    return <div>Fetching collection entries meta...</div>;

  if (isError) return <div>Error fetching collection entries meta</div>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
