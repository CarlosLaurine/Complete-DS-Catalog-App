const tokenKey = 'authData';

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  userFirstName: string;
  userId: number;
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
