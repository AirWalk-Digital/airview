import React from "react";
import { LoadingButton } from "@mui/lab";
import DescriptionIcon from "@mui/icons-material/Description";

function DownloadDocumentPdfButton({ onClick, status, disabled }) {
  let feedbackMessage;

  if (status.loading) {
    feedbackMessage = "Generating PDF, please wait";
  } else if (status.error) {
    feedbackMessage = "Error generating PDF - click to retry";
  } else {
    feedbackMessage = "Download document as PDF";
  }

  return (
    <LoadingButton
      variant="contained"
      disableElevation
      size="small"
      loadingPosition="start"
      startIcon={<DescriptionIcon />}
      loading={status.loading}
      disabled={status.loading || disabled}
      color={status.error ? "error" : "primary"}
      sx={{ mb: 4 }}
      onClick={onClick}
    >
      {feedbackMessage}
    </LoadingButton>
  );
}

export { DownloadDocumentPdfButton };
