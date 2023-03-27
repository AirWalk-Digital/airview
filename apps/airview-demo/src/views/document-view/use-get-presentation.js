import { useState, useEffect, useRef } from "react";
import { useGetRelated } from "airview-cms";

const initialState = {
  idle: false,
  loading: false,
  success: false,
  error: false,
};

export function useGetPresentation(context) {
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(htmlUrl?.current ?? "");
      setStatus(initialState);
    };
  }, [context]);

  const htmlUrl = useRef();
  const related = useGetRelated(context);
  const [status, setStatus] = useState(initialState);
  const relatedKeys = Object.keys(related.data || {});
  const presentationHtml = relatedKeys.find((f) => f.endsWith(".ppt.html"));
  const presentationPdf = relatedKeys.find((f) => f.endsWith(".ppt.pdf"));
  const presentationPdfUrl =
    presentationPdf && `/api/cms/media/${related.data[presentationPdf].sha}`;

  const presentationHtmlOnClick = async () => {
    try {
      setStatus((prevStatus) => ({
        ...prevStatus,
        loading: true,
      }));
      const url = `/api/cms/media/${related.data[presentationHtml].sha}`;
      const response = await fetch(url);
      if (response.ok) {
        // if HTTP-status is 200-299
        // get the response body (the method explained below)
        const blob = await response.blob();

        const htmlBlob = blob.slice(0, blob.size, "text/html");
        htmlUrl.current = URL.createObjectURL(htmlBlob);
        window.open(htmlUrl.current, "_blank");
      } else {
        throw new Error(response.statusText);
      }

      setStatus((prevStatus) => ({
        ...prevStatus,
        success: true,
        error: false,
      }));
    } catch {
      setStatus((prevStatus) => ({
        ...prevStatus,
        success: false,
        error: true,
      }));
    } finally {
      setStatus((prevStatus) => ({
        ...prevStatus,
        idle: false,
        loading: false,
      }));
    }
  };
  return {
    presentationHtmlOnClick: presentationHtml && presentationHtmlOnClick,
    presentationPdfUrl,
    ...status,
  };
}
