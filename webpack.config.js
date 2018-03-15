const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const env = process.env.NODE_EN;

module.exports = {
	mode: env || 'development',
	entry: './src/scripts/main.js',
	/*entry: {
		app: './src/scripts/main.js',
		print: './src/scripts/print.js'
	},*/
	devtool: 'inline-source-map',
	plugins: [
		new CleanWebpackPlugin(['dist']),
    	new HtmlWebpackPlugin({
    		title: 'Output Management'
    	}),
    	new webpack.NamedModulesPlugin(),
    	new webpack.HotModuleReplacementPlugin()
    ],
	output: {
		//filename: 'bundle.js',
		filename: '[name].bundle.js',
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
    	contentBase: './dist/',
    	//port: 8000,
    	historyApiFallback: true,
    	hot: true
    }
}