const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    moudule: {
        rule: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    devServer: {
        watchFiles: path.join(__dirname, '*.html'),
        port: 8080,
        hot: true,
    },
};
