const { resolve } = require('path')

module.exports = {
  entry: {
    github: [
      './components/build-list',
      './components/build',
      './index'
    ],
    options: [
      './options/options',
      './options/index'
    ]
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      riot: 'riot/riot.csp.js'
    },
    extensions: ['.js', '.tag']
  },
  context: resolve(__dirname, 'src'),
  module: {
    rules: [
      {
        test: /\.tag$/,
        use: ['riot-tag-loader'],
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map'
}
