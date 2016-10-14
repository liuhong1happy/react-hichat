var webpack  = require('webpack');
var path = require('path');

var APP_PATH = path.resolve(__dirname,'./src/js/app.js');
var BUILD_PATH = path.resolve(__dirname,'./server/public/javascripts');
var TMP_PATH = path.resolve(__dirname,'./templates/index.html');

module.exports = {
	entry: {
		app: APP_PATH,
		vendor: ['react','react-dom','flux']
	},
	output: {
		path: BUILD_PATH,
		filename: '[name].min.js'
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({name:'vendor',filename:'vendor.min.js'}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	],
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel'],
			exclude: '/node_modules/',
			query: ['react','es2015','stage-0']
		}]
	}
}