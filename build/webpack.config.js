const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: {
        'mime-matcher': '@/index.js',
        'mime-matcher.min': '@/index.js',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '',
        filename: "[name].js",
        library: 'mime-matcher',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, "../src")
        }
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ],
    module: {
        loaders: [{
            test: /\.txt$/,
            loader: 'raw-loader'
        },{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
}
