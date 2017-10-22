
const path    = require('path');
const argv    = require('yargs').argv;
const webpack = require('webpack');

const {
  createConfig,
  match,

  // Feature blocks
  babel,
  css,
  devServer,
  url,
  file,
  postcss,
  extractText,
  uglify,

  // Shorthand setters
  addPlugins,
  defineConstants,
  entryPoint,
  env,
  group,
  performance,
  setOutput,
  sourceMaps,

} = require('webpack-blocks');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const autoprefixer  = require('autoprefixer');

const Path          = require('./paths');
const packageConfig = require('../package.json');

const PROJECT_NAME = 'test';

const isWindow     = /^win/.test(process.platform);
const HOST         = argv.host || (isWindow ? '127.0.0.1' : '0.0.0.0');
const PORT         = argv.port || 8080;
const processEnv   = process.env.NODE_ENV || 'development';

const isTest       = processEnv === 'test';
const isProduction = processEnv === 'production';
const isAWSDeploy  = !!process.env.deploy;



const provideConfig = {
  axios:         'axios',
  store:         'store',
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

  CSSModules:     'react-css-modules',
};


const developmentConfig = () => group([
  sourceMaps(),
  devServer(),
  performance({
    maxAssetSize:      1500000,
    maxEntrypointSize: 1500000
  })
]);

const productionConfig = () => group([
  extractText('styles/style.[hash].css'),
  uglify(),
  addPlugins([
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug:    false,
    })
  ]),
]);


function styleLoader(modules = false) {
  return [
    {
      loader: require.resolve('style-loader'),
      options: {
        minimize:   isProduction,
        sourceMap: !isProduction,
      },
    },
    {
      loader: require.resolve('css-loader'),
      options: {
        minimize:   isProduction,
        sourceMap: !isProduction,
        importLoaders: 2,
        alias: {
          assets: Path.to.assets,
          images: Path.to.images,
          fonts:  Path.to.fonts,
          styles: Path.to.styles,
        },
        modules,
        localIdentName: '[path]__[local]__[hash:base64:5]',
      },
    },
    {
      loader: require.resolve('resolve-url-loader'),
    },
    {
      loader: require.resolve('postcss-loader'),
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
      loader: require.resolve('fast-sass-loader'),
      options: {
        outputStyle: 'expanded',
        includePaths: ['node_modules', Path.to.app],
      },
    },
  ];
}

function provide(config) {
  return (context, { addPlugin }) => addPlugin(
    new webpack.ProvidePlugin(config),
  );
}

function fastSass() {
  return (context, { addLoader }) => addLoader(
    Object.assign({
      test: /\.scss$/,
      exclude: [
        /\.useable\.(scss|sass|css)(\?[a-z0-9=.]+)?$/i,
        /\.module\.(scss|sass|css)(\?[a-z0-9=.]+)?$/i
      ],
      include: [ Path.to.app, /node_modules/ ],
      use:     styleLoader(false),
    },
    {
      test: /\.module\.scss$/,
      exclude: [
        /node_modules/,
        /\.useable\.(scss|sass|css)(\?[a-z0-9=.]+)?$/i
      ],
      include: Path.to.app,
      use:     styleLoader(true),
    }, context.match)
  );
}

function aliases() {
  return (context, { merge }) => merge({
    resolve: {
      extensions: ['.webpack.js', '.web.js', '.web.jsx', '.ts', '.tsx', '.jsx', '.js', '.json'],
      modules: [Path.to.app, Path.to.modules],
      alias: {
        app:     Path.to.app,
        sources: Path.to.sources,

        styles:  Path.to.styles,
        assets:  Path.to.assets,
        images:  Path.to.images,
        fonts:   Path.to.fonts,

        api:      Path.to.api,
        helpers:  Path.to.helpers,

        components:   Path.to.components,
        containers:   Path.to.containers,
        translations: Path.to.translations,
      },
    },
  });
}


module.exports = createConfig([
  aliases(),

  babel(),

  fastSass(),

  // match('*.css', [
  //   css(),
  //   postcss([
  //     autoprefixer({ browsers: ['last 2 versions'] }),
  //   ]),
  // ]),

  provide(provideConfig),

  match(/\.(woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/, { include: Path.to.fonts }, [
    url({
      limit: 10000,
      name: '[name].[hash:base64:5].[ext]'
    }),
  ]),

  match(/\.(png|gif|jpe?g|jp2|webp|svg)(\?[a-z0-9=.]+)?$/, { include: Path.to.images }, [
    url({
      limit: 10000,
      name: '[name].[hash:base64:5].[ext]'
    }),
  ]),

  addPlugins([
    new HtmlWebpackPlugin({
      title:    PROJECT_NAME,
      template: Path.to.template,
      path:     Path.to.build,
      filename: 'index.html',
      inject:   'body',
      // minify:   isProduction ? htmlMinifyConfig : false,
    })
  ]),

  defineConstants({
    'process.env': {
      'NODE_ENV': JSON.stringify(env),
    },
  }),

  env('development', [
    entryPoint(path.join(Path.to.app,  'app.js')),
    developmentConfig(),
  ]),

  env('production', [
    entryPoint(path.join(Path.to.app,  'app.js')),
    setOutput(path.join(Path.to.build, 'app.js')),

    productionConfig(),
  ]),
]);
