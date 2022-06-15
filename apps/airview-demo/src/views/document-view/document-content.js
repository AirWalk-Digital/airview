import React from "react";
import { StyledWysiwyg } from "airview-ui/";
import { TestContent } from "./test-content";

export function DocumentContent() {
  return (
    <StyledWysiwyg>
      <TestContent />
    </StyledWysiwyg>
  );
}
