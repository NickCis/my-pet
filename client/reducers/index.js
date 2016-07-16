import { combineReducers } from 'redux'

import page from './page';
import login from './login';
import user from './user';
import profile from './profile';

const rootReducer = combineReducers({
  login,
  page,
  user,
  profile
});

export default rootReducer
