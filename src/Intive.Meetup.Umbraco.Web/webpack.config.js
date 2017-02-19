const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = makeWebpackConfig(); //this parenthesis are *REALLY* important for test

function makeWebpackConfig() {
    const ENV = process.env.npm_lifecycle_event;
    const isTest = ENV === 'tests' || ENV === 'tests:watch';

    const config = {};

    config.entry = isTest ? void 0 : {
        app: './App_Frontend/js/app.js'
    };

    config.output = isTest ? {} : {
        path: `${__dirname}/dist`,
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
    };

    if (isTest) {
        config.devtool = 'inline-source-map';
    } else {
        config.devtool = 'eval-source-map';
    }

    config.module = {
        rules: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    };

    if (isTest) {
        config.module.rules.push({
            enforce: 'pre',
            test: /\.js$/,
            exclude: [
                /node_modules/,
                /\.spec\.js$/
            ],
            loader: 'istanbul-instrumenter-loader',
            query: {
                esModules: true
            }
        })
    }

    config.plugins = [];

    if (!isTest) {
        config.plugins.push(
            new HtmlWebpackPlugin({
                template: './Views/Templates/_Layout.cshtml',
                filename: '../Views/_Layout.cshtml',             //this path is relative to dist
                inject: 'body',
                year: new Date().getFullYear()                   //we can pass variables to template and use templates,
                                                                 // by default ejs template is used
            })
        );
    }
    return config;
}