import fetch from 'isomorphic-fetch';

import { changePageIfNeeded } from './';

export const NEW_PRODUCT = 'NEW_PRODUCT';
export const FINISHED_PRODUCT = 'FINISHED_PRODUCT';
export const ERROR_PRODUCT = 'ERROR_PRODUCT';
export const INVALIDATE_PRODUCT = 'INVALIDATE_PRODUCT';

export function invalidateProduct(json){
	return {
		type: INVALIDATE_PRODUCT
	};
}


function checkNewProduct(json){
  if(json.product_id)
    return json.product_id;
  return Promise.reject(json.error);
}

function errorProduct(error){
	return{
		type: ERROR_PRODUCT,
		error
	}
}

function finishedProduct(productId){
	return{
		type: FINISHED_PRODUCT,
		productId
	}
}

//images es un array de images en base64 
export function doNewProduct(name, type, price, description,images) {
	return (dispatch, getState) => {
		const state = getState();
		return fetch('/api/product', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				token: state.login.token,
				name,
				type,
				price,
				description,
				images
			})
		})
			.then(response => response.json())
			.then(checkNewProduct)
			.then(product_id => dispatch(finishedProduct(product_id)))
			.then( () => {})
		// Mostrar algo diciendo sucess
			.catch(error => dispatch(errorProduct(error)));
	};
}
