const webpack = require("webpack");
const path = require("path");
const WebpackShellPlugin = require("./shellWebpackPlugin");

module.exports = {
    entry: {
        "app": "./app/main"
    },
    mode: "development",
    output: {
        path: __dirname + "/_dist",
        publicPath: '/clari5-cc/cc/_dist/',
        filename: "[name].bundle.js",
        chunkFilename: "[name].bundle.js",
        pathinfo: false
    },
    watch: true,
    devtool: 'source-map',
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
    optimization: {
        splitChunks: false,
        removeAvailableModules: false,
        removeEmptyChunks: false
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
    plugins: [
        new WebpackShellPlugin({
            onBuildEnd: [
                "cp -v ~/cx/mod/cc/angular/_dist/* " +
                "~/cxps/dev/Clari5-EFM-4.8-dev-baseline/deployment/tomcat/webapps/clari5-cc/cc/_dist/",
                'echo "Most recent build completed at: `date`"'
            ]
        })
    ]
};
