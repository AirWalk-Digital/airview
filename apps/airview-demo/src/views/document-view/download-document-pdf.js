import React, { useState, useEffect, useRef } from "react";
import { LoadingButton } from "@mui/lab";
import { Alert, Snackbar } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

/* eslint import/no-webpack-loader-syntax: off */
import css from "!!raw-loader!../../print.css";

/*
Issues:
- Can't get up-to-date HTML content via ref due to async loading of DOM content
- Importing css file to pass to print API call also loads it into the document!
*/

const html = `
    <h1>Test Document</h1>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum incidunt maiores sapiente beatae saepe illum alias dolorum ducimus at. Vero, ullam. Obcaecati eos libero praesentium autem quibusdam, consequatur corporis delectus!</p>
    <p>Fugit recusandae sit alias similique unde praesentium ducimus accusamus reiciendis fugiat aliquam modi nemo rerum sequi soluta beatae blanditiis vero tempora delectus natus, itaque ratione hic consequatur necessitatibus. Et, id.</p>
    <h2>Lorem ipsum dolor sit</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas voluptas iste eveniet? Vitae debitis culpa quos asperiores sed iste magnam! Dolor obcaecati consequuntur sunt, nihil, provident, voluptatibus voluptas illo blanditiis aspernatur asperiores atque vero modi laudantium optio. Atque, laudantium facilis.</p>
    <p>Saepe natus consequuntur, ab ratione, est nam libero commodi minima necessitatibus a numquam odio odit modi voluptas perferendis repellendus minus. Harum explicabo, suscipit exercitationem esse maxime molestiae eligendi tempore quo facere sequi, maiores veritatis dolores quia nulla excepturi, numquam accusamus!</p>
    <p>Eligendi fugiat ad nostrum accusamus magni molestias error ex commodi odio nobis aspernatur provident porro adipisci, minima sapiente, voluptate, ab velit pariatur a? Consequuntur ex ad molestias rem, autem tempora iste at magni deleniti officia ducimus mollitia repudiandae, ipsa debitis?</p>
    <h2>Lorem ipsum dolor sit amet consectetur, adipisicing elit</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus eligendi natus unde vero quasi qui quod recusandae dolore tempore sunt doloremque quos sint quo, nihil maiores nam hic asperiores enim, accusantium animi magni voluptate minus.</p>
    <p>Odio quia voluptas quod molestias consequatur repellat eum, error saepe, ipsum, laboriosam dolorem ratione consequuntur. Aspernatur nam repellendus corporis nobis dicta explicabo possimus odit eligendi suscipit, incidunt, ducimus sit ex unde dolorum quas aliquam beatae?</p>
    <h3>Lorem ipsum dolor sit amet consectetur</h3>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea officia molestiae corrupti. Delectus provident alias est labore quaerat, dicta, iure, veritatis ut corporis eligendi illo sed quo? Aperiam, repudiandae quod.</p>
    <p>Porro deleniti odio eum fugiat beatae laborum quidem iste maxime optio molestias sunt labore numquam hic quam aperiam, quas voluptate, necessitatibus cupiditate unde quo perferendis officiis, sit aliquid! Sunt, eum?</p>
    <p>Dicta quod aperiam rem mollitia, porro amet! Commodi maxime eos aut reiciendis dolores illum quidem numquam voluptatibus architecto pariatur, soluta molestiae voluptas dolorum ut adipisci autem animi. Facere, laboriosam ea.</p>
    <ul>
      <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
      <li>Aspernatur, assumenda omnis. Perspiciatis illo cum assumenda?</li>
      <li>Voluptatum fugit ex beatae recusandae architecto quam.</li>
      <li>Facilis praesentium consequatur, blanditiis est temporibus ab.</li>
      <li>Impedit a odit nam neque, assumenda iure!</li>
      <li>Facere dolore in tenetur, reprehenderit beatae harum!</li>
    </ul>
    <h2>Lorem ipsum dolor sit amet, consectetur adipisicing.</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos accusamus voluptatibus cumque nam, provident doloribus, molestias eum voluptatem minima quia a mollitia sit ratione error nihil quisquam obcaecati unde! Quis?</p>
    <p>Qui, ipsa veritatis officiis aut ea eveniet explicabo dicta eaque id dolores quisquam ad iusto. Hic, quis autem neque quidem porro repudiandae voluptatum aut possimus tempora est, facere quisquam voluptates?</p>
    <p>In molestias aliquid dolor officiis. Animi cum autem neque deleniti nulla quisquam reiciendis assumenda similique, provident beatae, temporibus inventore iusto quis dolor! Iste necessitatibus quidem id ab enim veritatis fugiat.</p>
    <p>Ipsa sint illum odit sit iusto, molestiae in suscipit non hic sequi nulla consequatur quia ducimus accusantium itaque! Dolor quia dolores autem? Numquam commodi voluptate facere harum magni voluptatem tenetur.</p>
  `;

const initialState = {
  loading: false,
  success: false,
};

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
