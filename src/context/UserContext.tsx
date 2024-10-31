'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { User } from '@/types';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  role: string | null;
  setRole: (role: string | null) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  isAdmin: () => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode; }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve data from localStorage on mount
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedToken) setToken(storedToken);
    if (storedRole) setRole(storedRole);

    // Retrieve token from cookies if exists
    const cookieToken = Cookies.get('jwt');
    if (cookieToken && !storedToken) setToken(cookieToken);
  }, []);

  const setUserData = (userData: User | null) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  };

  const setTokenData = (tokenData: string | null) => {
    setToken(tokenData);
    if (tokenData) {
      localStorage.setItem('token', tokenData);
      Cookies.set('jwt', tokenData, {
        expires: 30,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
    } else {
      localStorage.removeItem('token');
      Cookies.remove('jwt');
    }
  };

  const setRoleData = (roleData: string | null) => {
    setRole(roleData);
    if (roleData) {
      localStorage.setItem('role', roleData);
    } else {
      localStorage.removeItem('role');
    }
  };

  const logout = () => {
    setUserData(null);
    setTokenData(null);
    setRoleData(null);
  };

  const isLoggedIn = (): boolean => {
    return !!user && !!token;
  };

  const isAdmin = (): boolean => {
    return isLoggedIn() && role === 'ADMIN';
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser: setUserData,
      token,
      setToken: setTokenData,
      role,
      setRole: setRoleData,
      logout,
      isLoggedIn,
      isAdmin
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}