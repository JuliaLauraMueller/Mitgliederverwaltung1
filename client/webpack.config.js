const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: ['@babel/polyfill'],
    bundle: './src/index.js',
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: './public/img/[name].[ext]'
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true, // allow manual loading of a specific url in the browser
    port: 3000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './public/favicon.ico'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    // new CopyWebpackPlugin([{ from: 'public/img', to: 'img' }]), // copy images from public/img to dist/img
    new CopyWebpackPlugin([{ from: 'public/fonts', to: 'fonts' }]) // copy fonts from public/fonts to dist/fonts
  ]
};
