const {resolve}         = require('path');
const webpack           = require('webpack');
const HTMLPlugin        = require('html-webpack-plugin');
const CopyPlugin        = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin   = require('purifycss-webpack-plugin');
const HappyPack = require('happypack');
// Source
const appEntryFile  = resolve(__dirname, 'front', 'app', 'index.js');
const appConfigFile = resolve(__dirname, 'front', 'app', 'config.json');
const favicon       = resolve(__dirname, 'front', 'app', 'favicon.ico');
const appDestPath   = resolve(__dirname, 'front', 'www');

// Disabled, injected const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

module.exports = env => {

  const removeEmpty = array => array.filter(i => !!i);
  const isProd      = env.prod ? true : false;

  return {

    entry: {
      app   : appEntryFile,
      // Removed 'moment' - only include in app file if it's used
      vendor: ['react', 'react-dom', 'redux', 'react-redux', 'react-router-dom', 'ramda']
    },

    output: {
      path      : appDestPath,
      filename  : '[name].[hash].js',
      publicPath: isProd ? '' : '/'
    },

    devtool: env.prod ? 'cheap-module-source-map' : 'eval',
    bail   : env.prod,

    module: {
      // 'use' is the preferred syntax but some of these aren't updated to support it
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
          test   : /\.jsx?$/,
          loader : 'happypack/loader',
          exclude: ['/node_modules/'],
          query  : {
            presets: removeEmpty(['es2015', 'react', isProd ? undefined : 'react-hmre']),
            compact: true
          }
        }
        // Disabled for Happypack
        //{
        //  enforce: 'pre',
        //  test   : /\.jsx?$/,
        //  use    : 'eslint-loader?{configFile:\'./.eslintrc\', quiet:false, failOnWarning:false, failOnError:true}',
        //  exclude: ['/node_modules/', '/app/vendor/']
        //},
        //{
        //  test   : /\.jsx?$/,
        //  loader : 'babel-loader',
        //  exclude: ['/node_modules/'],
        //  query  : {
        //    presets: removeEmpty(['es2015', 'react', isProd ? undefined : 'react-hmre']),
        //    compact: true
        //  }
        //}
      ]
    },

    plugins: removeEmpty([
      new HappyPack({ threads: 4, loaders: ['babel-loader', 'eslint-loader?{configFile:\'./.eslintrc\', quiet:false, failOnWarning:false, failOnError:true}'] }),
      new HTMLPlugin({
        title   : 'Application',
        template: 'front/app/index.html'
      }),
      new CopyPlugin([
        {from: appConfigFile},
        {from: favicon}
      ]),
      new ExtractTextPlugin({
        filename : 'style.css',
        allChunks: true,
        disable  : !isProd
      }),
      // PROD ONLY
      !isProd ? undefined : new webpack.DefinePlugin({
        'process.env': {NODE_ENV: '"production"'}
      }),
      !isProd ? undefined : new PurifyCSSPlugin({
        basePath     : __dirname,
        purifyOptions: {
          info     : true,
          minify   : true,
          whitelist: ['fa-*']
        }
      }),
      !isProd ? undefined : new webpack.optimize.OccurrenceOrderPlugin(),
      // If we're not in testing, create a separate vendor bundle file
      isTest ? undefined : new webpack.optimize.CommonsChunkPlugin({
        name     : 'vendor',
        minChunks: Infinity,
        filename : '[name].[hash].js',
      })
    ])
  };
};
