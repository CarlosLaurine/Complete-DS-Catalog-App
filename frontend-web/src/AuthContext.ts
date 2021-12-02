import { createContext } from 'react';
import { TokenData } from 'util/token';

export type AuthContextData = {
  isAuthenticated: boolean;
  tokenData?: TokenData;
};

export type AuthContextType = {
  authContextData: AuthContextData;
  setAuthContextData: (authContextData: AuthContextData) => void;
};

export const AuthContext = createContext<AuthContextType>({
  authContextData: {
    isAuthenticated: false,
  },
  setAuthContextData: () => null,
});
