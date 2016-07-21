import { CHANGE_PAGE } from '../actions';

export default function(state={name: 'Home'}, action){
  switch(action.type){
    case CHANGE_PAGE:
      return {
        ...state,
        previous: state.name,
        name: action.page
      };
  }

  return state;
}
