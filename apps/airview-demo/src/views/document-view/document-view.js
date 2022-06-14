import React from "react";
import { Navigate } from "react-router-dom";
import { useSetCmsContext } from "airview-cms";
import { PageTitle } from "airview-ui";
import { useGetEntryId } from "./use-get-entry-id";
import { LayoutContainer, LayoutMain, LayoutAside } from "./layout";
import { TableOfContents } from "./table-of-contents";
import { RelatedContent } from "./related-content";

export function DocumentView() {
  const entryId = useGetEntryId();

  const { data, isError, error, isLoading, isFetching } =
    useSetCmsContext(entryId);

  if (isError && error.type === 404) {
    return <Navigate to="/not-found" replace={true} />;
  }

  return (
    <LayoutContainer>
      <LayoutMain>
        <PageTitle
          title={data?.title ?? ""}
          loading={isLoading}
          fetching={isFetching}
        />
      </LayoutMain>
      <LayoutAside>
        <TableOfContents />
        {/* <RelatedContent /> */}
      </LayoutAside>
    </LayoutContainer>
  );
}
