import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

const persistentLogin = store => next => action => {
  let result = next(action);
  if(action.persistLogin)
    sessionStorage.setItem('MyPet/login', JSON.stringify(store.getState().login));
  return result;
};

export default function configureStore(preloadedState) {
  if(!preloadedState){
    const loginData = sessionStorage.getItem('MyPet/login');
    if(loginData)
      try {
        preloadedState = { login: JSON.parse(loginData) };
      } catch(e){}
  }

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, createLogger(), persistentLogin)
  )

  return store
}
