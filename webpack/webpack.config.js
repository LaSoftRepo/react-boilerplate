'use strict'

// TODO
// + Add CSS modules
// + Add Dll plugin
// + Add and config eslint

const path              = require('path');
const chalk             = require('chalk');
const argv              = require('yargs').argv;
const webpack           = require('webpack');
const ManifestPlugin    = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OfflinePlugin     = require('offline-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const WatchMissingNodeModulesPlugin = require('./plugins/WatchMissingNodeModulesPlugin');

const Path          = require('./paths');
const packageConfig = require('../package.json');

const SEPARATOR_REGEX  = /[-_]/;
const CAPITALIZE_REGEX = /(^|[^a-zA-Z\u00C0-\u017F'])([a-zA-Z\u00C0-\u017F])/g;


// Config webpack enviroment
const __EXPERIMENTAL__ = true;
const USE_OFFLINE_CACHE = true;
const USE_DOCKER = false;
const HOST = argv.host || '0.0.0.0';
const PORT = argv.port || 8080;
const env  = process.env.NODE_ENV || 'development';

const provideConfig = {
  moment:        'moment',
  classnames:    'classnames',

  PropTypes:     'prop-types',
  ReactDOM:      'react-dom',
  React:         'react',
  Component:      ['react',       'Component'],
  PureComponent:  ['react',       'PureComponent'],
  Children:       ['react',       'Children'],

  connect:        ['react-redux', 'connect'],
  createSelector: ['reselect',    'createSelector'],
};

const htmlMinifyConfig = {
  removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true,
};

const isProduction = env === 'production';
const isTest       = env === 'test';

// Common plugins
const plugins = [
  new ProgressBarPlugin({
      width:          70,
      format:         chalk.green.bold('Build :bar :percent'),
      complete:       '•',
      incomplete:     '◦',
      clear:          true,
      renderThrottle: 96,
  }),
  new webpack.NoEmitOnErrorsPlugin(),
  new WatchMissingNodeModulesPlugin(Path.to.modules),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(env),
    },
    '__EXPERIMENTAL__': JSON.stringify(__EXPERIMENTAL__),
  }),
  new HtmlWebpackPlugin({
    title:    prettifyPackageName(packageConfig.name) || 'Boilerplate',
    template: Path.to.template,
    path:     Path.to.build,
    filename: 'index.html',
    inject:   true,
    minify:   isProduction ? htmlMinifyConfig : false,
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new webpack.ProvidePlugin(provideConfig),
  new webpack.optimize.CommonsChunkPlugin({
    name:     'vendor',
    minChunks: 2,
  }),
  new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 2 }),
];

let useStyleLoaders = [
  {
    loader: 'cache-loader',
    options: {
      cacheDirectory: Path.to.cache,
    },
  },
  {
    loader: 'style-loader',
    options: {
      minimize:  isProduction,
      sourceMap: !isProduction,
    },
  },
  {
    loader: 'css-loader',
    options: {
      sourceMap: !isProduction,
      importLoaders: 2,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: !isProduction,
      ident: 'postcss',
      plugins: () => [
        require('postcss-flexbugs-fixes')(),
        require('postcss-cssnext')({
          browsers: [
            '> 1%',
            'Explorer >= 10',
            'last 4 Chrome versions',
            'last 3 Firefox versions',
            'iOS >= 9',
            'Android >= 4.1',
          ],
          cascade: false,
        }),
        require('postcss-browser-reporter')()
      ],
    },
  },
  {
    loader: 'sass-loader',
    options: {
      outputStyle: 'nested',
      sourceMap: !isProduction,
    },
  },
];

