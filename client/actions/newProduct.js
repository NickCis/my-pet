import fetch from 'isomorphic-fetch';

import { changePageIfNeeded } from './';

export const NEW_PRODUCT = 'NEW_PRODUCT';

function newProduct(username,productId) {
  return {
    type: REQUEST_LOGIN,
	username,
    productId
  };
}
