import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
//import { MarkdownContent } from "../markdown-content";

export function ControlOverviewResourceEvidenceViewer({
  open,
  onClose,
  resourceEvidenceData,
}) {
  return (
    <Dialog
      aria-labelledby="control-overview-resource-evidence-viewer"
      open={open}
      maxWidth="lg"
      fullWidth
      disableEscapeKeyDown
    >
      <DialogTitle id="control-overview-resource-evidence-viewer">
        Resource Supporting Evidence
      </DialogTitle>

      <DialogContent dividers>
        {/* <MarkdownContent
          content={[
            {
              defaultValue: resourceEvidenceData,
            },
          ]}
          readOnly={true}
          loading={false}
        /> */}
        {resourceEvidenceData}
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
          variant="contained"
          disableElevation
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ControlOverviewResourceEvidenceViewer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  resourceEvidenceData: PropTypes.string,
};
