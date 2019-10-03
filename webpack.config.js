const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const createVariants = require('parallel-webpack').createVariants;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const env = process.env.NODE_EN;


module.exports = {
	mode: env || 'development',
	entry: './src/js/main.js',
	plugins: [
		new CleanWebpackPlugin(['dist']),
    	new HtmlWebpackPlugin({
			title: 'Output Management',
			template: __dirname + '/index.html',
			filename: 'index.html'
		}),
		new HtmlWebpackPlugin({
			title: 'About Page',
			template: __dirname + '/src/pages/about.html',
			filename: 'about.html'
		}),
		new HtmlWebpackPlugin({
			title: 'Contact Page',
			template: __dirname + '/src/pages/contact.html',
			filename: 'contact.html'
    	}),
    	new webpack.HotModuleReplacementPlugin(),
    	new UglifyJSPlugin({
    		sourceMap: true
		}),
		new MiniCssExtractPlugin({
			filename: 'style.css',
		  })
    ],
	output: {
		// filename: '[name].[hash].js',
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist/script'),
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test:  /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				test: /\.(scss|css)$/,
				use: [{
					loader: "style-loader", options: {
					}
				},{
					loader: MiniCssExtractPlugin.loader
				}
				, {
					loader: "css-loader", options: {
					}
				}, {
					loader: "sass-loader", options: {
					}
				}]
			},
		],
    },

    devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 8000,
    	historyApiFallback: true,
    	hot: true
	}
}

