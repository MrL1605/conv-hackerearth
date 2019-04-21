"use strict";
const webpack = require('webpack');
const path = require("path");
const loadersConf = require('./webpack.loaders');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: [
        // POLYFILL: Set up an ES6-ish environment
        // 'babel-polyfill',  // The entire babel-polyfill
        // Or pick es6 features needed (included into babel-polyfill)
        'core-js/fn/promise',
        'core-js/es6/object',
        'core-js/es6/array',

        './src/index.tsx', // your app's entry point
    ],
    // mode: "production",
    output: {
        path: __dirname + "/public/app",
        publicPath: '/app/',
        filename: '[name].chunkhash.bundle.js',
        chunkFilename: '[name].chunkhash.bundle.js',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: 'vendor',
                    enforce: true
                },
            }
        },
        // minimizer: [
        //     new UglifyJsPlugin({parallel: true})
        // ],
        runtimeChunk: false
    },
    module: {
        rules: loadersConf
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: [
            path.join(__dirname, "src"),
            path.join(__dirname, "node_modules"), // the old 'fallback' option (needed for npm link-ed packages)
        ],
        alias: {
            "styles": path.resolve(__dirname, 'styles/'),
        }
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
};
