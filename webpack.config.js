//webpack.config.js
var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry: './client/index.js',
    output: {
        path: path.join(__dirname, 'client'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react','react-hmre'],
                plugins: ['transform-class-properties']
            }
        },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }]
    }
}