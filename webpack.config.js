const {resolve}         = require('path');
const webpack           = require('webpack');
const HTMLPlugin        = require('html-webpack-plugin');
const CopyPlugin        = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin   = require('purifycss-webpack');

const removeEmpty = array => array.filter(i => !!i);

module.exports = env => {

  const isTest = process.env.NODE_ENV === 'test';
  const isProd = env.prod ? true : false;

  return {

    entry  : {
      app   : resolve(__dirname, 'front', 'js', 'index.js'),
      vendor: ['react', 'react-dom', 'react-router-dom', 'ramda', 'gsap']
    },
    output : {
      path      : resolve(__dirname, 'front', 'www'),
      filename  : '[name].[hash].js',
      publicPath: isProd ? '' : '/'
    },
    devtool: isProd ? 'cheap-module-source-map' : 'eval',
    module : {
      rules: [
        {
          test  : /\.(s?)(a|c)ss$/,
          loader: ExtractTextPlugin.extract({
            use     : ['css-loader', 'postcss-loader', 'sass-loader'],
            fallback: 'style-loader'
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
              mozjpeg : { progressive: true },
              gifsicle: { interlaced: false },
              optipng : { optimizationLevel: 7 },
              pngquant: { quality: '75-90', speed: 3 },
            },
          }]
        },
        {
          enforce: 'pre',
          test   : /\.js$/,
          exclude: ['/node_modules/', '/app/vendor/'],
          loader : 'eslint-loader',
          options: { configFile: resolve(__dirname, '.eslintrc') }
        },
        {
          test   : /\.js$/,
          loader : 'babel-loader',
          exclude: resolve(__dirname, 'node_modules/'),
          options  : {
            plugins: [
              "emotion",
              "transform-class-properties",
              "transform-object-rest-spread",
              "transform-es2015-destructuring"
            ],
            presets: removeEmpty(['env', 'react', isProd ? undefined : 'react-hmre']),
            compact: false,
            comments: false
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
        allChunks: true
        // disable  : !isProd
      }),
      isProd ? new webpack.DefinePlugin({
        'process.env': {NODE_ENV: '"production"'}
      }) : null,
      isProd ? new webpack.optimize.UglifyJsPlugin({
        mangle: false
      })  : null,
      isProd ? new PurifyCSSPlugin({
        basePath     : __dirname,
        purifyOptions: {
          info  : true,
          minify: true
        }
      })  : null ,
      isProd ? new webpack.optimize.OccurrenceOrderPlugin() : null
      //Disable for tests
      // isTest ? null : new webpack.optimize.CommonsChunkPlugin({
      //   name     : 'vendor',
      //   minChunks: Infinity,
      //   filename : '[name].[hash].js',
      // }),
    ])
  };
};
