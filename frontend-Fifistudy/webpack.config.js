var webpack = require('webpack')
var path = require('path')
var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');
var config = {
    entry: [APP_DIR + '/index.jsx'],
    output: {
        path: BUILD_DIR,
        publicPath: '/',
        filename: 'bundle.js'
    },
    node: {
        fs: "empty"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'src/client'),
        hot: true,
        inline: true,
        historyApiFallback:true
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
}


module.exports = config;
