
// App.js
import React from 'react';
import { AuthProvider } from './auth/AuthProvider';
import LoginComponent from './pages/LogIn';
import SignupComponent from './pages/SignUp';
import HomeComponent from './pages/Home';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
      <AuthProvider>
        <Router>
        <Routes>
          <Route path="/login" element={<LoginComponent/>}>
          </Route>
          <Route path="/home" element={<HomeComponent/>}>
          </Route>
          <Route path="/signup" element={<SignupComponent/>}>
          </Route>
          </Routes>
        </Router>
      </AuthProvider>


export default App;
