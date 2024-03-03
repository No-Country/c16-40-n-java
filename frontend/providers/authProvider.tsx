'use client';

import { LoginResponse } from '@/lib/actions/auth/login';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextType {
  token: string | null;
  userData: string | null;
  login: (userData: LoginResponse) => void;
  logout: () => void;
  checkTokenExpiration: () =>
    | {
        title: string;
        description: string;
      }
    | null
    | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('token') : null
  );

  const [tokenExpirationDate, setTokenExpirationDate] = useState<string | null>(
    typeof window !== 'undefined'
      ? localStorage.getItem('tokenExpirationDate')
      : null
  );

  const [userData, setUserData] = useState<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('userData') : null
  );

  const login = (userData: LoginResponse) => {
    setToken(userData.token);
    setTokenExpirationDate(userData.expirationDate);
    setUserData(userData.email);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('tokenExpirationDate', userData.expirationDate);
    localStorage.setItem('userData', userData.email);
  };

  const logout = () => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserData(null);
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpirationDate');
    localStorage.removeItem('userData');
  };

  const checkTokenExpiration = () => {
    if (!tokenExpirationDate) {
      return {
        title: 'Es necesario iniciar sesión.',
        description: 'Debes iniciar sesión para poder realizar esta acción.',
      };
    }
    if (tokenExpirationDate) {
      const expirationDate = new Date(tokenExpirationDate);
      if (expirationDate.getTime() < new Date().getTime()) {
        logout();
        return {
          title: 'La sesión ha expirado.',
          description:
            'Debes iniciar sesión nuevamente para poder realizar esta acción.',
        };
      }
    } else {
      return null;
    }
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (tokenExpirationDate) {
        const expirationDate = new Date(tokenExpirationDate);
        if (expirationDate.getTime() < new Date().getTime()) {
          console.log('El token ha expirado.');
          logout();
        }
      }
    };

    checkTokenExpiration();
  }, [tokenExpirationDate]);

  return (
    <AuthContext.Provider
      value={{ token, userData, login, logout, checkTokenExpiration }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};
