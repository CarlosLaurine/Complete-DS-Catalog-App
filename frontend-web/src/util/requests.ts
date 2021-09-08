import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { getAuthData } from './auth-storage';

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'dscatalog123';

type LoginData = {
  username: string;
  password: string;
};

const basicAuthHeader = () =>
  'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET);

export const requestAPILogin = (loginData: LoginData) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: basicAuthHeader,
  };

  const data = qs.stringify({
    username: loginData.username,
    password: loginData.password,
    //...loginData,
    grant_type: 'password',
  });

  return axios({
    method: 'post',
    url: '/oauth/token',
    baseURL: BASE_URL,
    headers,
    data,
  });
};

export const requestAPI = (config: AxiosRequestConfig) => {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: 'Bearer ' + getAuthData().access_token,
      }
    : config.headers;

  return axios({ ...config, baseURL: BASE_URL, headers });
};
