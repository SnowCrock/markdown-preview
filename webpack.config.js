const path = require('path')
const webpack = require('webpack')

module.exports = {
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
  },
  devtool: 'source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.md$/,
        use: './loaders/index.js',
      },
      {
        test: /utils\/data.js/,
        use: './loaders/utils-loader.js'
      }
    ]
  }
}