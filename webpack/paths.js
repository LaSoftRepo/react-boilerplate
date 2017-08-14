
const path = require('path');

const root = path.resolve(__dirname, '..');
const app  = path.join(root, 'app');

const paths = {
  to: {
    root,
    app,
    public:  '/',

    cache:    path.join(root, '.cache'),
    build:    path.join(root, 'build'),
    modules:  path.join(root, 'node_modules'),

    template: path.join(app, 'index.html'),
    sources:  path.join(app, 'sources'),
    styles:   path.join(app, 'styles'),
    assets:   path.join(app, 'assets'),
    images:   path.join(app, 'assets', 'images'),
    fonts:    path.join(app, 'assets', 'fonts'),
  }
};

module.exports = paths;
