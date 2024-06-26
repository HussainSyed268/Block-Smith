import React, {useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogIn from './LogIn';
import logo from "../assests/logo.png";
import axios from 'axios';
import { AuthContext } from '../auth/AuthProvider';
import {toast, ToastContainer} from 'react-toastify';


export default function SignUp(){
    const {signup} = useContext(AuthContext);
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const generateError = (err) => {
        toast.error(err, {
            position: "bottom-right",
        });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await signup(values.name, values.phone, values.email, values.password, values.confirmPassword);
        }
        catch (error) {
        {console.log(error)}
        if (error.response) {
            const responseData = error.response.data;
            if (responseData.errors) {
                const { email, password, name, phone } = responseData.errors;
                if (email) generateError(email);
                if (password) generateError(password);
                if (name) generateError(name);
                if (phone) generateError(phone);
            }  else if (responseData.message) {
                generateError(responseData.message);
            }
        }   else {
            generateError('An error occurred. Please try again.');
        }
            // {console.log("errors")}
            
            // {console.log("email")}
            // if (email) generateError(email);
            // if (password) generateError(password);
            // if (name) generateError(name);
            // if (phone) generateError(phone);
        
    }
    }


    return (
        <section className="bg-transparent ">
            <div className="container flex  justify-center min-h-screen px-6 mx-auto">
                <form onSubmit={(e)=> handleSubmit(e)} className="w-full max-w-md">
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-7 sm:h-16" src={logo} alt=""/>
                    </div>
                  
                    <div className="flex items-center justify-center mt-6">

                        <a href="#" className="w-1/3 pb-4 text-2xl font-medium text-center text-gray-800 capitalize  dark:border-blue-400 dark:text-white">
                            sign up
                        </a>
                    </div>

                    <div className="relative flex items-center mt-6">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>

                        <input type="text" name='name' className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Name" onChange={(e)=>
                            setValues({...values, [e.target.name]: e.target.value })
                        }/>
                    </div>

                    <div className="relative flex items-center mt-6">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>

                        <input type="text" name='phone' className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Phone Number" onChange={(e)=>
                            setValues({...values, [e.target.name]: e.target.value })
                        }/>
                    </div>

                    <div className="relative flex items-center mt-6">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                        </span>

                        <input type="email" name='email' className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" onChange={(e)=>
                            setValues({...values, [e.target.name]: e.target.value })
                        }/>
                    </div>

                    <div className="relative flex items-center mt-6">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                            </svg>
                        </span>

                        <input type="password" name='password' className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" onChange={(e)=>
                            setValues({...values, [e.target.name]: e.target.value })
                        }/>
                    </div>

                    <div className="relative flex items-center mt-6">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                            </svg>
                        </span>

                        <input  type="password" name='confirmPassword' className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Confirm Password" onChange={(e)=> setValues({...values, [e.target.name]: e.target.value })} value={values.confirmPassword} />
                    </div>

                    <div className="mt-6">
                        <button type='submit' className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                            Sign Up
                        </button>

                        <div className="mt-6 text-center ">
                            <a href={LogIn} className="text-sm text-blue-500 hover: cursor-pointer dark:text-blue-400">
                                Already have an account? <Link to="/login">Log In</Link>
                            </a>
                        </div>
                    </div>
                    
                </form>
                <ToastContainer/>
            </div>
        </section>
    );
};


