import React, { useState, useEffect, useRef } from "react";
import { LoadingButton } from "@mui/lab";
import { Alert, Snackbar } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

const initialState = {
  loading: false,
  success: false,
};

const html = "<p>Hello World!</p>";

const css = "@page { margin: 2cm; @top-left { content:'test'; } }";

async function wait(error = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => (error ? reject() : resolve()), 1500);
  });
}

function DownloadDocumentPdf() {
  const [status, setStatus] = useState({ ...initialState });
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const downloadUrl = useRef();

  const downloadFile = (url) => {
    const downloadLink = document.createElement("a");

    downloadLink.href = url;
    downloadLink.download = "document.pdf";

    document.body.appendChild(downloadLink);

    downloadLink.click();
    downloadLink.remove();
  };

  const handleOnClick = async () => {
    try {
      setFeedbackOpen(false);

      if (!downloadUrl.current) {
        console.log("doing fetch");
        setStatus((prevStatus) => ({ ...prevStatus, loading: true }));

        const body = JSON.stringify({ html, css });

        const resp = await fetch("/api/export", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body,
        });

        const blob = await resp.blob();
        downloadUrl.current = URL.createObjectURL(blob);
      }

      downloadFile(downloadUrl.current);

      setStatus((prevStatus) => ({
        ...prevStatus,
        loading: false,
        success: true,
      }));
    } catch {
      setStatus((prevStatus) => ({
        ...prevStatus,
        loading: false,
        success: false,
      }));
    } finally {
      setFeedbackOpen(true);
    }
  };

  useEffect(() => {
    setStatus({ ...initialState });
    setFeedbackOpen(false);
  }, []);

  return (
    <React.Fragment>
      <Snackbar
        open={feedbackOpen}
        autoHideDuration={5000}
        onClose={(_, reason) => {
          if (reason === "timeout") setFeedbackOpen(false);
        }}
        key={status.success}
      >
        <Alert
          severity={status.success ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {status.success
            ? "Your requested PDF should begin downloading to your filesystem shortly"
            : "There was an error generating your requested PDF, please try again"}
        </Alert>
      </Snackbar>

      <LoadingButton
        variant="contained"
        disableElevation
        size="small"
        loadingPosition="start"
        startIcon={<DescriptionIcon />}
        loading={status.loading}
        disabled={status.loading}
        color="primary"
        sx={{ mb: 4 }}
        onClick={handleOnClick}
      >
        {status.loading
          ? "Generating PDF, please wait"
          : "Download document as PDF"}
      </LoadingButton>
    </React.Fragment>
  );
}

export { DownloadDocumentPdf };
