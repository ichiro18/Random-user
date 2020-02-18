const config = require('../common/config');

exports.config = {
    contentBase: config.PATH.dist,
    compress: true,
    hot: true,
    open: false,
    port: 3000,
    quiet: true,
};
