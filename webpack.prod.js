const common = require("./webpack.config.js");

module.exports = {
  ...common,
  mode: "production",
  devtool: false,
  optimization: {
    minimize: true,
  },
};
