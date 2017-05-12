var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    bundle: ['./app/index', 'webpack-hot-middleware/client', 'webpack/hot/dev-server'],
    vendor: ['react', 'redux', 'react-redux', 'font-awesome/scss/font-awesome.scss']
  },
  output: {
    filename: 'js/[name].[hash:8].js',
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
              presets: ['es2015', 'react'],
              plugins: ['syntax-dynamic-import']
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              localIdentName: '[hash:base64:5]'
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: 'file-loader?name=[hash].[ext]&publicPath=/assets/images/&outputPath=images/'
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader?name=[name].[ext]&publicPath=http://localhost:3000/assets/fonts/&outputPath=fonts/'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'app/index.pug',
      hash: false
    })
  ]
};