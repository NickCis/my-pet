import {
	LIST_NEW_PRODUCT,
	LIST_FINISHED_PRODUCT,
	LIST_ERROR_PRODUCT,
	NEW_IMAGE,
	FINISHED_IMAGE ,
	ERROR_IMAGE
} from '../actions/products.js'

export default function(state={}, action) {
	switch (action.type){
		case LIST_NEW_PRODUCT:
			return {
				isFetching: true
			};

		case LIST_FINISHED_PRODUCT: 
			return {
				isFetching: false,
				finished: true,
				products: action.products
			};

		case LIST_ERROR_PRODUCT:
			return {
				isFetching: false,
				error: action.error
			};

			//TODO: a lo mejor estas las deberia mover en un reducer de imagenes... 
		case NEW_IMAGE:
			return {
				isFetching: true,
				finished: false
			}

		case FINISHED_IMAGE:
			return {
				isFetching: false,
				finished: true,
				image: action.image
			};

		case ERROR_IMAGE: 
			return {
				isFetching:false,
				error: action.error
			};

	}
	return state;
}
