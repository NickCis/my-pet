import { combineReducers } from 'redux'

import page from './page';
import login from './login';
import user from './user';
import profile from './profile';
import newProduct from './newProduct';

const rootReducer = combineReducers({
  login,
  page,
  user,
  profile,
  newProduct
});

export default rootReducer
