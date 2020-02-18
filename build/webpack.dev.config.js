'use strict';

// ! # Dependencies
// * Global
const merge = require('webpack-merge');
// * Configs
const baseConfig = require('./webpack.base.config');
// * Plugins
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
// * Workflow
const devServer = require('./workflow/dev-server.config');

// ! # Const
const isDevServer = !!process.argv.find(
    v => v.indexOf('webpack-dev-server') !== -1
);

// ! # Config
const devConfig = {
    mode: 'development',
    devtool: 'source-map',
    devServer: isDevServer ? devServer.config : {}
};

const devPlugins = {
    plugins: [
        new FriendlyErrorsPlugin({
            clearConsole: true,
            compilationSuccessInfo: {
                messages: [
                    isDevServer
                        ? 'Your application is running here http://localhost:3000'
                        : 'Your application is build here ' + baseConfig.PATH.dist
                ]
            }
        })
    ]
};

module.exports = merge(
    baseConfig.config,
    devConfig,
    devPlugins
);