var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    bundle: ['./app/index']
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'public/assets'),
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /.(pug|jade)$/,
        use: 'pug-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react']
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: 'file-loader?name=[hash].[ext]&publicPath=/assets/images/&outputPath=images/'
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader?name=[name].[ext]&publicPath=/assets/fonts/&outputPath=fonts/'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'app/index.pug',
      hash: true
    })
  ]
};