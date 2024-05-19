import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../auth/AuthProvider';

export default function Nav() {
  const { isLoggedIn, logout, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/auth/token', {
          withCredentials: true,
        });
        if (response.data.token) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    fetchToken();
  }, [setIsLoggedIn]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="flex text-gray-300 font-roboto justify-between h-[7rem]">
      <div className="my-10 mx-14 font-semibold text-base">
        <a href="/home" className="px-4 hover:text-red-600 transition-all">Home</a>
        <a href="#" className="px-4 hover:text-red-600 transition-all">Why Blocksmith</a>
        <a href="#" className="px-4 hover:text-red-600 transition-all">Contact Us</a>
        <a href="#" className="px-4 hover:text-red-600 transition-all">News and Announcement</a>
        {isLoggedIn && (
          <a href="/dashboard" className="px-4 hover:text-red-600 transition-all">Dashboard</a>
        )}
      </div>
      <div className="flex my-10 mx-14 font-semibold text-base relative right-4">
        {isLoggedIn ? (
          <button 
            onClick={handleLogout} 
            className="px-4 h-10 bg-red-600 rounded-xl text-white"
          >
            Log Out
          </button>
        ) : (
          <>
            <a href="/login">
              <button className="px-4 h-10 hover:text-red-600 transition-all">Log In</button>
            </a>
            <a href="/signup">
              <button className="px-4 h-10 bg-red-600 rounded-xl text-white">Sign Up</button>
            </a>
          </>
        )}
      </div>
    </nav>
  );
}
