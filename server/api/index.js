import { Router } from 'restify-router';
import auth from './auth';

export default function (server, path) {
  const router = new Router();
  router.get('/hola/:nombre', auth);
  router.applyRoutes(server, path);
}
