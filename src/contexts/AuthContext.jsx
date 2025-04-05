import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin } from '../services/api';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // First, login to get tokens
      const response = await apiLogin(email, password);
      
      // Then fetch user profile with the token
      const userResponse = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
        headers: {
          'Authorization': `Bearer ${response.access_token}`
        }
      });
      
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const userData = await userResponse.json();
      const user = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role || 'user',
        accessToken: response.access_token,
        refreshToken: response.refresh_token
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      return user;
    } catch (error) {
      console.error('Login error:', error);
      if (error.message.includes('Invalid email or password')) {
        throw new Error('Invalid email or password');
      } else if (error.message.includes('Failed to fetch user profile')) {
        throw new Error('Failed to fetch user profile');
      } else {
        throw new Error('An error occurred during login. Please try again.');
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 