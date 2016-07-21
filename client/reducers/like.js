import {
  REQUEST_DEL_LIKE,
  FINISHED_DEL_LIKE,
  ERROR_DEL_LIKE,
  INVALIDATE_DEL_LIKE
} from '../actions/like';

const getDefaultDelState = () => {
  return { isLoading: false, success: false, from: 0, to: 0, error: undefined };
};

export default function(state={
  del: getDefaultDelState()
}, action) {
  switch(action.type){
    case REQUEST_DEL_LIKE:
      return {
        ...state,
        del: {
          isLoading: true,
          from: action.from,
          to: action.to
        }
      };
    case FINISHED_DEL_LIKE:
      return {
        ...state,
        del: {
          ...state.del,
          isLoading: false,
          success: true
        }
      };

    case ERROR_DEL_LIKE:
      return {
        ...state,
        del: {
          ...state.del,
          isLoading: false,
          error: action.error
        }
      };

    case INVALIDATE_DEL_LIKE:
      return {
        ...state,
        del: getDefaultDelState()
      };
  }

  return state;
}
