import { useGetChildEntriesMeta } from "airview-cms";
import { DataOutput } from "../components";

export function ChildEntriesMeta({ entryId }) {
  const { data, isLoading, isFetching, isError, error } =
    useGetChildEntriesMeta(entryId);

  return (
    <DataOutput
      title="Child Entries Meta"
      {...{ isLoading, isFetching, isError, error, data }}
    />
  );
}
