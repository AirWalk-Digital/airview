import React from "react";
import { MarkdownEditor } from "airview-cms";
import { StyledWysiwyg } from "airview-ui/";

export function DocumentContent({ loading, fetching }) {
  return (
    <StyledWysiwyg {...{ loading, fetching }}>
      <MarkdownEditor />
    </StyledWysiwyg>
  );
}
