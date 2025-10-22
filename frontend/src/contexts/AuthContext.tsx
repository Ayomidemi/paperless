'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from '@/lib/api';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  avatar?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      // Mock user data for UI testing
      const mockUser = {
        id: '1',
        email: 'test@paperless.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'USER',
        createdAt: new Date().toISOString()
      };
      setUser(mockUser);
      // const response = await authAPI.getProfile();
      // setUser(response.data.user);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Mock login for UI testing
      const mockUser = {
        id: '1',
        email: email,
        firstName: 'John',
        lastName: 'Doe',
        role: 'USER',
        createdAt: new Date().toISOString()
      };
      const mockToken = 'mock-jwt-token';
      
      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem('token', mockToken);
      
      // const response = await authAPI.login(email, password);
      // const { user, token } = response.data;
      // setUser(user);
      // setToken(token);
      // localStorage.setItem('token', token);
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      // Mock registration for UI testing
      const mockUser = {
        id: '1',
        email: userData.email,
        firstName: userData.firstName || 'John',
        lastName: userData.lastName || 'Doe',
        role: 'USER',
        createdAt: new Date().toISOString()
      };
      const mockToken = 'mock-jwt-token';
      
      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem('token', mockToken);
      
      // const response = await authAPI.register(userData);
      // const { user, token } = response.data;
      // setUser(user);
      // setToken(token);
      // localStorage.setItem('token', token);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
