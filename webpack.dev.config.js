var webpack  = require('webpack');
var path = require('path');

var APP_PATH = path.resolve(__dirname,'./src/js/app.js');
var BUILD_PATH = path.resolve(__dirname,'./server/public/javascripts');
var TMP_PATH = path.resolve(__dirname,'./templates/index.html');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
	entry: {
		app: APP_PATH,
		vendor: ['react','react-dom','flux']
	},
	output: {
		path: BUILD_PATH,
		filename: '[name].js'
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({name:'vendor',filename:'vendor.js'}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new HtmlWebpackPlugin({
			title: 'react-hichat',
			template: TMP_PATH,
			filename: 'index.html',
			chunks: ['app','vendor'],
			inject: 'body'
		}),
		new OpenBrowserPlugin({
			url: 'http://localhost:8080',
			browser: 'chromium-browser'
		})
	],
	devServer: {
		hot: true,
		inline: true,
		proxy: {
			'/api/*':{
				target: 'http://localhost:3000',
				secure: false
			},
			'/static/*':{
				target: 'http://localhost:3000',
				secure: false
			}
		}
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel'],
			exclude: '/node_modules/',
			query: ['react','es2015','stage-0','react-hmre']
		}]
	}
}