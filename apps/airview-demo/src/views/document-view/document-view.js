import React, { useRef } from "react";
import { Navigate, Link as ReactRouterLink } from "react-router-dom";
import { useSetCmsContext, useCMSViewportOffset } from "airview-cms";
import {
  PageTitle,
  AsideAndMainContainer,
  Aside,
  Main,
  Breadcrumb,
  DocumentActions,
} from "airview-ui";
import { useHtmlToPdfUtil } from "airview-html-to-pdf-util";
import { useGetBreadcrumbLinksData } from "./use-get-breadcrumb-links-data";
import { useGetEntryId } from "./use-get-entry-id";
import { DocumentContent } from "./document-content";
import { ExternalDocumentContent } from "./external-document-content";

/* eslint import/no-webpack-loader-syntax: off */
import css from "!!raw-loader!../../print.css";

export function DocumentView() {
  const { entryId, path } = useGetEntryId();
  const { print, ...status } = useHtmlToPdfUtil(entryId);

  const contentsRef = useRef();

  const { data, isError, error, isUninitialized, isLoading, isFetching } =
    useSetCmsContext({ entryId, path });

  const cmsEnabled = useCMSViewportOffset();

  const breadcrumbLinks = useGetBreadcrumbLinksData(data);

  if (isError && error.status === 404) {
    return <Navigate to="/not-found" replace={true} />;
  }

  const hasExternalContent = "external_repo" in data;

  const renderExternalContent = hasExternalContent && !cmsEnabled;

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
        <div>
          <div ref={contentsRef}>
            <PageTitle
              title={data?.title ?? ""}
              loading={isLoading || isUninitialized}
              fetching={isFetching}
            />
            <DocumentContent
              loading={isLoading || isUninitialized}
              fetching={isFetching}
            />
            {renderExternalContent && (
              <div>
                <div>
                  &nbsp; <br />{" "}
                </div>
                <ExternalDocumentContent
                  loading={isLoading || isUninitialized}
                  fetching={isFetching}
                  metadata={data}
                />
              </div>
            )}
          </div>
        </div>
      </Main>
      <Aside>
        <DocumentActions
          menuTitle="Document Actions"
          loading={isLoading || isUninitialized}
          fetching={isFetching}
          srcURL="https://github.com/AirWalk-Digital/airview"
          pageLinkUrl="https://github.com/AirWalk-Digital/airview"
          onDownloadPDFClick={() => {
            print(contentsRef?.current?.innerHTML, css);
          }}
          downloadStatus={
            status.loading ? "loading" : status.error ? "error" : null
          }
        />
      </Aside>
    </AsideAndMainContainer>
  );
}
