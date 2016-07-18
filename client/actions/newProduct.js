import fetch from 'isomorphic-fetch';

import { changePageIfNeeded } from './';

export const NEW_PRODUCT = 'NEW_PRODUCT';



export function doNewProduct(name, type, price, description) {
  return (dispatch, getState) => {
    return fetch('/api/product', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
		name,
        type,
		price:price,
		description
      })
    })
      .then(response => response.json())
      //.then(checkLogin)
      //.then(token => dispatch(finishedLogin(token)))
      .then(() => {
        let prevPage = getState().page.previous;
        if(['Register', 'Login'].indexOf(prevPage) != -1)
          prevPage = 'Home';
        return dispatch(changePageIfNeeded(prevPage));
      })
      .catch(error => dispatch(errorLogin(error)))
  };
}


/*
	  return {
		  type: NEW_PRODUCT,
		  productName,
		  productType,
		  productPrice,
		  productDescription
	  };
*/
