/**
 * Main application file
 */


import http from 'http';
import socket from 'socket.io';

import express from 'express';
import config from './config/environment';

import socketIOConfig from './config/socketio';
import expressConfig from './config/express';
import routes from './routes';


/* eslint no-console:0 */
const log = console.log;
// Setup server
const app = express();
const server = http.createServer(app);
const socketio = socket(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client',
});
socketIOConfig(socketio);
expressConfig(app);
routes(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, () => {
    log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

startServer();

// Expose app
exports = module.exports = app;
