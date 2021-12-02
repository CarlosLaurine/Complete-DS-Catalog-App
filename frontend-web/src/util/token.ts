import jwtDecode from "jwt-decode";
import { Role } from "types/role";
import { getAuthData } from "./auth-storage";

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