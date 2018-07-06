import axios from './init';

let token = null;
function setToken(_token) {
  token = _token;
}

const requests = {
  get: async url => {
      const response = await axios({
      method: 'get',
      url,
      headers: token ? {'Authorization': `Bearer ${token}`} : ''
    });
    return response.data;
  },
  post: async (url, body) => {
    const response = await axios({
      method: 'post',
      url,
      headers: token ? {'Authorization': `Bearer ${token}`} : '',
      data: body,
    });
    return response.data;
  },
  put: async (url, body) => {
    const response = await axios({
      method: 'put',
      url,
      headers: token ? {'Authorization': `Bearer ${token}`} : '',
      data: body,
    });
    return response.data;
  },
  delete: async url => {
    const response = await axios({
      method: 'delete',
      url,
      headers: token ? {'Authorization': `Bearer ${token}`} : '',
    });
    return response.data;
  },
}

const Articles = {
  all: () => requests.get('/articles?limit=10'),
  get: slug => requests.get(`/articles/${slug}`),
  del: slug => requests.delete(`/articles/${slug}`),
  byAuthor: (author, page) => requests.get(`/articles?author=${encodeURIComponent(author)}&limit=5`),
}

const Comments = {
  forArticle: slug => requests.get(`/articles/${slug}/comments`),
  create: (slug, comment) => requests.post(`/articles/${slug}/comments`, {comment}),
  delete: (slug, commentId) => requests.delete(`/articles/${slug}/comments/${commentId}`),
}

const Auth = {
  login: (email, password) => requests.post('/users/login', {user: {email, password}}),
  current: () => requests.get('/user'),
  register: (username, email, password) => requests.post('/users', {user: {username, email, password}}),
  save: user => requests.put('/user', {user}),
}

const Profile = {
  follow: username => requests.post(`/profiles/${username}/follow`),
  get: username => requests.get(`/profiles/${username}`),
  unfollow: username => requests.delete(`/profiles/${username}/follow`),
}

export default {
  Articles,
  Comments,
  Auth,
  Profile,
  setToken,
}