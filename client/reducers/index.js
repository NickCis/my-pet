import { combineReducers } from 'redux'

import page from './page';
import login from './login';
import user from './user';
import profile from './profile';
import pet from './pet';
import candidate from './candidate';
import pet_info from './pet_info';
import match from './match';
import like from './like';

import { LOGOUT } from '../actions/login';

const appReducer = combineReducers({
  login,
  page,
  user,
  profile,
  pet,
  candidate,
  pet_info,
  match,
  like
});

const rootReducer = (state, action) => {
  if(action.type === LOGOUT)
    state = undefined;

  return appReducer(state, action);
}

export default rootReducer
