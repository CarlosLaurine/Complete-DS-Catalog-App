import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import history from './history';
import jwtDecode from 'jwt-decode';

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'dscatalog123';

const tokenKey = 'authData';

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

type Role = 'ROLE_ADMIN' | 'ROLE_OPERATOR';

export type TokenData = {
  exp: number;
  user_name: string;
  authorities: Role[];
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

export const saveAuthData = (loginResponse: LoginResponse) => {
  localStorage.setItem(tokenKey, JSON.stringify(loginResponse));
};

export const removeAuthData = () => {
  localStorage.removeItem(tokenKey);
};

export const getAuthData = () => {
  const string = localStorage.getItem(tokenKey) ?? '{}';
  const obj = JSON.parse(string) as LoginResponse;
  return obj;
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

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.response.status === 401 || error.response.status === 403) {
      history.push('/admin/auth');
    }

    return Promise.reject(error);
  }
);

export const getTokenData = (): TokenData | undefined => {
  const accessToken = getAuthData().access_token;

  try {
    return jwtDecode(accessToken) as TokenData;
  } catch (error) {
    return undefined;
  }
};

export const isAuthenticated = (): boolean => {
  let tokenData = getTokenData();

  const authenticated =
    tokenData && tokenData.exp > Date.now() / 1000 ? true : false;

  return authenticated;
};

export const hasAnyRoles = (roles: Role[]): boolean => {
  if (roles.length === 0) {
    return true;
  }

  const tokenData = getTokenData();

  if (tokenData !== undefined) {
    return roles.some((role) => tokenData.authorities.includes(role));
  }

  //  if (tokenData !== undefined) {
  //    for (var i = 0; i < roles.length; i++) {
  //      if (tokenData.authorities.includes(roles[i])) {
  //        return true;
  //      }
  //    }
  //  }

  return false;
};
