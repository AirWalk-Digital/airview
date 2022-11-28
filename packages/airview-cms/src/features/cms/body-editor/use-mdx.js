import { useEffect, useState } from "react";
import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";
import * as provider from "@mdx-js/react";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

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

export { useMDX };
