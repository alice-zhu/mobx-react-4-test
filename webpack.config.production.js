var path = require('path');
var webpack = require('webpack');
var MiniCssExtractPlugin= require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HotModuleReplacementPlugin = require('webpack-hot-middleware');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')

const devMode = false
console.log("heeeee")
module.exports={
  devtool: 'hidden-source-map',
  mode:"production",
  entry: {
    app:'./src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    chunkFilename: "js/[name].[hash].js",
    filename: "js/[name].[hash].js",
    publicPath: '/'
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false
          }
        }
      })
    ],
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: -20,
          chunks: "all"
        }
      }
    }
  },
  module: {
    rules: [{
      test: /\.js?$/,
      include: path.join(__dirname, 'src'),
      use: [{
        loader:'babel-loader',
        options:{
          presets: ['env',"react"],
          plugins: [
            "transform-decorators-legacy",
            "transform-object-rest-spread",
            "transform-class-properties",
            "transform-runtime"
          ]
        }
      }],
      include: path.join(__dirname, 'src')
    },{
      test:/\.css$/,
      use:[
        devMode ? 'style-loader': MiniCssExtractPlugin.loader,
        'css-loader']
    },{
      test:/\.less$/,
      include:path.join(__dirname,"./src"),
      use: [
        devMode ? 'style-loader': MiniCssExtractPlugin.loader,
        'css-loader', 
        'less-loader']
    },{
      test: /\.(png|jpg|gif|mp4|ogg|svg|woff|woff2)$/,
      use: [{
        loader:'file-loader',
        options:{
          outputPath: 'assets/'
        }
      }]
    }]
  },
  devServer:{
    contentBase: ['dist'],
    publicPath: '/',
    historyApiFallback: true,
    hot: false,
    inline: false,
    disableHostCheck: true,
    host: "0.0.0.0",
    port: 4186
  },
  plugins: [
    new CleanWebpackPlugin(["dist/"],{
      root: __dirname,
      verbose:  true, 
      dry:      false 
    }),
    new HtmlWebpackPlugin({
      template: `src/entry.ejs`,
      filename: 'index.html',
      minify: null,
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/[id].[contenthash].css"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve:{
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  }
}