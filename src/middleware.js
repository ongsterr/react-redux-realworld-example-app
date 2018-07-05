import api from './api';

const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: 'ASYNC_START', subtype: action.type });
    action.payload.then(
      res => {
        action.payload = res;
        store.dispatch(action);
      },
      error => {
        action.error = true;
        action.payload = error.response.body;
        store.dispatch(action);
      }
    );

    return;
  };

  next(action)
};

function isPromise(v) {
  return v && typeof v.then === 'function';
};

const localStorageMiddleware = store => next => action => {
  if (action.type === 'REGISTER' || action.type === 'LOGIN') {
    if (!action.error) {
      window.localStorage.setItem('jwt', action.payload.user.token);
      api.setToken(action.payload.user.token); // Need to build the "setToken" function in api
    }
  } else if (action.type === 'LOGOUT') {
    window.localStorage.setItem('jwt', '');
    api.setToken(null);
  }

  next(action);
};

export {
  localStorageMiddleware,
  promiseMiddleware,
};