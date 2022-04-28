import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { main } from "./package.json";

export default [
  {
    input: "src/index.js",
    external: [
      "react",
      "@reduxjs/toolkit",
      "react-redux",
      "@mui/material",
      "@mui/icons-material",
    ],
    output: [{ file: main, format: "es" }],
    plugins: [
      resolve({
        customResolveOptions: {
          moduleDirectories: "node_modules",
        },
      }),
      babel({ babelHelpers: "bundled" }),
    ],
  },
];
