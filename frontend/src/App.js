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
import UserDashboard from './components/UserDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// import Bitcoin from './pages/Bitcoin';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>

      <ParticleBackground id="particles" />
      <Router>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/home" element={<HomeComponent />} />
              <Route path="/signup" element={<SignupComponent />} />
              <Route path="/network" element={<Networking />} />
              <Route path="/mining" element={<Mining />} />
              <Route path="/dashoard" element={<Mining />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
