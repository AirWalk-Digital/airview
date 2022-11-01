import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { main } from "./package.json";
import { terser } from "rollup-plugin-terser";
import { string } from "rollup-plugin-string";

const env = process.env.NODE_ENV;

const config = {
  input: "src/index.js",
  external: ["msw", "gray-matter", "nanoid"],
  output: [{ file: main, format: "es" }],
  plugins: [
    resolve(),
    babel({ babelHelpers: "bundled" }),
    string({ include: "**/*.{md,mdx}" }),
  ],
};

if (env === "production") {
  config.plugins.push(terser());
}

export default config;
