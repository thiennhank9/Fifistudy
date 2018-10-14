const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

var PROJ_DIR = path.resolve(__dirname, 'src/client');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

module.exports = {
    entry: [APP_DIR + '/index.jsx'],
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CleanWebpackPlugin(['dist']),
        // new HtmlWebpackPlugin({
        //    template:"/src/client/index.html "
        // }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],

    output: {
        path: BUILD_DIR,
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [ {
            test: require.resolve("jquery"),
            use: "imports-loader?this=>window"
        },{
            test: /\.html$/,
            loader: 'html-loader?attrs[]=video:src'
        }, {
            test: /\.mp4$/,
            loader: 'url?limit=10000&mimetype=video/mp4'
        },
            {test: /\.(js|jsx)$/, exclude: /node_modules/, loaders: ['babel-loader']},
            {test: /(\.css)$/, loaders: ['style-loader', 'css-loader']},
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015'],
                    plugins: ['transform-class-properties']
                }
            },
            {
                test: /\.vtt/,
                use: 'raw-loader'
            }
        ],


    }
};