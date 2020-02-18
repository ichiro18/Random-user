const baseConfig = require('../webpack.base.config');

exports.config = {
    contentBase: baseConfig.PATH.dist,
    compress: true,
    hot: true,
    open: false,
    port: 3000,
    quiet: true
};