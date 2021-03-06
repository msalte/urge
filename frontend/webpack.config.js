const path = require("path");

const SOURCE_DIR = path.resolve(__dirname, "src");
const DEST_DIR = path.resolve(__dirname, "../backend/Urge.SPA/wwwroot");

module.exports = {
    mode: "development",
    entry: SOURCE_DIR + "/app.js",
    output: {
        filename: "urge.js",
        path: DEST_DIR,
    },
    resolve: {
        alias: {
            components: path.resolve(SOURCE_DIR, "components"),
            global: path.resolve(SOURCE_DIR, "global"),
            ext: path.resolve(SOURCE_DIR, "ext"),
        },
    },
    module: {
        rules: [
            {
                test: /\.js?/,
                include: SOURCE_DIR,
                exclude: [
                    path.resolve(
                        SOURCE_DIR,
                        "ext/az-storage/azure-storage.blob.min.js"
                    ),
                ],
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-react"],
                    plugins: [
                        require("@babel/plugin-proposal-class-properties")
                            .default,
                    ],
                },
            },
            {
                test: /\.js?/,
                include: SOURCE_DIR,
                loader: "eslint-loader",
                options: {
                    esversion: 6,
                    curly: true,
                    freeze: true,
                    configFile: __dirname + "/.eslintrc",
                },
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader", // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader", // translates CSS into CommonJS
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: "[name]__[local]___[hash:base64:5]",
                        },
                    },
                    {
                        loader: "sass-loader", // compiles Sass to CSS, using Node Sass by default
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                ],
            },
            {
                test: /\.(woff2?|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader",
                options: {
                    outputPath: "/fonts",
                },
            },
        ],
    },
};
