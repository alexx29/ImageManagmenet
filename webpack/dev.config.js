const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge')
const baseConfig = require('./base.config.js');
const WebpackAutoInject = require('webpack-auto-inject-version');

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'app.bundle.js',
    publicPath: '/',
    chunkFilename: '[name].chunk.js',
  },
  plugins: [
    new WebpackAutoInject({
      components: {
        AutoIncreaseVersion: false
      }
    }),
    new CleanWebpackPlugin(['./build']),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      template: './index.html',
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: false,
      },
    }),
  ],
  devServer: {
    watchOptions: { ignored: /node_modules/ },
    historyApiFallback: true,
    contentBase: '/',
    hot: true,
  },
});
