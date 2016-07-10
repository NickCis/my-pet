import { combineReducers } from 'redux'

import page from './page';
import login from './login';
import user from './user';

const rootReducer = combineReducers({
  login,
  page,
  user
});

export default rootReducer
