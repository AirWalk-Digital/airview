import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import alias from "@rollup/plugin-alias";
const path = require("path");

const projectRootDir = path.resolve(__dirname);

export default [
  {
    input: "src/index.js",
    external: [
      "react",
      "react-dom/client",
      "@reduxjs/toolkit",
      "@reduxjs/toolkit/query/react",
      "react-redux",
      "@mui/material",
      "@mui/x-date-pickers",
      "@date-io/dayjs",
      "dayjs",
      "prop-types",
      "gray-matter",
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
      "@mui/icons-material/DriveFolderUpload",
      "lodash/isEqual",
      "slugify",
      "react-router-dom",
      "@uiw/react-md-editor",
      "rehype-sanitize",
      "unist-util-visit",
      "mime",
      "react/jsx-runtime",
      "@mdx-js/mdx",
      "@mdx-js/react",
      "remark-gfm",
      "rehype-highlight",
    ],
    output: [{ dir: `dist`, format: "es" }],
    plugins: [
      resolve({
        customResolveOptions: {
          moduleDirectories: "node_modules",
        },
      }),
      babel({ babelHelpers: "bundled" }),
      json(),
      alias({
        entries: [
          {
            find: "@app",
            replacement: path.resolve(projectRootDir, "src/app"),
          },
          {
            find: "@package",
            replacement: path.resolve(projectRootDir, "package.json"),
          },
          {
            find: "@features",
            replacement: path.resolve(projectRootDir, "src/features"),
          },
          {
            find: "@components",
            replacement: path.resolve(projectRootDir, "src/components"),
          },
          {
            find: "@views",
            replacement: path.resolve(projectRootDir, "src/views"),
          },
        ],
      }),
    ],
  },
];
