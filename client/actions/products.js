import fetch from 'isomorphic-fetch';

export const LIST_NEW_PRODUCT = 'LIST_NEW_PRODUCT';
export const LIST_FINISHED_PRODUCT = 'LIST_FINISHED_PRODUCT';
export const LIST_ERROR_PRODUCT = 'LIST_ERROR_PRODUCT';

export const NEW_IMAGE = 'NEW_IMAGE';
export const FINISHED_IMAGE = 'FINISHED_IMAGE';
export const ERROR_IMAGE = 'ERROR_IMAGE';

function errorProducts(error){
	return{
		type: LIST_ERROR_PRODUCT,
		error
	}
}

function fetchedProducts(products){
	return{
		type: LIST_FINISHED_PRODUCT,
		products
	}
}

function requestProducts(){
	return {
		type: LIST_NEW_PRODUCT
	}
}



function requestImage(){
	return {
		type: NEW_IMAGE
	}
}

function errorImage(){
	return {
		type: ERROR_IMAGE,
		error
	}
}

function finishedImage(){
	return{
		type: FINISHED_IMAGE,
		image
	}
}


export function fetchProducts(){
	fetchProducts('');
}

export function fetchProducts(name){
	return (dispatch, getState) => {
		dispatch(requestProducts());
		const state = getState();
		return fetch(`/api/product/search?name=${name}`,{
			method: 'GET',
			headers:{
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
		})
			.then( response => response.json())
			.then( products => dispatch(fetchedProducts(products)))
			.then( () => {} )
			.catch(error => dispatch(errorProducts(error)));
	};
}

export function fetchImage(product,image){

	return (dispatch, getState) => {
		dispatch(requestImages());
		const state = getState();
		return fetch(`api/product/${product}/image/${image}`,{
			method: 'GET',
			headers:{
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
		})
		.then( response => response.json())
		.then( image => dispatch(finishedImage(image)))
		.then( () => {} )
		.catch(error => dispatch(errorImage(error)));
	};
}


export function fetchAll(name){
	console.log("FETCH ALL " ) ;
	return(dispatch,getState) => {
		(dispatch(fetchProducts(name)) || Promise.resolve())
			.then( response => response.json())
			.then( products => {
				console.log(products);
				dispatch(fetchedProducts(products))
			})
			
			.then( getState =>  {
				dispatch(fetchImage(name,0));
			}) 
			.then ( () =>  {} ) 
	}
}
