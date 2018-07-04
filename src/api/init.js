import axios from 'axios';

const config = {
  baseURL: 'http://localhost:3000/api'
};
const instance = axios.create(config);

export default instance;