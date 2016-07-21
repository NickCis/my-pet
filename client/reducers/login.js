import {
  REQUEST_LOGIN,
  FINISHED_LOGIN,
  ERROR_LOGIN,
  INVALIDATE_LOGIN
} from '../actions/login';

export default function(state={}, action) {
  switch(action.type) {
    case REQUEST_LOGIN:
      return {
        isFetching: true,
        username: action.username
      };

    case FINISHED_LOGIN:
      return {
        username: state.username,
        isFetching: false,
        token: action.token
      };

    case ERROR_LOGIN:
      return {
        isFetching: false,
        error: action.error
      };

    case INVALIDATE_LOGIN:
      return {
        ...state,
        error: undefined,
        isFetching: false
      };
  }

  return state;
}
