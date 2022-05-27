import { useGetSiblingEntriesMeta } from "airview-cms";

export function SiblingEntries() {
  const { data, isLoading, isFetching, isError } = useGetSiblingEntriesMeta(
    "knowledge/composing_a_new_message"
  );

  if (isLoading || isFetching)
    return <div>Fetching sibling entries meta...</div>;

  if (isError) return <div>Error fetching sibling entries meta</div>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
