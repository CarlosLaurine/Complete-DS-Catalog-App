import { getMaxListeners } from 'process';
import qs from 'qs';

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ?? 'https://localhost:8080';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'dscatalog123';

type LoginData = {
  username: string;
  password: string;
};

const basicAuthHeader = () => {
  return 'Basic' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET);
};

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
};
