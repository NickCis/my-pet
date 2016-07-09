import { REQUEST_LOGIN, FINISHED_LOGIN, ERROR_LOGIN } from '../actions/login';

export default function(state={}, action) {
  switch(action.type) {
    case REQUEST_LOGIN:
      return {
        ...state,
        isFetching: true,
        token: '',
        username: action.username
      };

    case FINISHED_LOGIN:
      return {
        ...state,
        isFetching: false,
        token: action.token
      };

    case ERROR_LOGIN:
      return {
        ...state,
        isFetching: false,
        token: '',
        username: '',
        error: action.error
      };
  }

  return state;
}
