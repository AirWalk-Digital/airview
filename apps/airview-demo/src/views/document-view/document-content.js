import React from "react";
import { MarkdownEditor } from "airview-cms";
import { StyledWysiwyg } from "airview-ui/";
import { TestMDXComponent } from "../../components";

export function DocumentContent({ loading, fetching }) {
  return (
    <StyledWysiwyg {...{ loading, fetching }} data-test="test">
      <MarkdownEditor components={{ TestMDXComponent }} />
    </StyledWysiwyg>
  );
}
