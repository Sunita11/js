const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const createVariants = require('parallel-webpack').createVariants;
const env = process.env.NODE_EN;


module.exports = {
	mode: env || 'development',
	entry: './src/js/main.js',
	plugins: [
		new CleanWebpackPlugin(['dist']),
    	new HtmlWebpackPlugin({
    		title: 'Output Management'
    	}),
    	new webpack.HotModuleReplacementPlugin(),
    	new UglifyJSPlugin({
    		sourceMap: true
    	})
    ],
	output: {
		filename: '[name].[hash].js',
		path: path.resolve(__dirname, 'dist/script'),
		publicPath: '/'
	},
	module: {
		rules: [
			/* {
				 test: /\.js$/,
				 loader: ['babel-loader'],
				 query: {
					 presets : ['env']
				 }
			 },
			 {
				 test: /\.scss$/,
				 loader: 'scss-loader',
				 options: {
					 modules: true
				 }
			 },*/
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		],
    },

    devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 8000,
    	historyApiFallback: true,
    	hot: true
	}
}

