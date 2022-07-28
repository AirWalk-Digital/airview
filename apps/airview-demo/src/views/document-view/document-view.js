import React from "react";
import { Navigate } from "react-router-dom";
import { useSetCmsContext } from "airview-cms";
import {
  PageTitle,
  AsideAndMainContainer,
  Aside,
  Main,
  Breadcrumb,
} from "airview-ui";
import { useGetEntryId } from "./use-get-entry-id";
import { TableOfContents } from "./table-of-contents";
import { DocumentContent } from "./document-content";

export function DocumentView() {
  const entryId = useGetEntryId();

  const { data, isError, error, isLoading, isFetching } =
    useSetCmsContext(entryId);

  if (isError && error.type === 404) {
    return <Navigate to="/not-found" replace={true} />;
  }

  return (
    <AsideAndMainContainer>
      <Main>
        <Breadcrumb
          currentRoute={data.title}
          loading={isLoading}
          fetching={isFetching}
          links={[]}
          sx={{ marginBottom: 4 }}
        />
        <PageTitle
          title={data?.title ?? ""}
          loading={isLoading}
          fetching={isFetching}
        />
        <DocumentContent loading={false} fetching={false} />
      </Main>
      <Aside>
        <TableOfContents />
      </Aside>
    </AsideAndMainContainer>
  );
}
