import React, { useState } from 'react';
import logo from "../assests/logo.png";
import { useAuth } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';




export default function LogIn() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const { login } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Redirect or show success message
    navigate('/login');

    } catch (error) {
      console.error('Login error:', error);
      // Handle login error, show error message to user, etc.
    }
  };

  if (user) {
    navigate('/home');
    return null; // Render nothing while redirecting
  }


  return (

    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/3 bg-opacity-50" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1629339941379-da30348cdba6?auto=format&fit=crop&w=1470&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)" }}>
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-60">
            <div className='relative left-36'>
              <h2 className=" text-4xl font-bold text-white sm:text-3xl">BlockSmith</h2>

              <p className="max-w-xl text-base text-white">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus
                molestiae
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
                <img className="sm:h-16" src={logo} alt="" />
              </div>

              <p className="mt-3 text-gray-500 font-medium dark:text-gray-300">Sign in to access your account</p>
            </div>

            <div className="mt-8">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium text-start text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                  <input type="email" name="email" id="email" placeholder="example@example.com" value={email} onChange={handleEmailChange} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-600 dark:text-gray-200">Password</label>
                  </div>

                  <input type="password" name="password" id="password" placeholder="Your Password" value={password} onChange={handlePasswordChange} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>

                <div className="mt-6">
                  <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Sign in
                  </button>
                </div>

              </form>

              <p className="mt-6 text-sm text-center text-gray-400">Don't have an account yet? <a href="#" className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign up</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
