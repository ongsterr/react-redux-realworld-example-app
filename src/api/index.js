import axios from './init';

export default {
  getArticles,
  login,
  setToken,
  getCurrentUser,
  register,
  updateSetting
}

let token = null;
function setToken(_token) {
  token = _token;
}

async function getArticles() {
  const response = await axios({
    method: 'get',
    url: '/articles?limit=10',
    headers: token ? {'Authorization': `Bearer ${token}`} : '',
  });
  return response.data;
}

async function login(email, password) {
  const response = await axios({
    method: 'post',
    url: '/users/login',
    headers: token ? {'Authorization': `Bearer ${token}`} : '',
    data: {
      user: {
        email,
        password
      }
    },
  });
  return response.data;
}

async function getCurrentUser() {
  const response = await axios({
    method: 'get',
    url: '/user',
    headers: token ? {'Authorization': `Bearer ${token}`} : ''
  });
  return response.data;
}

async function register(username, email, password) {
  const response = await axios({
    method: 'post',
    url: '/users',
    headers: token ? {'Authorization': `Bearer ${token}`} : '',
    data: {
      user: {
        username,
        email,
        password
      }
    },
  });
  return response.data;
}

async function updateSetting(user) {
  const response = await axios({
    method: 'put',
    url: '/user',
    headers: token ? {'Authorization': `Bearer ${token}`} : '',
    data: user,
  });
  return response.data;
};