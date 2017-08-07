'use strict'

const path              = require('path');
const webpack           = require('webpack');
const autoprefixer      = require('autoprefixer');
const ManifestPlugin    = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const WatchMissingNodeModulesPlugin = require('./plugins/WatchMissingNodeModulesPlugin');

const Path          = require('./paths');
const packageConfig = require('../package.json');

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
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 2,
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
    }),
    new webpack.LoaderOptionsPlugin({
      context: Path.to.app,
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      beautify: false,
      squeeze: true,
      mangle: {
        except: ['$super', '$', '_', 'exports', 'require'],
      },
      compress: {
        warnings: false,
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
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    //new ExtractTextPlugin('style-[hash].css'),
    new CopyWebpackPlugin([
      { from: Path.to.assets, to: 'assets' }
    ])
  );

} else {
  // Development only plugins

  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      context: Path.to.app,
      options: {
        babelQuery: {
          // require.resolve solves the issue of relative presets when dealing with
          // locally linked packages. This is an issue with babel and webpack.
          // See https://github.com/babel/babel-loader/issues/149 and
          // https://github.com/webpack/webpack/issues/1866
          presets: ['babel-preset-react-hmre'].map(require.resolve),
        }
      }
    }),
    new OpenBrowserPlugin({ url: `http://${ HOST }:${ PORT }` }),
  );
}

module.exports = (env = {}) => {
  return {
    target: 'web',
    bail: isProduction,
    devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
    context: Path.to.app,

    entry: {
      app: path.join(Path.to.app, 'app.js'),
      vendor: Object.keys(packageConfig.dependencies),
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
      modules: ['app', 'node_modules'],
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
              options: { importLoaders: 1 },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: !isProduction,
                config: {
                  path: path.join(Path.to.root, 'postcss.config.js'),
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
              },
            },
            //'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !isProduction,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            "css-loader",
            "postcss-loader"
          ]
        },
        {
          test: /\.(png|gif|jpg|svg)$/,
          include: Path.to.images,
          use: 'url-loader?limit=20480&name=[name]-[hash].[ext]',
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          include: Path.to.fonts,
          use: 'url-loader?limit=100000',
        },
      ],
    },

    plugins,

    devServer: {
      historyApiFallback: true,
      host: HOST,
      port: PORT,
      noInfo: false,
      compress: isProduction,
      inline: !isProduction,
      hot: !isProduction,
      contentBase: isProduction ? './build' : './app',
      headers: { 'Access-Control-Allow-Origin': '*', 'X-Custom-Header': 'yes' },
      publicPath: Path.to.public,
    },
  };
}
