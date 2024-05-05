import React from "react";
import { FaFacebookSquare, ImFacebook2 } from "react-icons/im";
import { FaSquareInstagram } from "react-icons/fa6";
export default function Footer() {

    return(
        <>
            <div className="flex mt-32 font-roboto bg-zinc-800">
                <div className=" w-1/5 text-left ">
                    <h1 className="text-white text-3xl font-semibold my-10 pl-16">
                        BlockSmith
                    </h1>
                    <p className="w-full text-gray-300 text-lg font-medium px-16 my-8">
                        The new creative economy that will lead the world.
                    </p>
                    {/* <div className="flex flex-row">
                    <ImFacebook2 fill="#dddddd" color="#333333" style={{ padding:"4px", height: "60px" }} />
                    <FaSquareInstagram fill="#dddddd" color="#333333" style={{ padding:"4px", height: "30px" }} />
                    </div> */}
                </div>
                <div className="w-1/5 text-left">
                    <h1 className="text-white text-xl font-semibold mt-8 mb-4 pl-16">
                        BlockSmith
                    </h1>
                    <p className="w-full text-gray-300 text-sm font-medium px-16 my-4">
                        Discover
                    </p>
                    <p className="w-full text-gray-300 text-sm font-medium px-16 my-4">
                        Connect Wallet
                    </p>
                    <p className="w-full text-gray-300 text-sm font-medium px-16 my-4">
                        Create Item
                    </p>
                </div>
                <div className="w-1/5 text-left">
                    <h1 className="text-white text-xl font-semibold mt-8 mb-4 pl-16">
                        Info
                    </h1>
                    <p className="w-full text-gray-300 text-sm font-medium px-16 my-4">
                        Download
                    </p>
                    <p className="w-full text-gray-300 text-sm font-medium px-16 my-4">
                        Internal
                    </p>
                    <p className="w-full text-gray-300 text-sm font-medium px-16 my-4">
                        Communication
                    </p>
                    <p className="w-full text-gray-300 text-sm font-medium px-16 my-4">
                        Support
                    </p>
                    <p className="w-full text-gray-300 text-sm font-medium px-16 my-4">
                        Video Showcase
                    </p>
                </div>
                <div className="w-1/5 text-left">
                    <h1 className="text-white text-xl font-semibold mt-8 mb-4 pl-16">
                        Resources
                    </h1>
                    <p className="w-full text-gray-300 text-sm font-medium px-16 my-4">
                        Blog
                    </p>
                    <p className="w-full text-gray-300 text-sm font-medium px-16 my-4">
                        Customer
                    </p>
                    <p className="w-full text-gray-300 text-sm font-medium px-16 my-4">
                        Watch a Demo
                    </p>
                </div>
                <div className="w-1/5 text-left">
                    <h1 className="text-white text-xl font-semibold mt-8 mb-4 pl-16">
                        Company
                    </h1>
                    <p className="w-full text-gray-300 text-sm font-medium px-16 my-4">
                        About Us
                    </p>
                    <p className="w-full text-gray-300 text-sm font-medium px-16 my-4">
                        Press
                    </p>
                    <h1 className="text-white text-xl font-semibold mt-8 mb-4 pl-16">
                        Legal
                    </h1>
                    <p className="w-full text-gray-300 text-sm font-medium px-16 my-4">
                        Terms and conditions
                    </p>
                    <p className="w-full text-gray-300 text-sm font-medium px-16 my-4">
                        Privacy Policy
                    </p>
                </div>
            </div>
        </>
    )

}