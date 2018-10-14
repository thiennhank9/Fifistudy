const merge = require('webpack-merge');
const common = require('./webpack.common.js');

var path = require('path');
module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        // contentBase:'./dist',
        contentBase: path.resolve(__dirname, 'src/client'),
        hot: true,
        inline: true,
        historyApiFallback:true
    },
});