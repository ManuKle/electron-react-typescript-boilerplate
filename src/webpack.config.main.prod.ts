/**
 * Webpack config for production electron main process
 */

import * as webpack from "webpack";
import * as merge from "webpack-merge";
// @ts-ignore
import * as UglifyJSPlugin from "uglifyjs-webpack-plugin";
import * as CopyWebpackPlugin from "copy-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { default as baseConfig } from "./webpack.config.base";
import { default as CheckNodeEnv } from "./scripts/CheckNodeEnv";

CheckNodeEnv("production");

export default merge.smart(baseConfig as any, {
  devtool: "source-map",

  target: "electron-main",

  entry: ["babel-polyfill", "src/Main/main.dev"],

  output: {
    path: __dirname,
    filename: "./main.prod.js"
  },

  plugins: [
    new UglifyJSPlugin({
      parallel: true,
      sourceMap: true
    }),

    new BundleAnalyzerPlugin({
      analyzerMode:
        process.env.OPEN_ANALYZER === "true" ? "server" : "disabled",
      openAnalyzer: process.env.OPEN_ANALYZER === "true"
    }),

    /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production",
      DEBUG_PROD: "false"
    }),
    new CopyWebpackPlugin([
      {
        from: "src/Renderer/app.html",
        to: "../src/app.html"
      }
    ])
  ],

  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false
  }
});
