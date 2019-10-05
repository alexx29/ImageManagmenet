const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  cache: false,
  entry: [ '@babel/polyfill', "./src/js/main.js"],
  devtool: "source-map-eval",
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [path.resolve('./src/'), path.resolve('./src/components'), "node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader?-minimize&limit=1024",
            {
              loader: "sass-loader", options: {
                limit: 1024,
                sourceMap: true,
                data: '@import "assets/styles/colors"; @import "assets/styles/sizes";',
                includePaths: [path.join(__dirname, '../src')],
              },
            },
          ],
        }),
      },
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: [
            ['@babel/preset-env', {}, 'unique-name-a'],
            ['@babel/preset-react', {}, 'unique-name-a'],
          ],
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[sha512:hash:base64:6].[ext]',
            }
          }
        ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          Object.assign({
            fallback: {
              loader: require.resolve('style-loader'),
              options: {
                hmr: false,
              },
            },
            use: [
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  minimize: true,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    autoprefixer({
                      browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          }),
        ),
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: require.resolve('file-loader'),
            options: {
              name: '[sha512:hash:base64:6].[ext]',
            },
          },
        ],
      },
    ],
  },
};
