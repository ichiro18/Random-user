'use strict';

// ! # Dependencies
// * Global
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
// * Plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// * Config
const packageConfig = require('../package.json');
// * Loaders
const scriptLoader = require('./loaders/script.loader');
const styleLoader = require('./loaders/style.loader');
const imageLoader = require('./loaders/image.loader');
const fontLoader = require('./loaders/font.loader');

// ! # Const
const PATH = {
    source: path.join(__dirname, '../', 'src'),
    dist: path.join(__dirname, '../', 'dist')
};

// ! # Config
const baseConfig = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        index: path.join(PATH.source, 'index.js')
    },
    output: {
        path: PATH.dist,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@project_src': PATH.source
        }
    }
};

const basePlugins = {
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: false,
            template: require('html-webpack-template'),
            appMountId: 'app',
            title: packageConfig.title
        })
    ]
};


module.exports.config = merge(
    baseConfig,
    basePlugins,
    // Loaders
    scriptLoader.config,
    styleLoader.config,
    imageLoader.config,
    fontLoader.config
);


module.exports.PATH = PATH;