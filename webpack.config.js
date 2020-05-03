const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    index: "./src/index.js",
    setup: "./src/setup.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: isProduction ? "" : "inline-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      title: "Temp tracker",
      filename: "index.html",
      template: "src/index.html",
    }),
    new HtmlWebpackPlugin({
      title: "Temp tracker setup",
      filename: "setup.html",
      template: "src/setup.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
    ],
  },
};
