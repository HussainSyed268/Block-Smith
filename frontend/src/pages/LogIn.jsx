import React, { useState,useContext } from 'react';
import logo from "../assests/logo.png";
import {toast, ToastContainer} from 'react-toastify';
import { AuthContext } from '../auth/AuthProvider';



export default function LogIn() {
  
  const { login } = useContext(AuthContext);
  const [values, setValues] = useState({
      email: '',
      password: '',
  });

  const generateError = (err) => {
      toast.error(err, {
          position: "bottom-right",
      });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(values.email, values.password);
    } catch (error) {
      console.log(error);
      if (error.response) {
        const responseData = error.response.data;
        if (responseData.errors) {
          const { email, password, name, phone } = responseData.errors;
          if (email) generateError(email);
          if (password) generateError(password);
          if (name) generateError(name);
          if (phone) generateError(phone);
        } else if (responseData.message) {
          generateError(responseData.message);
        }
      } else {
        generateError('An error occurred. Please try again.');
      }
    }
  }


  return (

    <div className="">
      <div className="flex justify-center h-screen">
          
  

        <div className="flex items-center w-full h-2/3 max-w-md px-6 mx-auto lg:w-2/6">
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
                  <input type="email" name="email" id="email" placeholder="example@example.com"  onChange={(e)=> setValues({...values, [e.target.name]:e.target.value})} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-600 dark:text-gray-200">Password</label>
                  </div>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />

                </div>

                <div className="mt-6">
                  <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Sign in
                  </button>
                </div>

              </form>

              <p className="mt-6 text-sm text-center text-gray-400">Don't have an account yet? <a href="/signup" className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign up</a>.</p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
