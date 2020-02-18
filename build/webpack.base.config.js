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
const config = require('./common/config');
const packageConfig = require('../package.json');
// * Loaders
const scriptLoader = require('./loaders/script.loader');
const styleLoader = require('./loaders/style.loader');
const imageLoader = require('./loaders/image.loader');
const fontLoader = require('./loaders/font.loader');
// * Workflow
const linters = require('./workflow/linters.config');

// ! # Config
const baseConfig = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        index: path.join(config.PATH.source, 'index.js'),
    },
    output: {
        path: config.PATH.dist,
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@project_src': config.PATH.source,
        },
    },
};

const basePlugins = {
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: false,
            template: require('html-webpack-template'),
            appMountId: 'app',
            title: packageConfig.title,
        }),
    ],
};

module.exports = merge(
    baseConfig,
    basePlugins,
    // Loaders
    scriptLoader.config,
    styleLoader.config,
    imageLoader.config,
    fontLoader.config,
    linters.config
);
