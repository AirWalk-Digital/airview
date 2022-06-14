import React from "react";
import { Container, Box } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useSetCmsContext } from "airview-cms";
import { useGetEntryId } from "./use-get-entry-id";
import { TableOfContents } from "./table-of-contents";
import { RelatedContent } from "./related-content";

export function DocumentView() {
  const entryId = useGetEntryId();

  const { isError, error } = useSetCmsContext(entryId);

  if (isError && error.type === 404) {
    return <Navigate to="/not-found" replace={true} />;
  }

  return (
    <Container maxWidth={false} sx={{ paddingTop: 6, paddingBottom: 6 }}>
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flex: "1 1 auto", paddingRight: 2 }}>
          <span>Main content</span>
        </Box>
        <Box
          component="aside"
          sx={{ flex: "0 0 auto", width: 350, paddingLeft: 2 }}
        >
          <TableOfContents />
          <RelatedContent />
        </Box>
      </Box>
    </Container>
  );
}
