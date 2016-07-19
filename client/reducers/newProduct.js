import {
	NEW_PRODUCT,
	FINISHED_PRODUCT,
	ERROR_PRODUCT,
	INVALIDATE_PRODUCT
} from '../actions/newProduct.js'

export default function(state={}, action) {
	switch (action.type){
		case NEW_PRODUCT:
			return {
				isFetching: true,
				//username: action.username,
				productId: action.productId
			};
		case FINISHED_PRODUCT:
			return {
				isFetching: false,
				finished: true,
				productId: action.productId
			};

		case ERROR_PRODUCT:
			return {
				isFetching: false,
				error : action.error
			};

		case INVALIDATE_PRODUCT:
			return {};
	}

	return state;
}

