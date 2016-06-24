import path from 'path';
import restify from 'restify';

import api from './api';

export default class Server {
  constructor() {
    this.server = restify.createServer();
    this.setUpMiddleware();
    this.setUpRoutes();
  }

  setUpMiddleware() {
    this.server.use(restify.acceptParser(this.server.acceptable));
    this.server.use(restify.queryParser());
    this.server.use(restify.bodyParser());
    this.server.use(restify.requestLogger());
  }

  setUpRoutes() {
    api(this.server, '/api');
    api(this.server, '/api/v1');

    this.server.get(/.*/, restify.serveStatic({
      directory: path.join(__dirname, '..', 'public'),
      default: 'index.html'
    }));
  }

  listen(port) {
    this.server.listen(port, () => {
      console.log('%s listening at %s', this.server.name, this.server.url);
    });
  }
}