if (isProduction) {
  // Production only plugins

  // Remove cache-loader and style-loader (which use as fallback)
  useStyleLoaders.splice(0, 2);
  useStyleLoaders = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: useStyleLoaders,
  });

  plugins.push(
    new webpack.HashedModuleIdsPlugin(),
    new ManifestPlugin({
      writeToFileEmit: true,
      fileName: 'asset-manifest.json',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: Path.to.app,
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      beautify: false,
      squeeze: true,
      mangle: {
        except: ['$super', '$', '_'],
      },
      compress: {
        warnings: false,
        drop_console: true,
        drop_debugger: true,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        loops: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        reduce_vars: true,
      },
      output: {
        comments: false,
      },
      sourceMap: true,
      exclude: [/\.min\.js$/gi], // skip pre-minified libs
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
      filename: 'style.[hash].css',
      allChunks: true,
    }),
    new CopyWebpackPlugin([
      { from: Path.to.assets, to: 'assets' },
    ]),
  );

  if (USE_OFFLINE_CACHE) {
    plugins.push(
      new OfflinePlugin({
        relativePaths: false,
        publicPath: Path.to.public,
        excludes: ['**/.*', '**/*.map', '.htaccess'],
        caches: {
          main: [':rest:'],
          additional: ['vendor.*.js'],
        },
        safeToUseOptionalCaches: true,
        AppCache: false,
      })
    );
  }

} else {
  // Development only plugins

  plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: Path.to.app,
      },
      debug: true,
    }),
  );
}

module.exports = (env = {}) => {
  return {
    target: 'web',
    bail: isProduction,
    devtool: isProduction ? '#source-map' : '#cheap-module-eval-source-map',
    context: Path.to.app,

    entry: {
      app: ['react-hot-loader/patch', path.join(Path.to.app, 'app.js')],
      vendor: Object.keys(packageConfig.dependencies),
    },

    output: {
      path:               Path.to.build,
      publicPath:         Path.to.public,
      filename:          '[name].[hash].js',
      sourceMapFilename: '[name].[hash].js.map',
      chunkFilename:     '[id].[hash].js',
      pathinfo:           !isProduction,
    },

    resolve: {
      extensions: ['.webpack.js', '.web.js', '.web.jsx', '.ts', '.tsx', '.jsx', '.js', '.json'],
      modules: ['app', 'node_modules'],
    },

    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.jsx?$/,
          enforce: 'pre',
          include: Path.to.app,
          exclude: /(node_modules|bower_components|build|spec)/,
          use: [
            {
              loader: 'cache-loader',
              options: {
                cacheDirectory: Path.to.cache,
              },
            },
            {
              loader: 'babel-loader',
              //loader: require.resolve('eslint-loader'),
              options: {
                //formatter: eslintFormatter,
                //eslintPath: require.resolve('eslint'),
                //baseConfig: {
                //  extends: [require.resolve('eslint-config-react-app')],
                //},
                ignore: false,
                //useEslintrc: false
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          include: Path.to.app,
          use: useStyleLoaders,
        },
        {
          test: /\.css$/,
          include: [/node_modules/, Path.to.app],
          loaders: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|gif|jpg|svg)$/,
          include: Path.to.images,
          use: 'url-loader?limit=20480&name=[name]-[hash].[ext]',
        },
        {
          test: /favicon\.ico$/,
          loader: 'url',
          query: {
            limit: 1,
            name: '[name].[ext]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          include: Path.to.fonts,
          use: 'url-loader?limit=100000',
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
        {
          test: /\.(mp4|webm)$/,
          loader: 'url-loader',
          query: {
            limit: 10000,
          },
        },
      ],
    },

    plugins,

    devServer: {
      historyApiFallback: { disableDotRule: true },
      host: HOST,
      port: PORT,
      noInfo:  false,
      open:    true,
      overlay: true,
      compress: isProduction,
      hot: !isProduction,
      inline: !isProduction,
      contentBase: isProduction ? './build' : './app',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'X-Custom-Header': 'yes',
      },
      watchOptions: {
        aggregateTimeout: 240,
        ignored: [/node_modules/, "../build/**/*.*"],
        poll: USE_DOCKER ? 1000 : false,
      },
      publicPath: Path.to.public,
    },
  };
}

function prettifyPackageName(name) {
  if (!name || name === '') return null;
  return name
    .replace(SEPARATOR_REGEX, ' ')
    .replace(CAPITALIZE_REGEX, m => m.toUpperCase());
}
