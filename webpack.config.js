const path = require("path");
const fs = require('fs');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";
const wifiData = require('./scan.json');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    index: "./src/index.js",
  },
  output: {
    // filename: "[name].bundle.js",
    path: isProduction
      ? path.resolve(__dirname, "./arduino/esp-temp-track/data")
      : path.resolve(__dirname, "dist"),
  },
  devtool: isProduction ? "" : "inline-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true,
    before: function(app, server, compiler) {
      app.get('/scan', function(req, res) {
        res.json(wifiData);
      });
      app.get('/settings', function(req, res) {
        const data = fs.readFileSync('./settings.json', {encoding: 'utf8'});
        res.json(JSON.parse(data));
      });
      app.post('/settings', function(req, res) {
        fs.writeFile('./settings.json', JSON.stringify(req.body), err => {
          if (err) throw err;
        });
        res.json(req.body);
      });
    }
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
