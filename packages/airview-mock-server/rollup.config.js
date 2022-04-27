import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { main } from "./package.json";
import { terser } from "rollup-plugin-terser";

const env = process.env.NODE_ENV;

const config = {
  input: "src/index.js",
  external: ["msw", "gray-matter", "nanoid"],
  output: [{ file: main, format: "es" }],
  plugins: [resolve(), babel({ babelHelpers: "bundled" })],
};

if (env === "production") {
  config.plugins.push(terser());
}

export default config;
