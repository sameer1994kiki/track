import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import json from "rollup-plugin-json";
import pkg from "./package.json";

export default [
  // browser-friendly UMD build
  {
    input: "./index.js",
    output: {
      name: "track",
      file: pkg.browser,
      format: "umd"
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      json()
    ]
  },

  {
    input: "./index.js",
    external: ["ms"],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" }
    ]
  },

  // browser-friendly UMD minified build
  {
    input: "./index.js",
    output: {
      name: "track",
      file: "dist/track.umd.min.js",
      format: "umd"
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      terser(), // mangler/compressor toolkit
      json()
    ]
  }
];
