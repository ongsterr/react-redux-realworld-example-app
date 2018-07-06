import { applyMiddleware, createStore, combineReducers } from 'redux';
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import auth from './reducers/auth';
import common from './reducers/common';
import home from './reducers/home';
import settings from './reducers/settings';
import article from './reducers/article';
import profile from './reducers/profile';
import articleList from './reducers/articleList';

const reducer = combineReducers({
  article,
  articleList,
  auth,
  profile,
  common,
  home,
  settings
})

const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware);
const store = createStore(reducer, middleware);

export default store;