const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  // resolve: {
  // fallback: {
  //   "path": require.resolve("path-browserify"),
  //   "util": require.resolve("util"),
  //   "assert": require.resolve("assert"),
  //   "constants": require.resolve("constants-browserify"),
  //   "os": require.resolve("os-browserify/browser"),
  //   "https": require.resolve("https-browserify"),
  //   "http": require.resolve("stream-http"),
  //   "querystring": require.resolve("querystring-es3"),
  //   "url": require.resolve("url/"),
  //   "vm": require.resolve("vm-browserify"),
  //   "zlib": require.resolve("browserify-zlib"),
  //   "crypto": require.resolve("crypto-browserify")
  // }
  // },
  // externals: {
  //   sharp: 'commonjs sharp'
  // },
  output: {
    filename: '[name].bundle.js',
    clean: true,
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          }
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: path.resolve(__dirname, 'src/scripts/sw.js'),
      swDest: './sw.bundle.js',
    }),
  ],
};
