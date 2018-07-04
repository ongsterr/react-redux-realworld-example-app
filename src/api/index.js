import axios from './init';

export default {
  getArticles,
  login,
  setToken,
  getCurrentUser,
  register
}

let token = null;
function setToken(_token) {
  token = _token;
}

async function getArticles() {
  const response = await axios.get('/articles?limit=10');
  return response.data;
}

async function login(email, password) {
  const response = await axios.post('/users/login', {
    user: {
      email,
      password
    },
  });
  return response.data;
}

async function getCurrentUser() {
  const response = await axios({
    method: 'get',
    url: '/user',
    headers: token ? {'authorization': `Token ${token}`} : ''
  });
  return response.data;
}

async function register(username, email, password) {
  const response = axios.post('/users', {
    username,
    email,
    password,
  });
  return response.data;
}