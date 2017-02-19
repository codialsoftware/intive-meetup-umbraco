const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = makeWebpackConfig;

function makeWebpackConfig() {
    const config = {};

    config.entry = {
        app: './App_Frontend/js/app.js'
    };

    config.output = {
        path: `${__dirname}/dist`,
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
    };

    config.devtool = 'eval-source-map';

    config.module = {
        rules: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    };

    config.plugins = [];

    config.plugins.push(
        new HtmlWebpackPlugin({
            template: './Views/Templates/_Layout.cshtml',
            filename: '../Views/_Layout.cshtml',             //this path is relative to dist
            inject: 'body',
            year: new Date().getFullYear()                   //we can pass variables to template and use templates,
                                                             // by default ejs template is used
        })
    );

    return config;
}