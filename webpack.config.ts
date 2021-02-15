import * as HtmlWebPackPlugin from "html-webpack-plugin";
import * as path from "path";
import * as webpack from "webpack";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const getConfig = (_env: any, options: any) => {
  const devMode = options.mode !== "production";

  const plugins = [];

  plugins.push(
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    })
  );

  if (!devMode) {
    plugins.push(new MiniCssExtractPlugin());
  }

  const config: webpack.Configuration = {
    entry: "./src/index.ts",
    devtool: devMode ? "inline-source-map" : false,
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins,
  };

  return config;
};

export default getConfig;
