import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isMining, setIsMining] = useState(false);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('http://localhost:4000/api/auth/login', {
        email,
        password,
      }, {
        withCredentials: true, // Enable sending and receiving cookies
      });
      setUser(data.user);
      setIsLoggedIn(true);
      navigate('/home');
    } catch (error) {
      // Re-throw the error so it can be caught by the calling function
      throw error;
    }
  };

  const signup = async (name, phone, email, password, confirmPassword) => {
    try {
      const { data } = await axios.post('http://localhost:4000/api/auth/register', {
        name,
        email,
        phone,
        password,
        confirmPassword
      }, {
        withCredentials: true
      });
      setUser(data.user);
      setIsLoggedIn(true);
      navigate('/home');
    } catch (error) {
      // Re-throw the error so it can be caught by the calling function
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:4000/api/auth/logout', {}, { withCredentials: true });
      // removeCookies('jwt');
      setUser(null);
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const startMining = () => {
    setIsMining(true);
    setTimeout(() => {
      setIsMining(false);
    }, 5000);
  };

  // useEffect(() => {
  //   const token = cookies.jwt;
  //   if (token) {
  //     setIsLoggedIn(true);
  //   }
  // }, [cookies]);

  const contextValue = {
    isLoggedIn,
    user,
    login,
    signup,
    logout,
    setIsLoggedIn, // Expose this to update state directly
    isMining,
    setIsMining,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
