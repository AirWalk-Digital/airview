import React from "react";
import { MarkdownEditorExternalContent } from "airview-cms";
import { StyledWysiwyg } from "airview-ui/";
import { ExternalContent } from "./external-content";

export function ExternalDocumentContent({ loading, fetching, metadata }) {
  return (
    <StyledWysiwyg {...{ loading, fetching }}>
      <ExternalContent metadata={metadata} />
    </StyledWysiwyg>
  );
}
