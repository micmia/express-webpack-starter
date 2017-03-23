var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    index: ['./app/components/index', 'webpack-hot-middleware/client', 'webpack/hot/dev-server']
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'public/assets'),
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            }, {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }]
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: 'file-loader?name=[hash].[ext]&publicPath=/assets/images/&outputPath=images/'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader?name=[name].[ext]&publicPath=/assets/fonts/&outputPath=fonts/'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].min.css',
      allChunks: true,
      disable: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};