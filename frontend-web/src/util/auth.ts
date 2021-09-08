import jwtDecode from 'jwt-decode';
import { getAuthData } from './auth-storage';

export type Role = 'ROLE_ADMIN' | 'ROLE_OPERATOR';

export type TokenData = {
  exp: number;
  user_name: string;
  authorities: Role[];
};

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
