import React, { useEffect, useState } from "react";
import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";
import * as provider from "@mdx-js/react";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import PropTypes from "prop-types";

function useMDX(source) {
  const [exports, setExports] = useState({ default: undefined });

  useEffect(() => {
    const processContent = async () => {
      const exports = await evaluate(source, {
        ...provider,
        ...runtime,
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
      });
      setExports(exports);
    };
    console.log("compile MDX");
    processContent();
  }, [source]);

  return exports.default;
}

function MDXContent({ components, externalComponents, markdownContent }) {
  const Content = useMDX(markdownContent);

  return (
    <div className="styled-wysiwyg-content">
      {Content && (
        <Content components={{ ...components, ...externalComponents }} />
      )}
    </div>
  );
}

MDXContent.propTypes = {
  components: PropTypes.object,
  externalComponents: PropTypes.object,
  markdownContent: PropTypes.string,
};

export { MDXContent };
