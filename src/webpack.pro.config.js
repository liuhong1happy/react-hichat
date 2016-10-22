var webpack = require('webpack');
var path = require('path');

var CopyWebpackPlugin = require('copy-webpack-plugin');

var APP_PATH = path.resolve(__dirname,'./js/app.js');
var BUILD_PATH = path.resolve(__dirname, '../server/public/js');
var COPY_PATH = path.resolve(__dirname,"../server/public/images");
var IMAGE_PATH = path.resolve(__dirname,"./images");


module.exports = {
  entry: {
    app: APP_PATH, 
    vendor: ['react','react-dom','material-ui','react-tap-event-plugin'] 
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].min.js' //输出js
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new CopyWebpackPlugin([{from: IMAGE_PATH ,to: COPY_PATH,toType: 'dir',force: true}]),
    new webpack.optimize.CommonsChunkPlugin({name:'vendor', filename: 'vendor.min.js'}),
    new webpack.optimize.UglifyJsPlugin({ 
        minimize: true,
        compress:{
            warnings: false
        }
    })
 ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [ 'babel-loader?presets[]=es2015,presets[]=react,presets[]=stage-0' ],
      exclude: /node_modules/
    },{
        test: /\.less$/,
        loaders: ['style','css','less']
    }
    ]
  }
};
