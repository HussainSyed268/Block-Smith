import React, {useEffect} from 'react';
import HomeSection from '../components/HomeSection';
import Advantages from '../components/Advantages';
import Bux from '../components/Bux';
import Works from '../components/Works'
import {useCookies} from 'react-cookie';
import axios from 'axios';
import Nav from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const fetchToken = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/auth/token', {
        withCredentials: true,
      });
      if (response.data.token) {
        navigate('/home');
      }
    } catch (error) {
      navigate('/login');
    }
  };

  return (
    <div>
      <HomeSection />
      <Advantages />
      <Bux />
      <Works />
    </div>
  );
};

export default HomePage;
