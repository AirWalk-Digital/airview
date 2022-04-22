import { useGetEntry } from "./use-get-entry";

export function Entry() {
  const collection = "release";
  const entry = "security_patch";

  const entryRequest = useGetEntry(collection, entry);

  if (
    entryRequest.status === "idle" ||
    (entryRequest.status === "loading" && !entryRequest.data)
  ) {
    return <p>Loading entry...</p>;
  }

  if (entryRequest.status === "error") {
    return <pre>{JSON.stringify(entryRequest.error, null, 2)}</pre>;
  }

  return (
    <div style={{ opacity: entryRequest.status === "loading" ? 0.5 : 1 }}>
      <pre>{JSON.stringify(entryRequest.data, null, 2)}</pre>
    </div>
  );
}
