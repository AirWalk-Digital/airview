import { useState, useRef, useEffect } from "react";
import { rehype } from "rehype";
import { selectAll } from "hast-util-select";
import { remove } from "unist-util-remove";
import type { Root } from "hast";

function createBase64ImageStringFromURL(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          reject("Unable to resolve image path");
        }

        return response.blob();
      })
      .then((blob) => {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
          if (typeof reader.result !== "string") {
            return reject("File reader result value should be of type string");
          }

          resolve(reader.result);
        });

        reader.readAsDataURL(blob);
      });
  });
}

function rehypeInlineImages(): (tree: Root) => void {
  return async (tree) => {
    const images = selectAll("img", tree);

    await Promise.all(
      images.map(async (image) => {
        const imagePath = image?.properties?.src;

        if (
          !imagePath ||
          typeof imagePath !== "string" ||
          imagePath.startsWith("data:")
        ) {
          return;
        }

        const base64image = await createBase64ImageStringFromURL(imagePath);

        if (base64image) {
          image.properties = {
            ...image.properties,
            src: base64image,
            id: "test",
          };
        }
      })
    );
  };
}

function rehypeStripSVGs(): (tree: Root) => void {
  return (tree) => {
    remove(tree, (node) => {
      return node.type === "element" && node.tagName === "svg";
    });
  };
}

async function prepareHTMLforPrint(html: string) {
  const file = await rehype()
    .use(rehypeStripSVGs)
    .use(rehypeInlineImages)
    .process(html);

  return file.value;
}

const initialState = {
  idle: false,
  loading: false,
  success: false,
  error: false,
};

function useHtmlToPdfUtil(key: string): {
  print: (html: string, css: string) => void;
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
      setStatus(initialState);
    };
  }, [key]);

  const print = async (html: string, css: string) => {
    try {
      setStatus((prevStatus) => ({
        ...prevStatus,
        loading: true,
      }));

      if (cachedHTML?.current !== html || !downloadURL?.current) {
        purgeObjectURL();
        const preparedHTML = await prepareHTMLforPrint(html);

        const body = JSON.stringify({ html: preparedHTML, css });

        const resp = await fetch("/api/cms/export", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body,
        });

        if (!resp.ok) {
          throw new Error(resp.statusText);
        }

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
