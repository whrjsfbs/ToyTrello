/* eslint-disable */
const path = require("path")
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const apiMocker = require("connect-api-mocker")

module.exports = {
    mode: "development",
    entry: {
        main: "./src/app.jsx",
    },
    output: {
        filename: "[name].js",
        path: path.resolve("./dist"),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    process.env.NODE_ENV === "production" 
                        ? MiniCssExtractPlugin.loader
                        : "style-loader", "css-loader"
                ],
            },
            {
                test: /\.png$/,
                use: {
                    loader: 'url-loader',
                    options: {
                    // publicPath: './dist/', // file-loader와 동일
                    name: '[name].[ext]?[hash]',
                    limit: 5000
                    }
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader", // 바벨 로더를 추가한다
            },
        ]
    },
    devServer: {
        contentBase: path.resolve("./dist"),
        publicPath: "/",
        overlay: true,
        port: 8080,
        stats: "errors-only",
        historyApiFallback: true,    
        // hot: true,
        before: app => {
            app.use(apiMocker("/api", "mocks/api"))
        },
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: '이것은 배너 입니다',
        }),
        new webpack.DefinePlugin({
            TWO: "1+1"
        }),
        new HtmlWebpackPlugin({
            template: "./index.html",
            templateParameters: {
                env: process.env.NODE_ENV === "production" ? '' : '(개발용)'
            },
            minify: process.env.NODE_ENV === "production" ? {
                collapseWhitespace: true,
                removeComments: true
            } : false
        }),
        new CleanWebpackPlugin(),
        ...(process.env.NODE_ENV === "production"
            ? [new MiniCssExtractPlugin({ filename: `[name].css`})]
            : []),
    ]
}