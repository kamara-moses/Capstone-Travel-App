const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/client/index.js",
    mode: "development",
    devtool: "source-map",
    stats: "verbose",
    devServer: {
        hot: true,
        contentBase: (__dirname, 'dist'),
        publicPath: '/',
        proxy: {
          '/add': {
            target: 'http://localhost:8000',
            secure: false,
            changeOrigin: true,
          },
          "/retrieve": {
              target: "http://localhost:8000",
              secure: false,
              changeOrigin: true
          }
        },
    },
    module: {
        rules: [
            {
                test: "/\.js$/",
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ "style-loader", "css-loader", "sass-loader" ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            file: "./index.html"
        }),
        new CleanWebpackPlugin({
            // Simulate the removal files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ]
}