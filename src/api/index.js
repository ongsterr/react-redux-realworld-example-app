import axios from './init';

export default {
  Articles,
  Auth,
  setToken,
}

let token = null;
function setToken(_token) {
  token = _token;
}

const tokenPlugin = token ? {'Authorization': `Bearer ${token}`} : '';

const requests = {
  get: async url => await axios({
    method: 'get',
    url,
    headers: tokenPlugin
  }).then(res => res.data),
  post: async (url, body) => await axios({
    method: 'post',
    url,
    headers: tokenPlugin
  }, body).then(res => res.data),
  put: async (url, body) => await axios({
    method: 'put',
    url,
    headers: tokenPlugin
  }, body).then(res => res.data)
}

const Articles = {
  all: () => requests.get('/articles?limit=10'),
}

const Auth = {
  login: (email, password) => requests.post('/users/login', {user: {email, password}}),
  current: () => requests.get('/user'),
  register: (username, email, password) => requests.post('/users', {user: {username, email, password}}),
  update: user => requests.put('/user', user),
}