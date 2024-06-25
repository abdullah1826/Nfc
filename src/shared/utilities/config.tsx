import axios from 'axios';
import {BASE_URL} from '../../exporter';
import { store } from '../../redux/store';

const HTTP_CLIENT = axios.create({
  baseURL: BASE_URL,
});


const initialConfig = () => {
  setupAxios();
};

const setupAxios = () => {
  HTTP_CLIENT.interceptors.request.use(
    config => {
      const { userData } = store.getState().user;

      if (userData && userData.token && config.headers) {
        config.headers.Authorization = `Bearer ${userData.token}`;
      } else {
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );
};

export {HTTP_CLIENT, setupAxios, initialConfig};
