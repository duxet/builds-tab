const { resolve } = require('path')

module.exports = {
    entry: [
      './components/build-list',
      './components/build',
      './index'
    ],
    output: {
        filename: 'index.js',
        path: resolve(__dirname, 'dist')
    },
    resolve: {
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
    }
}
