'use strict'

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('./plugins/WatchMissingNodeModulesPlugin');
const packageConfig = require('../package.json');

const Path = require('./paths');

const HOST = 'localhost';
const PORT = 8080;

const env          = process.env.NODE_ENV || 'development';
const isProduction = env === 'production';

// Common plugins
const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new WatchMissingNodeModulesPlugin(Path.to.modules),
  new webpack.optimize.CommonsChunkPlugin({
    name:     'vendor',
    minChunks: Infinity,
    filename: 'vendor-[hash].js',
  }),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    template:  path.join(Path.to.app, 'index.html'),
    path:      Path.to.build,
    filename: 'index.html',
    inject:    true,
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
];

if (isProduction) {
  // Production only plugins

  plugins.push(
    new ManifestPlugin({
        fileName: 'asset-manifest.json',
    })
  );

} else {
  // Development only plugins

  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: `http://${ HOST }:${ PORT }` })
  );
}

module.exports = (env = {}) => {
  return {
    bail: isProduction,
    devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
    context: Path.to.app,

    entry: {
      app: path.join(Path.to.app, 'app.js'),
      vendor: Object.keys(packageConfig.dependencies).concat([
        'intl/locale-data/jsonp/en',
        'intl/locale-data/jsonp/ru'
      ]),
    },

    output: {
      path:               Path.to.build,
      publicPath:         Path.to.public,
      filename:          '[name]-[hash].js',
      sourceMapFilename: '[name]-[hash].js.map',
      pathinfo:           true,
    },

    resolve: {
      extensions: ['.webpack.js', '.web.js', '.web.jsx', '.ts', '.tsx', 'jsx', '.js', '.json'],
    },

    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.jsx?$/,
          enforce: 'pre',
          include: Path.to.app,
          exclude: [ /node_modules/, /build/, /spec/ ],
          use: [{
            options: {
              //formatter: eslintFormatter,
              //eslintPath: require.resolve('eslint'),
              //baseConfig: {
              //  extends: [require.resolve('eslint-config-react-app')],
              //},
              ignore: false,
              //useEslintrc: false
            },
            loader: 'babel-loader?cacheDirectory=true',
            //loader: require.resolve('eslint-loader'),
          }],
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: !isProduction,
                config: {
                  path: path.join(Path.to.root, 'postcss.config.js')
                },
                ident: 'postcss',
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009',
                  }),
                ],
              }
            },
            //'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !isProduction,
              }
            },
          ],
        }
      ]
    },

    plugins,

    devServer: {
      historyApiFallback: true,
    },
  };
}
