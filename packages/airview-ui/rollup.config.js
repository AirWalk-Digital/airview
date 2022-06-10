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
      "@mui/material",
      "@mui/icons-material/Menu",
      "@mui/icons-material/Close",
      "@mui/icons-material/KeyboardArrowRight",
      "@mui/icons-material/KeyboardArrowDown",
      "prop-types",
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
            find: "@util",
            replacement: path.resolve(projectRootDir, "src/util"),
          },
        ],
      }),
    ],
  },
];
