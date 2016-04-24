var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var devFlagPlugin = new webpack.DefinePlugin({  
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
	devtool: 'inline-source-map',
	entry: {
		// index: ['webpack-dev-server/client?http://127.0.0.1:8080/',
		// 	'webpack/hot/only-dev-server',
		// 	'./client/js'
		// ],
		display: './client/js/display/main.js',
		controller: './client/js/controller/main.js'
	},
	output: {
		path: './public/js',
		filename: '[name].bundle.js'	
	},
	resolve: {
		moduleDirectories: ['node_modules'],
		extensions: ['', '.js']
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
			}, {
				test: /\.hbs?$/,
				exclude: /node_modules/,
				loader: 'handlebars-loader'
			},
			{
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		devFlagPlugin
	]
};