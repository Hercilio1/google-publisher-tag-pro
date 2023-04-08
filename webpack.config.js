const path = require("path");

module.exports = {
  // Reads the pages/ folder looking for the following pattern of
  // files: index-([a-z]+)\.js
  entry: "./src/index.js",
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js",
    publicPath: "auto",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },
  // Dev Configs:
  mode: "development",
  devtool: "hidden-source-map",
  optimization: {
    minimize: false,
  },
};
