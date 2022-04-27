import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { main } from "./package.json";

export default [
  {
    input: "src/index.js",
    external: [
      "react",
      "react-dom",
      "@reduxjs/toolkit",
      "react-redux",
      "react-router-dom",
    ],
    output: [{ file: main, format: "es" }],
    plugins: [resolve(), babel({ babelHelpers: "bundled" })],
  },
];
