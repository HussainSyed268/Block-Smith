// AuthContext.js
import React, { createContext, useContext, useState,useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      // Update accessToken and refreshToken state
      setAccessToken(data.access);
      setRefreshToken(data.refresh);

      // Fetch user details
      const userResponse = await fetch('http://localhost:8000/api/users/me', {
        headers: {
          Authorization: `Bearer ${data.access}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error('Failed to fetch user details');
      }

      const userData = await userResponse.json();

      // Update user state
      setUser(userData);

      // Set isAuthenticated to true
      setIsAuthenticated(true);

      // Save tokens to localStorage
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error, show error message to user, etc.
    }
  };

  const signup = async (firstName, lastName, email, password) => {
    try {
      const response = await fetch('http://localhost:8000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      // Signup successful, you might want to handle this according to your application logic
    } catch (error) {
      console.error('Signup error:', error);
      // Handle signup error, show error message to user, etc.
    }
  };

  const getUser = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await fetch('http://localhost:8000/api/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }

      const userData = await response.json();

      // Update user state
      setUser(userData);
    } catch (error) {
      console.error('Get user error:', error);
      // Handle error, such as clearing user state
      setUser(null);
    }
  };

  const logout = () => {
    // Clear tokens and user state
    setAccessToken('');
    setRefreshToken('');
    setUser(null);
    setIsAuthenticated(false);

    // Clear localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  };

  useEffect(() => {
    // Check if user is authenticated based on tokens in localStorage
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const user = JSON.parse(localStorage.getItem('user'));

    if (accessToken && refreshToken && user) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  const contextValue = {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    login,
    logout,
    getUser,
    signup,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
