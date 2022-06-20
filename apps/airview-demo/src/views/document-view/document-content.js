import React from "react";
import { StyledWysiwyg } from "airview-ui/";
import { TestContent } from "./test-content";

export function DocumentContent({ loading, fetching }) {
  return (
    <StyledWysiwyg {...{ loading, fetching }}>
      <TestContent />
    </StyledWysiwyg>
  );
}
