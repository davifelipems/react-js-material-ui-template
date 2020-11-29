import axios from "axios";
import { getToken } from "./auth";
import env from '../enviroments/enviroment';

const api = axios.create({
  baseURL: env.base_api
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;