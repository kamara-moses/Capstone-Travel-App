const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin'); // configure webpack to copy all img resources to the dist folder

module.exports = {
    entry: './src/client/index.js',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    devServer: {
        contentBase:  path.join(__dirname, 'dist'),
        compress: true,
        port: 8080
      },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                  name: '[path][name].[ext]',
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            // refer below index.html
            template: "./src/client/views/index.html",
            // and dynamically create a new index.html in dist folder
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),

        // ref: https://www.npmjs.com/package/copy-webpack-plugin
        new CopyPlugin({
            patterns: [
                // copy images and make a img folder in dist for the reference
              { from: './src/client/media', to: './media' }
            ]
        })
    ]
}
