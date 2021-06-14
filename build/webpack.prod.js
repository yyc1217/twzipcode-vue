const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
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
})