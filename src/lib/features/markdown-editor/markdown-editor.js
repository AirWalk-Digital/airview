import React from "react";
import { useGetEntryBody } from "../use-get-entry-body";
import { useGetAirviewStoreContext } from "../airview-store";

export function MarkdownEditor({ file }) {
  const context = useGetAirviewStoreContext();

  const { data } = useGetEntryBody(context);

  if (!data) {
    return null;
  }

  return <div>{data[file]?.content}</div>;
}
