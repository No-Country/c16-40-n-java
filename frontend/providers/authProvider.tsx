'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

interface AuthContextType {
  token: string | null;
  userData: string | null;
  login: (newToken: string, newUserData: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('token') : null
  );
  const [userData, setUserData] = useState<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('userData') : null
  );

  const login = (newToken: string, newUserData: string) => {
    setToken(newToken);
    setUserData(newUserData);
    localStorage.setItem('token', newToken);
    localStorage.setItem('userData', newUserData);
  };

  const logout = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  };

  return (
    <AuthContext.Provider value={{ token, userData, login, logout }}>
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
