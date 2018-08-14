const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');


module.exports = {
  entry: [
    './src/index.js',
    './scss/main.scss'],
  output:{
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.[hash].js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './',
    hot: true,
    port: 9999
  },
  watch: true,
  stats: {
    // One of the two if I remember right
    entrypoints: false,
    children: false
 },
  performance: { hints: false },
  module: {
    rules: [
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
        use: 'url-loader'
      },
      {
        test: /\.(html)$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true,
            removeComments: false,
            collapseWhitespace: false
          }
        }]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [

    new MiniCssExtractPlugin({
      filename: '[name].[hash].min.css'
    }),
    new HtmlWebpackPlugin ({
      template: './src/index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}