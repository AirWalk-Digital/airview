import React from "react";
import { Navigate, Link as ReactRouterLink } from "react-router-dom";
import { useSetCmsContext } from "airview-cms";
import {
  PageTitle,
  AsideAndMainContainer,
  Aside,
  Main,
  Breadcrumb,
} from "airview-ui";
import { useGetBreadcrumbLinksData } from "./use-get-breadcrumb-links-data";
import { useGetEntryId } from "./use-get-entry-id";
import { TableOfContents } from "./table-of-contents";
import { DocumentContent } from "./document-content";

export function DocumentView() {
  const { entryId, path } = useGetEntryId();

  const { data, isError, error, isUninitialized, isLoading, isFetching } =
    useSetCmsContext({ entryId, path });

  const breadcrumbLinks = useGetBreadcrumbLinksData(data);

  if (isError && error.status === 404) {
    return <Navigate to="/not-found" replace={true} />;
  }

  return (
    <AsideAndMainContainer>
      <Main sx={{ width: "calc(100% - 300px)" }}>
        <Breadcrumb
          currentRoute={data.title ?? ""}
          loading={isLoading || isUninitialized}
          fetching={isFetching}
          links={breadcrumbLinks}
          sx={{ marginBottom: 4 }}
          linkComponent={ReactRouterLink}
        />
        <PageTitle
          title={data?.title ?? ""}
          loading={isLoading || isUninitialized}
          fetching={isFetching}
        />
        <DocumentContent
          loading={isLoading || isUninitialized}
          fetching={isFetching}
        />
      </Main>
      <Aside>
        <TableOfContents />
      </Aside>
    </AsideAndMainContainer>
  );
}
