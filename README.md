# React Boilerplate

### Still work in progress

### Changes is coming!
#### [Webpack config will be rewrite to webpack-blocks](https://github.com/andywer/webpack-blocks)

Before build ensure you have latest **[yarn](https://yarnpkg.com/lang/en/docs/install/#mac-tab)** installed:

```bash
yarn --version
```

### Also ensure you have **[node.js](https://nodejs.org/en/download/current)** version >= 8.

---

### Development start and watch

```bash
yarn start
```

### Production build

```bash
yarn build
```

### Production preview

```bash
yarn preview
```

### Deploy to AWS (manually)

```bash
yarn deploy
```

#### ***Note: Usually deployment process provide by continuous integration***

### Features

- [x] **yarn** package manager
- [x] App Basic structure (WIP)
- [x] React
- [x] React Router v4 with Redux binding
- [x] Redux
- [x] Redux Sagas
- [x] Selectors
- [x] Redux Dev Tools or Redux Dev Tools Extension ***(dev only)***
- [x] Internalization (i18n)
- [x] React-anime animation system
- [x] High order component **(HOC)** enhancers
- [x] Experimental Layout based on **RAGrid** with binding to React
- [x] Immutable
- [x] Webpack v3
- [x] Hot Loader v3
- [x] Webpack use Caching and WebWorkers for speedup builds ***(Switch to [HappyPack](https://github.com/amireh/happypack) in future)***
- [x] Babel plugins **(class props, decorators)**
- [x] Babel optimization transformers ***(production only)***
- [x] Browser css normalization via **sanitize.css** ***(service)***
- [x] SASS with **cssnext** and **flexbox fixes**
- [x] ~~Use **polyfill.io** service instead ```babel-polyfill``` for tiny and atomic polyfilling (service)~~ **(temprary disabled)**
- [x] `es6-promise` and `isomorphic-fetch`
- [x] `React`, `ReactDOM`, `PropTypes` and `Children` provide automatic
- [x] `axios`, `store`, `moment`, `query-string` and `classnames` provide automatic
- [x] Auto generating all favicons and mobile icons for all platforms ***(production only)***
- [x] **OfflinePlugin** (ServiceWorker cache) webpack plugin **(will replace with WorkBox in future)** ***(production only)***
- [ ] **DllPlugin** webpack plugin
- [x] CSS modules
- [ ] ES Linting
- [ ] Automatic send mail to customer after deploy (WIP)
- [ ] SCSS Linting
- [ ] React Linting
- [ ] React Saga Linting
- [ ] Integrate Prettier
- [ ] Add **static-site-generator-webpack-plugin** plugin for create static site for crawlers in production
- [x] Create and setup customizable server for production/staging (WIP)
- [x] **Brotli** compression plugin ***(production only)***
- [ ] Prepack (?) or Closure compiler (?) for final aggressive optimization?
- [ ] Jest test solution
- [ ] Circle CI
