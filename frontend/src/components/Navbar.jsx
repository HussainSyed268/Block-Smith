import React, { useState } from "react";

export default function Nav() {
    
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    return(
    <>
        <nav className=" flex text-gray-300 font-roboto justify-between h-[7rem]">
            <div className=" my-10 mx-14 font-semibold text-base">
                <a href="#" className="px-4 hover:text-red-600 transition-all" >Home</a>
                <a href="#" className="px-4 hover:text-red-600 transition-all" >Why Blocksmith</a>
                <a href="#" className="px-4 hover:text-red-600 transition-all" >Contact Us</a>
                <a href="#" className="px-4 hover:text-red-600 transition-all" >News and Announcement</a>
            </div>
            <div className="flex my-10 mx-14 font-semibold text-base relative right-4">
                <button className="px-4 h-10 hover:text-red-600 transition-all" >Log In</button>
                <button className="px-4 h-10 bg-red-600 rounded-xl text-white" >Sign Up</button>
            </div>
        </nav>
    </>
)}