import { useGetAllEntriesMeta } from "airview-cms";
import { DataOutput } from "../components";

export function AllEntriesMeta() {
  const { data, isLoading, isFetching, isError, error } =
    useGetAllEntriesMeta();

  return (
    <DataOutput
      title="All Entries Meta"
      {...{ isLoading, isFetching, isError, error, data }}
    />
  );
}
