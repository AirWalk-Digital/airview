import React from "react";

export function PrintJson({ data }) {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
