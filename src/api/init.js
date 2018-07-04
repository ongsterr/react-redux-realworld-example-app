import axios from 'axios';

const config = {
  baseURL: 'https://conduit.productionready.io/api'
};
const instance = axios.create(config);

export default instance;