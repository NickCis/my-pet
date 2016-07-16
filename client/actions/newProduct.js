import fetch from 'isomorphic-fetch';

import { changePageIfNeeded } from './';

export const NEW_PRODUCT = 'NEW_PRODUCT';

function onNewProduct(productName, productType, productPrice, productDescription) {
  return {
    type: NEW_PRODUCT,
	productName,
	productType,
	productPrice,
	productDescription
  };
}
