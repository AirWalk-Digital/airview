import React from "react";
import MDEditor from "@uiw/react-md-editor";
import matter from "gray-matter";
import { useState, useEffect } from "react";
import { config } from "../../config";

export function ExternalContent({ metadata }) {
  const [data, setData] = useState("");

  const githubBaseUri = "https://github.com/";

  useEffect(() => {
    async function getData() {
      const url = `${config.baseUrl}/external-content/${metadata.external_repo}/${metadata.external_owner}?path=${metadata.external_path}`;
      const actualData = await fetch(url).then((response) => response.json());

      const { content: markdownBody } = matter(
        Buffer.from(actualData.content ?? "", "base64").toString("utf8")
      );
      setData(markdownBody);
    }
    getData();
  }, [setData, metadata]);

  const components = {
    img: ({ src, alt }) => {
      if (!src.startsWith("https:")) {
        const relativeUrl = src.replace(/^\//, "");

        const path = new URL(
          relativeUrl,
          `${githubBaseUri}${metadata.external_path}`
        ).pathname.substring(1);

        src = `${config.baseUrl}/external-media/${metadata.external_repo}/${metadata.external_owner}?path=${path}`;
      }

      return <img src={src} alt={alt} />;
    },
  };

  return <MDEditor.Markdown source={data} components={components} />;
}
