import React, { useRef } from "react";
import { Navigate, Link as ReactRouterLink } from "react-router-dom";
import {
  useGetRelated,
  useSetCmsContext,
  useCMSViewportOffset,
} from "airview-cms";
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
import { config } from "../../config";
import { RelatedContent } from "./related-content";
import { useGetPresentation } from "./use-get-presentation";
/* eslint import/no-webpack-loader-syntax: off */
import css from "!!raw-loader!../../print.css";

export function DocumentView() {
  const context = useGetEntryId();
  const { print, ...status } = useHtmlToPdfUtil(
    context,
    `${config.baseUrl}/export`
  );

  const contentsRef = useRef();

  const { data, isError, error, isUninitialized, isLoading, isFetching } =
    useSetCmsContext(context);

  // const related = useGetRelated(context);
  const presentation = useGetPresentation(context);
  const cmsEnabled = useCMSViewportOffset();

  const breadcrumbLinks = useGetBreadcrumbLinksData(data);

  if (isError && error.status === 404) {
    return <Navigate to="/not-found" replace={true} />;
  }

  const hasExternalContent = "external_repo" in data;

  const renderExternalContent = hasExternalContent && !cmsEnabled;

  /*
  const relatedKeys = Object.keys(related.data || {});
  const presentationHtml = relatedKeys.find((f) => f.endsWith(".ppt.html"));
  const presentationPdf = relatedKeys.find((f) => f.endsWith(".ppt.pdf"));
  const presentationPdfUrl =
    presentationPdf && `/api/cms/media/${related.data[presentationPdf].sha}`;

  const presentationHtmlOnClick = async () => {
    //TODO: this needs to pass errors back
    const url = `/api/cms/media/${related.data[presentationHtml].sha}`;
    const response = await fetch(url);
    if (response.ok) {
      // if HTTP-status is 200-299
      // get the response body (the method explained below)
      const blob = await response.blob();

      const htmlBlob = blob.slice(0, blob.size, "text/html");
      const htmlUrl = URL.createObjectURL(htmlBlob);
      window.open(htmlUrl, "_blank");
    } else {
      alert("HTTP-Error: " + response.status);
    }
  };
  */

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
          presentationHtmlOnClick={presentation.presentationHtmlOnClick}
          presentationHtmlDownloadStatus={
            presentation.loading
              ? "loading"
              : presentation.error
              ? "error"
              : null
          }
          presentationPdfLinkUrl={presentation.presentationPdfUrl}
        />
        <RelatedContent />
      </Aside>
    </AsideAndMainContainer>
  );
}
