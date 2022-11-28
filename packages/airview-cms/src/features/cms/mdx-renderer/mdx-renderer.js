import React from "react";
import { useEffect, useState } from "react";
import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";
import * as provider from "@mdx-js/react";
import { MDXProvider as MDXJSProvider } from "@mdx-js/react";
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

    processContent();
  }, [source]);

  return exports.default;
}

function MDXRenderer({ source }) {
  const Content = useMDX(source);

  return (
    <div className="styled-wysiwyg-content">
      <Content />
    </div>
  );
}

MDXRenderer.propTypes = {
  source: PropTypes.string,
};

function MDXProvider({ components, children }) {
  return <MDXJSProvider components={components}>{children}</MDXJSProvider>;
}

MDXProvider.propTypes = {
  components: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export { MDXRenderer, MDXProvider, useMDX };
