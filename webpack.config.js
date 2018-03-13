const path = require('path');
const env = process.env.NODE_EN;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	mode: env || 'development',
	//entry: './src/scripts/main.js',
	entry: {
		app: './src/scripts/main.js',
		print: './src/scripts/print.js'
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
    	new HtmlWebpackPlugin({
    		title: 'Output Management'
    	})
    ],
	output: {
		//filename: 'bundle.js',
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist/script')
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
            }
        ],
    },

    devServer: {
    	contentBase: './',
    	port: 8000,
    	historyApiFallback: true
    }
}