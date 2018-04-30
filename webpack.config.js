var path = require('path');
var webpack = require('webpack');
var MiniCssExtractPlugin= require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HotModuleReplacementPlugin = require('webpack-hot-middleware');

const devMode = true
module.exports= env=> {
  console.log("env",env);
  return {
    devtool: 'eval',
    mode:'development',
    entry: {
      app:'./src/index.js'
    },
    output: {
      path: path.join(__dirname, 'dist-dev'),
      filename: 'bundle.js'
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
              "transform-class-properties",
              "transform-decorators-legacy",
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
          {loader:'css-loader',options:{
            // modules:true,
            // sourceMap: true
          }}, 
          { loader:'less-loader',options:{
            sourceMap: true
          }}]
      },{
        test: /\.(png|jpg|gif|mp4|ogg|svg|woff|woff2)$/,
        use: [{
          loader:'file-loader',
          options:{
            outputPath: 'assets/fonts/'
          }
        }]
      }]
    },
    devServer:{
      contentBase: ['dist-dev'],
      historyApiFallback: true,
      hot: true,
      inline: true,
      disableHostCheck: true,
      host: "0.0.0.0",
      port: 4186
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `src/entry.ejs`,
        filename: 'index.html',
        minify: null,
        hash: true,
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        chunkFilename: "[id].[contenthash].css"
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    resolve:{
      modules: [path.resolve(__dirname, "src"), "node_modules"]
    }
  }
}