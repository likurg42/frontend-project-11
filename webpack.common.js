const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const path = require('path');
const prodConfig = require('./webpack.prod.js');
const devConfig = require('./webpack.dev.js');

const baseConfig = {
    entry: path.join(__dirname, 'src', 'index.js'),
    mode: process.env.NODE_ENV || 'development',
    resolve: {
        extensions: ['.js'],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.[contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'esbuild-loader',
                    options: {
                        target: 'es2015',
                    },
                },
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'asset/inline',
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
            filename: 'index.html',
            scriptLoading: 'blocking',
        }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? prodConfig : devConfig;

    return merge(baseConfig, envConfig);
};
