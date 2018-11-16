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
      },
      {
        test: /\.js?/,
        include: SOURCE_DIR,
        loader: "eslint-loader",
        options: {
          esversion: 6,
          curly: true,
          freeze: true,
          configFile: __dirname + "/.eslintrc"
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: "[name]__[local]___[hash:base64:5]",
            }
          },
          {
            loader: "sass-loader" // compiles Sass to CSS, using Node Sass by default
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader" // translates CSS into CommonJS
        ]
      }
    ]
  }
};
