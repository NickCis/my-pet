import {
	REQUEST_MATCH,
	FINISHED_MATCH,
	ERROR_MATCH
} from '../actions/match';



export default function(state={}, action) {
	switch(action.type){
		case REQUEST_MATCH:
			return{
				isFetching: true,
				finished: false
			};

		case FINISHED_MATCH:
			return{
				...state,
				isFetching: false,
				finished: true,
				match: action.match
			};

		case ERROR_MATCH:
			return{
				isFetching: false,
				error: action.error,
			};
	}
	return state;
}
