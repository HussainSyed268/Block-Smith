import React from "react";
import illustration from "../assests/home/file.png";

export default function HomeSection() {
    return(
        <>
        <div className="flex flex-row mt-24 mx-32 justify-between ">
            <div className="w-2/5 relative left-10 top-10" >
            <h1 className=" text-6xl text-white font-semibold text-left ">
            Your Premier Blacksmith for Mining Needs & Exclusive Coin, Bux!
            </h1>
            <p className="text-gray-300 font-roboto py-8 text-left">
            You can buy and sell coins as well as you will get periodic mining outputs to your designated wallet. We have the fastest bitcoin mining hardware running for you!
            </p>
            <button className="bg-red-600 text-white px-4 py-2 rounded-xl font-semibold ">Get Started</button>
        </div>
            <div className="">
                <img className="w-3/6 relative left-64 bottom-8" src={illustration} alt="illustration" />
            </div>
        </div>
        <div className="flex justify-center">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex justify-center items-center mt-4 mb-16">
                       <a href="#"> <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg></a>
                    </div>
        </div>
        </>
    )


}