const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src') + '/apisearch.js',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ]
    },
    output: {
        chunkFilename: "[name].min.js",
        devtoolModuleFilenameTemplate: "[absolute-resource-path]",
        filename: "[name].min.js",
        libraryTarget: "var",
        path: path.join(__dirname, "public"),
    },
    resolve: {
        modules: [
            path.resolve('./node_modules'),
            path.resolve('./src')
        ],
        extensions: ['.json', '.js']
    },
    plugins: []
};