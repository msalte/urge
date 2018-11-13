const path = require("path");

const SOURCE_DIR = path.resolve(__dirname, "src");

module.exports = {
  mode: "development",
  entry: SOURCE_DIR + "/app.js",
  output: {
    filename: "urge.js"
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        include: SOURCE_DIR,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"]
        }
      }
    ]
  }
};
