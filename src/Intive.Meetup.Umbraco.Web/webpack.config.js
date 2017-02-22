const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = makeWebpackConfig(); //this parenthesis are *REALLY* important for test

function makeWebpackConfig() {
    const ENV = process.env.npm_lifecycle_event;
    const isTest = ENV === 'tests' || ENV === 'tests:watch';
    const isProd = ENV === 'build:prod';

    const config = {};

    config.entry = isTest ? void 0 : {
        app: [
            './App_Frontend/js/app.js',
            './App_Frontend/scss/app.scss'],
        vendors: [
            'jquery',
            './node_modules/foundation-sites/dist/js/foundation.js'
        ]
    };

    config.output = isTest ? {} : {
        path: `${__dirname}/dist`,
        filename: isProd ? '[name].[chunkhash].js' : '[name].bundle.js',
        chunkFilename: isProd ? '[name].[chunkhash].js' : '[name].bundle.js'
    };

    if (isTest) {
        config.devtool = 'inline-source-map';
    } else if (isProd) {
        config.devtool = 'cheap-module-source-map';
    } else {
        config.devtool = 'eval-source-map';
    }

    config.module = {
        rules: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                // ASSET LOADER
                // Reference: https://github.com/webpack/file-loader
                // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
                // Rename the file using the asset hash
                // Pass along the updated reference to your code
                // You can add here any file extension you want to get copied to your output
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file-loader'
            },
            {
                test: /\.scss$/,
                use: isTest ? 'null-loader' : ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: function () {
                                    return [
                                        autoprefixer
                                    ];
                                }
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
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

    config.plugins = [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ];

    if (!isTest) {
        config.plugins.push(
            new HtmlWebpackPlugin({
                template: './Views/Templates/_Layout.cshtml',
                filename: '../Views/_Layout.cshtml',             //this path is relative to dist
                inject: 'body',
                year: new Date().getFullYear()                   //we can pass variables to template and use templates,
                                                                 // by default ejs template is used
            }),
            new ExtractTextPlugin(`css/[name].${isProd ? '[contenthash]' : 'bundle'}.css`),
            new webpack.optimize.CommonsChunkPlugin({
                names: ["vendors", "manifest"],
            })
        );
    }

    if (isProd) {
        config.plugins.push(
            // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
            // Only emit files when there are no errors
            new webpack.NoErrorsPlugin()
        )
    }

    return config;
}