import React, { useState } from "react";
import logo from "../assests/logo.png";

export default function Nav() {
    
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        // You can implement further logic here to toggle dark mode in your application
    };

    return (
        <nav className={`relative bg-white shadow ${isDarkMode ? 'dark:bg-gray-800' : ''}`}>
            <div className=" container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
                <div className="flex items-center justify-between">
                    <a className="flex " href="#">
                    <img className=" w-10 h-10 relative bottom-1" src={logo} alt="cryptocurrency" />

                        <h2 className="text-gray-800 mx-2 relative top-0.5 font-sans font-medium text-xl dark:text-white">BlockSmith</h2>
                    </a>

                    {/* Mobile menu button */}
                    <div className="flex lg:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                            {!isOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu open: "block", Menu closed: "hidden" */}
                <div className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out  bg-white  md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 ${isOpen ? 'translate-x-0 opacity-100 ' : 'opacity-0 -translate-x-full'} md:flex md:items-center`}>
                    <div className="flex flex-col relative left-96 text-base font-medium md:flex-row md:px-6">
                        <a className="my-2 text-black transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:px-4 md:my-0" href="#">Home</a>
                        <a className="my-2 text-black transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:px-4 md:my-0" href="#">Shop</a>
                        <a className="my-2 text-black transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:px-4 md:my-0" href="#">Contact</a>
                        <a className="my-2 text-black transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:px-4 md:my-0" href="#">About</a>
                    </div>
                </div>
                <div className="flex justify-center px-4 md:block">
                    <button className="px-4 mx-2 py-1.5 font-medium tracking-wide text-blue-600 capitalize transition-colors duration-300 transform bg-white rounded-lg hover: focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                        Log In
                    </button>
                <button className="px-4 py-1.5 mx-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                        Sign up
                    </button>
                        <button onClick={toggleDarkMode} className="relative top-1.5 left-4 text-gray-700 transition-colors duration-300 transform dark:text-white hover:text-white dark:hover:white" aria-label="Toggle Dark Mode">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#ffffff">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                {/* Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools */}
                                <title>ic_fluent_dark_theme_24_regular</title>
                                <desc>Created with Sketch.</desc>
                                <g id="🔍-Product-Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g id="ic_fluent_dark_theme_24_regular" fill="#212121" fillRule="nonzero">
                                        <path d="M12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 Z M12,20.5 L12,3.5 C16.6944204,3.5 20.5,7.30557963 20.5,12 C20.5,16.6944204 16.6944204,20.5 12,20.5 Z" id="🎨-Color"></path>
                                    </g>
                                </g>
                            </g>
                        </svg>

                            <span className={`absolute top-0 left-0 p-1 text-xs text-white rounded-full ${isDarkMode ? 'bg-yellow-500' : 'bg-blue-500'}`}></span>
                        </button>
                    </div>
            </div>
        </nav>
    );
}
