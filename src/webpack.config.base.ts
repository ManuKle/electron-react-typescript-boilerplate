/**
 * Base webpack config used across other specific configs
 */

import * as path from "path";
import * as webpack from "webpack";
import { TsConfigPathsPlugin, CheckerPlugin } from "awesome-typescript-loader";
// @ts-ignore
import { dependencies as externals } from "./package.json";

const baseConfig = {
  externals: Object.keys(externals || {}),

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader"
      }
    ]
  },

  output: {
    path: path.join(__dirname),
    filename: "renderer.dev.js",
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: "commonjs2",
    // Bundle absolute resource paths in the source-map,
    // so VSCode can match the source file.
    devtoolModuleFilenameTemplate: "[absolute-resource-path]"
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    plugins: [new TsConfigPathsPlugin()]
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production"
    }),

    new webpack.NamedModulesPlugin(),
    new CheckerPlugin()
  ]
};

export default baseConfig;
