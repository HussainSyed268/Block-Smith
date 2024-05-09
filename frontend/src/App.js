
// App.js
import React from 'react';
import { AuthProvider } from './auth/AuthProvider';
import LoginComponent from './pages/LogIn';
import SignupComponent from './pages/SignUp';
import HomeComponent from './pages/Home';
import Layout from './layout';
import ParticleBackground from './ParticleBackground';
import Networking from './pages/Network';
import Mining from './pages/Mining';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
    <ParticleBackground id="particles"/>
    <Layout>
      <AuthProvider>
        <Router>
        <Routes>
          <Route path="/login" element={<LoginComponent/>}>
          </Route>
          <Route path="/home" element={<HomeComponent/>}>
          </Route>
          <Route path="/signup" element={<SignupComponent/>}>
          </Route>
          <Route path="/network" element={<Networking/>}>
          </Route>
          <Route path="/mining" element={<Mining/>}>
          </Route>
          </Routes>
        </Router>
      </AuthProvider>
      </Layout>
      </>

  )
}


export default App;
