import axios from 'axios';
import qs from 'qs';

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'dscatalog123';

type LoginData = {
  username: string;
  password: string;
};

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  userFirstName: string;
  userId: number;
};

const basicAuthHeader = () =>
  'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET);

export const requestAPILogin = (loginData: LoginData) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: basicAuthHeader,
  };

  const data = qs.stringify({
    username: 'maria@gmail.com',
    password: '123456',
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

export const saveAuthData = (loginResponse: LoginResponse) => {
  localStorage.setItem('authData', JSON.stringify(loginResponse));
};
