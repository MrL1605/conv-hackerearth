const webpack = require("webpack");
const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
// const ClosurePlugin = require('closure-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
    entry: {
        "app": "./app/main"
    },
    mode: "production",
    output: {
        path: __dirname + "/_dist",
        publicPath: '/clari5-cc/cc/_dist/',
        filename: "[name].bundle.js",
        chunkFilename: "[name].bundle.js"
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                init: {
                    chunks: 'initial',
                    name: 'init',
                    enforce: true,
                    reuseExistingChunk: true
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({parallel: true}),
            // Removed as browser does not decompress on its own.
            // Add if web server supports decompression
            // new CompressionPlugin({cache: true}),

            // Need to check if these are worth using as,
            // right not they are just increasing build time and
            // not giving any benefits
            // new MinifyPlugin()
            // new ClosurePlugin({mode: 'AGGRESSIVE_BUNDLE'}, {})
        ],
        runtimeChunk: true,
        mangleWasmImports: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, 'app'),
                use: [{
                    loader: "ts-loader",
                    options: {
                        // cacheDirectory: true,
                        // plugins: ['react-hot-loader/babel'],
                        transpileOnly: true
                    }
                }, {loader: "angular-router-loader"}],
            },
            {
                test: /\.css/,
                include: path.resolve(__dirname, 'app'),
                use: [
                    {loader: "style-loader"},
                    {loader: 'css-loader'}
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        symlinks: false,
        cacheWithContext: false,
        extensions: ['.ts', '.js'],
        modules: [
            path.join(__dirname, "src"),
            path.join(__dirname, "node_modules") // the old 'fallback' option (needed for npm link-ed packages)
        ],
    },
    plugins: []
};
