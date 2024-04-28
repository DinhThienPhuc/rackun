const TerserPlugin = require("terser-webpack-plugin");
const glob = require("glob");

module.exports = {
  entry: glob.sync("./src/**/*.js").reduce((acc, item) => {
    acc[item.replace("src/", "/")] = __dirname + "/" + item;
    return acc;
  }, {}),
  output: {
    path: __dirname + "/dist",
    filename: "[name]",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true,
        },
      }),
    ],
  },
};
