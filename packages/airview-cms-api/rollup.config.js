import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  external: [
    "aws-sdk",
    "gray-matter",
    "jsonwebtoken",
    "node-fetch",
    "sqlite3",
    "fs",
  ],
  output: [{ dir: `dist`, format: "es" }],
  plugins: [typescript()],
};
