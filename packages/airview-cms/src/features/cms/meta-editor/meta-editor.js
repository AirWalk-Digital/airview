import React from "react";
import { useSelector } from "react-redux";
import { Box, Slide, CircularProgress, Typography } from "@mui/material";
import { META_EDITOR_WIDTH } from "./constants";
import { TOOL_BAR_HEIGHT } from "../toolbar";
import { useGetEntry } from "../../use-get-entry";
import { selectCmsContext } from "../cms.slice";
import {
  selectMetaEditorEnabledStatus,
  selectMetaEditorData,
} from "./meta-editor.slice";
import { MetaEditorFeedbackContainer } from "./meta-editor-feedback-container";
import { MetaForm } from "./meta-form";

export function MetaEditor() {
  const metaEditorEnabled = useSelector(selectMetaEditorEnabledStatus);
  const cmsContext = useSelector(selectCmsContext);
  const { isLoading, isFetching, isError } = useGetEntry(cmsContext);
  const metaEditorData = useSelector(selectMetaEditorData);

  return (
    <Slide in={metaEditorEnabled} direction="left" timeout={350}>
      <Box
        component="aside"
        sx={{
          position: "fixed",
          top: `${TOOL_BAR_HEIGHT}px`,
          bottom: 0,
          right: 0,
          width: `${META_EDITOR_WIDTH}px`,
          borderLeft: 1,
          borderColor: "grey.300",
          padding: 1,
          boxSizing: "border-box",
          backgroundColor: "common.white",
        }}
      >
        <React.Fragment>
          {!cmsContext ? (
            <MetaEditorFeedbackContainer>
              <Typography>No editor context set</Typography>
            </MetaEditorFeedbackContainer>
          ) : isLoading || isFetching ? (
            <MetaEditorFeedbackContainer>
              <CircularProgress />
            </MetaEditorFeedbackContainer>
          ) : isError ? (
            <MetaEditorFeedbackContainer>
              <Typography color="error">
                Error: Unable to load meta data
              </Typography>
            </MetaEditorFeedbackContainer>
          ) : !metaEditorData ? (
            <MetaEditorFeedbackContainer>
              <Typography>
                There is no meta data to edit for this entry
              </Typography>
            </MetaEditorFeedbackContainer>
          ) : (
            <MetaForm />
          )}
        </React.Fragment>
      </Box>
    </Slide>
  );
}
