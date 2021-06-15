const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [
    merge(common, {
        mode: 'production',
        entry: {
            twzipcode: './src/index.js'
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: '[name].umd.js',
            clean: true,
            library: {
                name: 'TwZipcode',
                type: 'umd'
            }
        },
        externals: {
            vue: 'vue'
        },
        devtool: 'source-map',
        stats: {
            assets: true
        }
    }),
    merge(common, {
        mode: 'production',
        entry: {
            demo: './src/demo/demo.js',
        },
        output: {
            path: path.resolve(__dirname, '../docs'),
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
            new HtmlWebpackPlugin({
                template: './src/demo/demo.html'
            }),
        ],
        devtool: 'source-map',
    })
]