const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge')
const baseConfig = require('./base.config.js');
const WebpackAutoInject = require('webpack-auto-inject-version');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(baseConfig, {
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].[hash:6].js',
    publicPath: '/apps/sourceapp/',
    chunkFilename: '[name].[Chunkhash:6].chunk.js',
  },
  plugins: [
    new WebpackAutoInject({
      components: {
        AutoIncreaseVersion: false
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.HashedModuleIdsPlugin(), 
    new CleanWebpackPlugin(['./build']),
    new ExtractTextPlugin({
      filename: '[name].[md5:contenthash:hex:6].css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      filename: 'index.html',
      template: './index.html',
      favicon: 'src/assets/images/favicon.ico',
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: false,
      },
    }),
  ],
  optimization: {
    nodeEnv: 'production',
    namedModules: true,
    namedChunks: true,
    splitChunks: {
      chunks: 'async',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        node_vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "async",
          priority: 1,
        }
      },
      name: false,
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true,
        },
        sourceMap: true,
      }),
    ],
  },
  devtool: 'source-map',
});
