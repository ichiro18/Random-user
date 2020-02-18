'use strict';

// ! # Dependencies
// * Global
const merge = require('webpack-merge');
// * Configs
const config = require('./common/config');
const baseConfig = require('./webpack.base.config');


// ! # Config
const devConfig = {
    mode: 'production',
    devtool: 'inline-source-map',
    output: {
        path: config.PATH.doc,
        filename: '[name].js',
        publicPath: '/Random-user/'
    },
    optimization: {
        minimize: true
    }
};

const devPlugins = {
    plugins: []
};

module.exports = merge(
    baseConfig,
    devConfig,
    devPlugins
);
