import React from "react";
import { useSelector } from "react-redux";
import { Box, Slide } from "@mui/material";
import { META_EDITOR_WIDTH } from "./constants";
import { TOOL_BAR_HEIGHT } from "../toolbar";
import {
  selectMetaEditorEnabledStatus,
  selectMetaEditorLoadingStatus,
} from "./meta-editor.slice";
import { MetaForm } from "./meta-form";

export function MetaEditor() {
  const metaEditorEnabled = useSelector(selectMetaEditorEnabledStatus);
  const { isIdle, isLoading, isError } = useSelector(
    selectMetaEditorLoadingStatus
  );

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
          {isLoading || isIdle ? (
            <span>Loading meta data</span>
          ) : isError ? (
            <span>Error loading meta data </span>
          ) : (
            <MetaForm />
          )}
        </React.Fragment>
      </Box>
    </Slide>
  );
}
