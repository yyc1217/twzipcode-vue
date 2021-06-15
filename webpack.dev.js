const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  entry: {
    demo: './src/demo/demo.js',
    twzipcode: './src/index.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      template: './src/demo/demo.html'
    }),
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    open: true
  },
  performance: {
    hints: false
  },
  devtool: 'eval-source-map'
})
