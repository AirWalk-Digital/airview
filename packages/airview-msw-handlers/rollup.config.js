import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { main } from "./package.json";

export default [
  {
    input: "src/index.js",
    external: ["msw"],
    output: [{ file: main, format: "es" }],
    plugins: [resolve(), babel({ babelHelpers: "bundled" })],
  },
];
