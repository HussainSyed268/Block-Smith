
// App.js
import React from 'react';
import { AuthProvider } from './auth/AuthProvider';
import LoginComponent from './pages/LogIn';
import SignupComponent from './pages/SignUp';
import HomeComponent from './pages/Home';
import Layout from './layout';
import ParticleBackground from './ParticleBackground';
import './App.css';
import UserDashboard from './components/UserDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Bitcoin from './pages/Bitcoin';


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
    
    {/* <Layout>
    <ParticleBackground id="particles"/>
      <AuthProvider>
        <Router>
        <Routes>
          <Route path="/login" element={<LoginComponent/>}>
          </Route>
          <Route path="/home" element={<HomeComponent/>}>
          </Route>
          <Route path="/signup" element={<SignupComponent/>}>
          </Route>
          <Route path="/dashboard" element={<UserDashboard/>}>
          </Route>
          </Routes>
        </Router>
      </AuthProvider>
     
      </Layout>  */}

      <Bitcoin/>
      
      </>

  )
}


export default App;
