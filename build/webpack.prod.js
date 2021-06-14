const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        clean: true
    },
    externals: {
        vue: 'vue'
    },
    devtool: 'source-map'
})