const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const localCss = new ExtractTextPlugin('styles-local.css');
const globalCss = new ExtractTextPlugin('styles-global.css');

const config = {
  entry: ['babel-polyfill', 'react-hot-loader/patch', './src/index.js'],
  output: {
    path: path.resolve(__dirname, './dist/'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env', {"modules": false}], 'react']
          }
        }
      },
      {
        test: /^((?!\.bootstrap|bootstrap-theme).)*\.scss$/,
        use: localCss.extract({
          fallback: "style-loader",
          use: ["css-loader?modules=true&localIdentName=[name]__[local]__[hash:base64:5]", 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /(\.bootstrap\.css$|bootstrap-theme.css|bootstrap.css)/,
        use: globalCss.extract({
          fallback: "style-loader",
          use: ["css-loader", 'postcss-loader', 'sass-loader']
        })
      },
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/i,
      //   loaders: [
      //       'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
      //       'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
      //   ]
      // }
    ]
  },
  plugins: [
    localCss,
    globalCss,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
    // new HtmlWebpackPlugin({
    //   title: 'D3',
    // }),
    // new HtmlWebpackPlugin({
    //   title: 'Crypto',
    //   filename: '200.html',
    // }),
  ]
};

module.exports = config;