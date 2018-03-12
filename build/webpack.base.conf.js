var path = require('path')
var utils = require('./utils')
var config = require('../config')

var vueLoaderConfig = require('./vue-loader.conf')
var autoprefixer = require('autoprefixer');
var webpack = require("webpack")
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
function resolveStatic () {
  return path.resolve(__dirname, '../static')
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'static': resolveStatic(),
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'assets': resolve('src/assets'),
      'bootstrap':resolve('src/assets/lib/bootstrap-3.3.7-dist'),
      'style':resolve('src/style'),
       'components':resolve('src/components'),
       
      
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
    jQuery: "jquery",
    $: "jquery",
    axios:'axios',
    })
   
    ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
      test: /\.scss$/,
      loaders: ["style", "css", 'postcss',"sass"]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  // postcss:[autoprefixer({browsers:['last 2 versions']})]
}
