import { NEW_PRODUCT } from '../actions/newProduct.js'

export default function(state={}, action) {
	switch (action.type){
		case NEW_PRODUCT:
			return {
				isFetching: true,
				username: action.username,
				productId: action.productId
			};
		default: 
			return state;
	}
}

