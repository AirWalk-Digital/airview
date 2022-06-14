import React from "react";
import { Navigate } from "react-router-dom";
import { useSetCmsContext } from "airview-cms";
import { useGetEntryId } from "./use-get-entry-id";
import { LayoutContainer, LayoutMain, LayoutAside } from "./layout";
import { TableOfContents } from "./table-of-contents";
import { RelatedContent } from "./related-content";

export function DocumentView() {
  const entryId = useGetEntryId();

  const { isError, error } = useSetCmsContext(entryId);

  if (isError && error.type === 404) {
    return <Navigate to="/not-found" replace={true} />;
  }

  return (
    <LayoutContainer>
      <LayoutMain>
        <span>Main content</span>
      </LayoutMain>
      <LayoutAside>
        <TableOfContents />
        <RelatedContent />
      </LayoutAside>
    </LayoutContainer>
  );
}
