'use client';

import { useState, useEffect } from 'react';
import { auth } from '../services/auth';

interface User {
  name?: string;
  email?: string;
  picture?: string;
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const isAuthed = auth.isAuthenticated();
        setIsAuthenticated(isAuthed);
        
        if (isAuthed) {
          const userInfo = await auth.getUser();
          setUser(userInfo);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return {
    isAuthenticated,
    login: auth.login,
    logout: auth.logout,
    user,
    isLoading,
    getAccessToken: auth.getAccessToken,
  };
}; 