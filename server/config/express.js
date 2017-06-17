/**
 * Express configuration
 */

import debug from 'debug';
import cors from 'cors';
import express from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import path from 'path';

import * as routes from './../routes';
import config from './environment';
import * as setup from '../components/setup';
import oauthComponent from './../components/oauth/express';

const log = debug('server/config');

/* eslint consistent-return:0 */
export default function (a) {
  const app = a;
  const env = app.get('env');

  if (env === 'development' || env === 'test') {
    app.use(express.static(path.join(config.root, '.tmp')));
  }

  if (env === 'production') {
    app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
  }
  setup.init(app);
  app.set('appPath', path.join(config.root, 'client'));
  app.use(express.static(app.get('appPath')));
  app.use(cors());
  app.use(morgan('dev'));

  app.set('views', `${config.root}/server/views`);
  app.set('view engine', 'pug');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use((r, res, next) => {
    const req = r;
    if (req.headers.origin) req.origin = req.headers.origin.split('://')[1];
    next();
  })

  oauthComponent(app, routes);

  if (env === 'development') {
    /* eslint global-require:0 */
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const stripAnsi = require('strip-ansi');
    const webpack = require('webpack');
    const makeWebpackConfig = require('../../webpack.make');
    const webpackConfig = makeWebpackConfig({ DEV: true });
    const compiler = webpack(webpackConfig);
    const browserSync = require('browser-sync').create();

    /**
     * Run Browsersync and use middleware for Hot Module Replacement
     */
    browserSync.init({
      open: false,
      logFileChanges: false,
      proxy: `localhost:${config.port}`,
      ws: true,
      middleware: [
        webpackDevMiddleware(compiler, {
          noInfo: false,
          stats: {
            colors: true,
            timings: true,
            chunks: false,
          },
        }),
      ],
      port: config.browserSyncPort,
      plugins: ['bs-fullscreen-message'],
    });

    /**
     * Reload all devices when bundle is complete
     * or send a fullscreen error message to the browser instead
     */
    compiler.plugin('done', (stats) => {
      log('webpack done hook');
      if (stats.hasErrors() || stats.hasWarnings()) {
        return browserSync.sockets.emit('fullscreen:message', {
          title: 'Webpack Error:',
          body: stripAnsi(stats.toString()),
          timeout: 100000,
        });
      }
      browserSync.reload();
    });
  }

  if (env === 'development' || env === 'test') {
    app.use(errorHandler()); // Error handler - has to be last
  }
}
