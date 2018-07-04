import axios from './init';

export default {
  getArticles,
}

async function getArticles() {
  const response = await axios.get('/articles?limit=10');
  return response.data;
}