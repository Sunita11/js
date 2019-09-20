const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    entry: {
        main: './src/index.jsx'
    },
    mode: 'development',
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port:7777,
        index: 'index.html',
        hot:true
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [ {
            test: /\.json$/,
            loader: 'json-loader'
        },{
            test:  /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.(scss|css)$/,
            use: [{
                loader: "style-loader", options: {
                    sourceMap: true
                }
            }, {
                loader: "css-loader", options: {
                    sourceMap: true,
                    modules: true,
                }
            }, {
                loader: "sass-loader", options: {
                    sourceMap: true
                }
            }]
        },
        {
            test: /\.(csv|tsv)$/,
            use: [
                'csv-loader'
            ]
        },
        {
            test: /\.xml$/,
            use: [
                'xml-loader'
            ]
        }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization: {
        minimize: false
    }
  };