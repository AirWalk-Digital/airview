import { useGetChildEntriesMeta } from "airview-cms";

export function ChildEntriesMeta() {
  const { data, isLoading, isFetching, isError } = useGetChildEntriesMeta(
    "application/ms_teams"
  );

  if (isLoading || isFetching) return <div>Fetching child entries meta...</div>;

  if (isError) return <div>Error fetching child entries meta</div>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
