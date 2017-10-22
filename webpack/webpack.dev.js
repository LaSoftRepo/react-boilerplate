
const path    = require('path');
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

const isProduction = false;

const PROJECT_NAME = 'test';

const developmentConfig = () => group([
  sourceMaps(),
  devServer(),
  performance({
    maxAssetSize:      1500000,
    maxEntrypointSize: 1500000
  })
]);

const productionConfig = () => group([
  extractText(),
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


function fastSass() {
  return (context, { merge }) => merge({
    module: {
      rules: [
        Object.assign({
            test: /\.scss$/,
            exclude: [
              /\.useable\.(scss|sass|css)(\?[a-z0-9=.]+)?$/i,
              /\.module\.(scss|sass|css)(\?[a-z0-9=.]+)?$/i
            ],
            include: [ Path.to.app, /node_modules/ ],
            use:     styleLoader(),
          },
          context.match,
        )
      ]
    }
  })
}


module.exports = createConfig([
  babel(),
  fastSass(),

  // match('*.css', [
  //   css(),
  //   postcss([
  //     autoprefixer({ browsers: ['last 2 versions'] }),
  //   ]),
  // ]),

  match(/\.(woff|woff2|eot|ttf|svg)$/, { include: Path.to.fonts } [
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
    'process.env.NODE_ENV': process.env.NODE_ENV || 'development',
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
