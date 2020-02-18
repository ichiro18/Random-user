const StyleLintPlugin = require('stylelint-webpack-plugin');

exports.config = {
    module: {
        rules: [
            // ES Lint
            {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new StyleLintPlugin({
            files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
        })
    ]
};