import path from 'path';
import restify from 'restify';
import config from 'config'

import api from './api';
import * as db from './db';
import * as session from './session';

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
    this.server.use(db.middleware(config.get('Database'), (err) => {
      if (err)
        console.log('Connection to dababase :: ERROR', err);
      else
        console.log('Connection to database :: Ok!');
    }));
    this.server.use(session.middleware(config.get('SessionSecret')));
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
