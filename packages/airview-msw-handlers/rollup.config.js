import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { main } from "./package.json";

export default [
  {
    input: "src/index.js",
    external: ["msw", "gray-matter", "nanoid"],
    output: [{ file: main, format: "es" }],
    plugins: [resolve(), babel({ babelHelpers: "bundled" })],
  },

  // Add production bundle:
  // - minification
  // - tree shaking
];
