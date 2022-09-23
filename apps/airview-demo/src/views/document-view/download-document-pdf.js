import React, { useState, useEffect, useRef } from "react";
import { LoadingButton } from "@mui/lab";
import { Alert, Snackbar } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

const initialState = {
  loading: false,
  success: false,
};

const htmlContent = "<p>Hello World!</p>";

const css = "@page { backgroundColor: 'blue'; color: '#fff' }";

async function wait(error = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => (error ? reject() : resolve()), 1500);
  });
}

function DownloadDocumentPdf() {
  const [status, setStatus] = useState({ ...initialState });
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [pdfBlob, setPdfBlob] = useState(false);

  const count = useRef(0);

  const downloadFile = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("downloading file");
        resolve();
      }, 500);
    });
  };

  const handleOnClick = async () => {
    try {
      setFeedbackOpen(false);

      if (!pdfBlob) {
        console.log("doing fetch");
        setStatus((prevStatus) => ({ ...prevStatus, loading: true }));
        await wait(count.current < 1 ? false : true); // Placeholder for fetch
        setPdfBlob(true);
      }

      await downloadFile();
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
    setTimeout(() => {
      setStatus({ ...initialState });
      setFeedbackOpen(false);
      setPdfBlob(null);
      console.log("purging state");
      count.current = 10;
    }, 10000);
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
