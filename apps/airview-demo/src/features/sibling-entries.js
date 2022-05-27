import { useGetSiblingEntriesMeta } from "airview-cms";
import { DataOutput } from "../components";

export function SiblingEntries() {
  const { data, isLoading, isFetching, isError, error } =
    useGetSiblingEntriesMeta("knowledge/composing_a_new_message");

  return (
    <DataOutput
      title="Sibling Entries Meta"
      {...{ isLoading, isFetching, isError, error, data }}
    />
  );
}
