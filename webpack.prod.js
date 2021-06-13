const { merge } = require('webpack-merge')
const devConfig = require('./webpack.dev.js')

module.exports = merge(devConfig, {
    mode: 'production',
    devtool: 'source-map'
})