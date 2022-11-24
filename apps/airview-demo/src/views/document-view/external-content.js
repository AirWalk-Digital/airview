import React from "react";
import MDEditor from "@uiw/react-md-editor";
import matter from "gray-matter";
import { useState, useEffect } from "react";
import { config } from "../../config";

export function ExternalContent({ metadata }) {
  const [data, setData] = useState("");

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

  return <MDEditor.Markdown source={data} />;
}
