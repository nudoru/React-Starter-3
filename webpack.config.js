const {resolve}         = require('path');
const webpack           = require('webpack');
const HTMLPlugin        = require('html-webpack-plugin');
const CopyPlugin        = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin   = require('purifycss-webpack-plugin');

const removeEmpty = array => array.filter(i => !!i);

module.exports = env => {

  const isTest = process.env.NODE_ENV === 'test';
  const isProd = env.prod ? true : false;

  return {

    entry: {
      app   : resolve(__dirname, 'front', 'app', 'index.js'),
      vendor: ['react', 'react-dom', 'react-router-dom', 'ramda', 'gsap']
    },
    output: {
      path      : resolve(__dirname, 'front', 'www'),
      filename  : '[name].[hash].js',
      publicPath: isProd ? '' : '/'
    },
    devtool: isProd ? 'cheap-module-source-map' : 'eval',
    module: {
      loaders: [
        {
          test  : /\.(s?)(a|c)ss$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use     : ['css-loader', 'postcss-loader', 'sass-loader']
          })
        },
        {
          test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          use : 'file-loader?name=[name].[ext]'
        },
        {
          test   : /\.(jpe?g|png|gif|svg)$/i,
          loaders: ['file-loader?hash=sha512&digest=hex&name=[hash].[ext]', {
            loader: 'image-webpack-loader',
            query : {
              mozjpeg : {
                progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng : {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '75-90',
                speed  : 3,
              },
            },
          }]
        },
        {
          enforce: 'pre',
          test   : /\.js$/,
          loader : 'eslint-loader?{configFile:\'./.eslintrc\', quiet:false, failOnWarning:false, failOnError:true}',
          exclude: ['/node_modules/', '/app/vendor/']
        },
        {
          test   : /\.js$/,
          loader : 'babel-loader',
          exclude: resolve(__dirname, 'node_modules/'),
          query  : {
            plugins: [
              "transform-class-properties",
              "transform-object-rest-spread",
              "transform-es2015-destructuring",
              "emotion"
            ],
            presets: removeEmpty(['es2015', 'react', isProd ? undefined : 'react-hmre']),
            compact: true
          }
        }
      ]
    },
    plugins: removeEmpty([
      new HTMLPlugin({
        title   : 'Application',
        template: 'front/app/index.html'
      }),
      new CopyPlugin([
        {from: resolve(__dirname, 'front', 'app', 'config.json')},
        {from: resolve(__dirname, 'front', 'app', 'favicon.ico')}
      ]),
      new ExtractTextPlugin({
        filename : 'style.css',
        allChunks: true,
        disable  : false
      }),
      //Disable for tests
      new webpack.optimize.CommonsChunkPlugin({
        name     : 'vendor',
        minChunks: Infinity,
        filename : '[name].[hash].js',
      }),
      isProd ? undefined : new webpack.DefinePlugin({
        'process.env': {NODE_ENV: '"production"'}
      }),
      !isProd ? undefined : new PurifyCSSPlugin({
        basePath     : __dirname,
        purifyOptions: {
          info  : true,
          minify: true
        }
      }),
      !isProd ? undefined : new webpack.optimize.OccurrenceOrderPlugin()
    ])
  };
};
