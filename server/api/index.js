import { Router } from 'restify-router';

import * as auth from './auth';
import * as user from './user';
import * as like from './like';
import * as product from './product';
import * as pet from './pet';
import * as candidate from './candidate';
import * as match from './match';
import * as pet_info from './pet_info';


export default function (server, path) {
  const router = new Router();

  router.post('/auth', auth.post);

  router.get('/user', user.get);
  router.post('/user', user.post);
  router.put('/user', user.put);

  router.get('/pet', pet.get);
  router.post('/pet', pet.post);
  router.get('/pet/:id/img/:i', pet.getImg);
  router.del('/pet/:id', pet.del);
  router.get('/user/:owner/pets', pet.getPetsByUser);
  router.get('/user/pets', pet.getPets);

  // matching
  router.post('/like', like.post);
  router.get('/like', like.get);
  router.del('/like', like.del);
  router.get('/pet/:id/candidate', candidate.get);

  router.get('/pet/:id/match', match.get);

  //pet_information
  router.get('/pet_info', pet_info.get);
  router.get('/pet_info/breeds', pet_info.getBreeds);

  // e-commerce
  router.post('/product',product.post);


  router.applyRoutes(server, path);
}
