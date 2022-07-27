import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
const path = require("path");

const projectRootDir = path.resolve(__dirname);

export default [
  {
    input: "src/index.js",
    external: [
      "react",
      "@mui/material",
      //"@mui/lab",
      "prop-types",
      "dayjs",
      //"jss-plugin-compose",
      "@mui/icons-material/OpenINew",
      "@mui/material/IconButton",
      "@mui/icons-material/FilterList",
      "@mui/material/ListItemIcon",
      "@mui/icons-material/Settings",
      "@mui/icons-material/Check",
      "@mui/icons-material/Clear",
      "@mui/icons-material/Info",
      "@mui/icons-material/ExpandMore",
      "@mui/icons-material/OpenInNew",
      "@mui/icons-material/Security",
      "@mui/icons-material/KeyboardArrowDown",
      "@mui/icons-material/KeyboardArrowUp",
      "@mui/icons-material/Error",
      "@mui/icons-material/Warning",
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
      commonjs(),
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
