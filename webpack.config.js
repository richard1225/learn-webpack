const path = require('path')
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var isProd = process.env.NODE_ENV === 'production'; // true or false
var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssProd = ExtractTextPlugin.extract({
	fallback: 'style-loader',
	//resolve-url-loader may be chained before sass-loader if necessary
	use: ['css-loader', 'sass-loader']
});

var cssConfig = isProd ? cssProd : cssDev;

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js'
  },
  plugins: [new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
    }),
	new ExtractTextPlugin({
		filename:'style.css',
		disable: !isProd
	}),
	new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer:{
	  port: 9000,
	  open: true,
	  hot: true
  },
  module: {
    rules: [
      {
		test: /\.scss$/,
		use: cssConfig
      }
    ]
  }
};