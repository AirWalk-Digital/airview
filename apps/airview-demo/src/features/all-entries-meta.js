import { useGetAllEntriesMeta } from "airview-cms";

export function AllEntriesMeta() {
  const { data, isLoading, isFetching, isError } = useGetAllEntriesMeta();

  if (isLoading || isFetching) return <div>Fetching all entries meta...</div>;

  if (isError) return <div>Error fetching all entries meta</div>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
