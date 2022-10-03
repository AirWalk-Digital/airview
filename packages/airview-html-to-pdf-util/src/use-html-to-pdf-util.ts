import { useState, useRef, useEffect } from "react";

const initialState = {
  idle: false,
  loading: false,
  success: false,
  error: false,
};

function useHtmlToPdfUtil(): {
  print: (html: string) => void;
  idle: boolean;
  loading: boolean;
  success: boolean;
  error: boolean;
} {
  const [status, setStatus] = useState(initialState);

  const cachedHTML = useRef<string | null>();
  const downloadURL = useRef<string | null>();

  function purgeObjectURL() {
    URL.revokeObjectURL(downloadURL?.current ?? "");
  }

  useEffect(() => {
    return () => {
      purgeObjectURL();
    };
  }, []);

  const print = async (html: string) => {
    try {
      setStatus((prevStatus) => ({
        ...prevStatus,
        loading: true,
      }));

      if (cachedHTML?.current !== html || !downloadURL?.current) {
        purgeObjectURL();
        const body = JSON.stringify({ html, css: "" });

        const resp = await fetch("/api/export", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body,
        });

        const blob = await resp.blob();

        downloadURL.current = URL.createObjectURL(blob);
        cachedHTML.current = html;
      }

      const downloadLink = document.createElement("a");

      downloadLink.href = downloadURL.current;
      downloadLink.download = "document.pdf";

      document.body.appendChild(downloadLink);

      downloadLink.click();
      downloadLink.remove();

      setStatus((prevStatus) => ({
        ...prevStatus,
        success: true,
        error: false,
      }));
    } catch (error) {
      console.error(error);

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
    print,
    ...status,
  };
}

export { useHtmlToPdfUtil };
