const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/js/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist',
        host: '0.0.0.0'
    },
    plugins: [
        new HtmlWebpackPlugin ({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "css/style.css"
          }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "sass-loader"
                ]
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,  
                use: [{
                    loader: 'file-loader',
                    options: { 
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        publicPath: 'img/'
                    } 
                }]
            }
        ]
    }
};