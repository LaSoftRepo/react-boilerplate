/* eslint-disable */

const path     = require('path');
const http     = require('http');
const express  = require('express'); // eslint-disable-line
const webpack  = require('webpack'); // eslint-disable-line
const { argv } = require('yargs');   // eslint-disable-line
const open     = require('open');    // eslint-disable-line
const cors     = require('cors');    // eslint-disable-line

const webpackDevMiddleware = require('webpack-dev-middleware');       // eslint-disable-line
const webpackHotMiddleware = require('webpack-hot-middleware');       // eslint-disable-line
const history              = require('connect-history-api-fallback'); // eslint-disable-line

const rootPath     = path.resolve(__dirname, '..');
const configPath   = process.env.WEBPACK_CONFIG || argv.config || './webpack.config';
const isDeveloping = process.env.NODE_ENV !== 'production';

let config = require(path.join(rootPath, configPath));
if (typeof config === 'function') {
  config = config(Object.assign({}, process.env, { customServer: true }));
}

const host = process.env.HOST || config.devServer.host || '0.0.0.0';
const port = process.env.PORT || config.devServer.port || 8080;
const devHeaders = config.devServer.headers;

const app = express();

const corsOptions = {
  origin:         devHeaders['Access-Control-Allow-Origin'],
  methods:        devHeaders['Access-Control-Allow-Methods'],
  allowedHeaders: devHeaders['Access-Control-Allow-Headers'],
  credentials:    !!devHeaders['Access-Control-Allow-Credentials'],
};

if (isDeveloping) {
  const compiler = webpack(config);

  function webLoaderMiddleware(compiler) {
    return (req, res, next) => {
      let doneModules = 0;

      function moduleDone(module) {
        doneModules++;
    		const ident = module.identifier();
    		if (ident) {
    			// const idx = activeModules.indexOf(ident);
    			// if(idx >= 0) activeModules.splice(idx, 1);
    		}
        // update();
        // console.log('module done!', doneModules);
      }

      compiler.plugin('compilation', compilation => {
        if (compilation.compiler.isChild()) return;
        // handler(0, "compiling");
        // let moduleCount = 0;
        // console.log('start compiling...');
        compilation.plugin('build-module', module => {
    		  // moduleCount++;
    		  // const ident = module.identifier();
    		  // if (ident) {
    		  	// activeModules.push(ident);
    		  // }
    		  // update();
          // console.log('progress:', moduleCount);
        });

        compilation.plugin('failed-module',  moduleDone);
        compilation.plugin('succeed-module', moduleDone);
      });

      /* res.header('Content-Type', 'text/html');
      res.send(`
        <!doctype html>
        <html lang="en">
          <head>
            <title>Building...</title>
          </head>
          <body>
            <h4>Building...</h4>
          </body>
        </html>
      `); */

      next();
    };
  }

  /* app.use((req, res, next) => {
    const _setHeader = http.ServerResponse.prototype.setHeader;
    res.setHeader = (a, b) => {
      if (!res.getHeader('Content-Type')) {
        _setHeader.bind(res)(a, b);
      }
    };
    next();
  }); */

  // app.use(webLoaderMiddleware(compiler));

  const devMiddleware = webpackDevMiddleware(compiler, {
    // lazy:        true,
    noInfo:      config.devServer.noInfo === undefined ? true : config.devServer.noInfo,
    publicPath:  config.output.publicPath,
    headers:     config.devServer.headers,
    quiet:       true,
    stats: {
      colors:  true,
      hash:    false,
      timings: true,
      chunks:  false,
      chunkModules: false,
      modules: false
    },
    serverSideRender: false,
  });

  if (config.devServer.historyApiFallback) {
    app.use(history({
      verbose: false,
      index:   '/',
    }));
  }

  app.use(devMiddleware);
  app.use(webpackHotMiddleware(compiler, {
    log:  console.log,       // eslint-disable-line no-console
    path: '/__webpack_hmr',
  }));

  /* app.get('*', (req, res) => {
    const filename = path.resolve(rootPath, 'app/index.html');
    compiler.inputFileSystem.readFile(filename, (err, result) => {
      console.log('>>>>>>> send bundle before error');
      if (err) return next(err);
      console.log('>>>>>>> send bundle sucseess');
      res.send(result);
      res.end();
    });
  }); */
} else {
  console.info('\r\nUser\'s static server was launched'); // eslint-disable-line no-console

  app.use(cors(corsOptions));
  app.use(express.static(path.join(rootPath, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(rootPath, 'build/index.html'));
  });
}

const server = http.createServer(app);
server.listen(port, host, err => {
  if (err) throw err;
  open(`http://${host}:${port}`);
});

/* eslint-enable */
