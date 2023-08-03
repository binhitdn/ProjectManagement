import axios from 'axios';
import Config from 'react-native-config';

const instance = axios.create({
  baseURL: Config.API_URL,
});
instance.interceptors.response.use(response => {
  return response;
});

export default instance;
