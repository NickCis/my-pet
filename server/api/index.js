import { Router } from 'restify-router';

import * as auth from './auth';
import * as user from './user';
import * as product from './product';
// import * as pet from './pet';

export default function (server, path) {
  const router = new Router();

  router.post('/auth', auth.post);

  router.get('/user', user.get);
  router.post('/user', user.post);
  router.put('/user/:username', user.put);

  // e-commerce
  router.post('/product',product.post);


  router.applyRoutes(server, path);
}
