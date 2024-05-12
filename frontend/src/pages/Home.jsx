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
  const [cookies, setCookies, removeCookies] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if(!cookies.jwt) {
        navigate('/login');
      } else {
        const data = await axios.get('http://localhost:4000/api/auth/home', {}, {
          withCredentials: true
        });
      if(!data.status){
        removeCookies('jwt');
        navigate('/login');
      };
      

      }; verifyUser();
    }
  }, [cookies, navigate]);
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
