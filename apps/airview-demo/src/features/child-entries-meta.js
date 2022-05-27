import { useGetChildEntriesMeta } from "airview-cms";
import { DataOutput } from "../components";

export function ChildEntriesMeta() {
  const { data, isLoading, isFetching, isError, error } =
    useGetChildEntriesMeta("application/ms_teams");

  return (
    <DataOutput
      title="Child Entries Meta"
      {...{ isLoading, isFetching, isError, error, data }}
    />
  );
}
