var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var APP_PATH = path.resolve(__dirname,'./js/app.js');
var BUILD_PATH = path.resolve(__dirname, '../dist');
var TMP_PATH = path.resolve(__dirname,'./templates/index.html');
var COPY_PATH = path.resolve(__dirname,"../dist/static/images");

module.exports = {
  entry: {
    app: APP_PATH, 
    vendor: ['react','react-dom','material-ui','react-tap-event-plugin'] 
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].js' //输出js
  },
  plugins: [
    new CopyWebpackPlugin([{from: "./src/images" ,to:"/static/images"}]),
    new webpack.optimize.CommonsChunkPlugin({name:'vendor', filename: 'vendor.js'}),
    new webpack.optimize.UglifyJsPlugin({ 
        minimize: true,
        compress:{
            warnings: false,
            drop_debugger: true,
            drop_console: true
        }
    }), 
    new HtmlWebpackPlugin({
        title: '智汇学习',
        template: TMP_PATH,
        filename: 'index.html',
        chunks: ['app','vendor'],
        inject: 'body'
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
      //browser: 'chromium-browser' // mac调试时需要注释该行
    })
  ],
  devServer: {
    hot: true,
    proxy: {
      '/api/*': {
          target: 'http://localhost:8081',
          secure: false
      }
    }
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [ 'babel-loader?presets[]=es2015,presets[]=react,presets[]=stage-0,presets[]=react-hmre' ], // ie8调试时，去掉
      exclude: /node_modules/
    },{
        test: /\.less$/,
        loaders: ['style','css','less']
    }
    ]
  }
};