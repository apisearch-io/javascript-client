/**
 * Webpack
 */
const path = require('path');
const webpack = require('webpack');
const ENV = require('yargs').argv.env;

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');

const LIBRARY_NAME = 'apisearch';
let plugins = [], filename;

/**
 * Environment dependencies
 */
if (ENV === 'build') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {warnings: false},
        output: {comments: false}
    }));
    filename = LIBRARY_NAME + '.min.js';
} else {
    filename = LIBRARY_NAME + '.js';
}

/**
 * Webpack configuration
 */
module.exports = {
    entry: SRC_DIR + '/apisearch.js',
    devtool: 'source-map',
    output: {
        path: DIST_DIR,
        filename: filename,
        libraryTarget: 'var',
        library: 'apisearch',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: SRC_DIR,
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve('./node_modules'),
            path.resolve('./src')
        ],
        extensions: ['.json', '.js']
    },
    plugins: plugins
};