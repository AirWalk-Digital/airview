import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { module } from "./package.json";

export default [
  {
    input: "lib/index.js",
    external: [],
    output: [{ file: module, format: "es" }],
    plugins: [resolve(), babel({ babelHelpers: "bundled" })],
  },
];
