import React from "react";
import WalletIllusttration from "../assests/home/wallet.png";
import SheildIllusttration from "../assests/home/sheild.png";
import GraphIllusttration from "../assests/home/graph.png";

export default function Advantages() {
    return(
        <>
        <div className="mt-28">
        <div className="mx-36 break-after-page">
            <p className="text-white bg-zinc-800 py-3 font-semibold w-48 rounded-t-lg">
                Our Advantage
            </p>
            </div>
            <div className="flex flex-direction bg-zinc-800 mx-36 mb-6 pb-8 rounded-b-xl rounded-tr-xl">
                <div className="w-1/3 flex flex-col justify-center relative top-3   hover:bg-zinc-700 my-4 mb-4 pb-4 rounded-lg mx-8 transition-all ">
                    <img className="w-64 relative left-28 " src={WalletIllusttration} alt="Wallet" />
                    <h1 className="text-white text-lg font-semibold">Value Performane</h1>
                    <p className="text-gray-300 w-48 m-auto mt-3">Lower mining price and wallet security</p>
                </div>
                <div className="w-1/3 flex flex-col justify-center mb-4 relative top-3 hover:bg-zinc-700 my-4 rounded-lg mx-8 transition-all ">
                    <img className="w-44 relative left-40 bottom-3" src={SheildIllusttration} alt="Wallet" />
                    <h1 className="text-white text-lg font-semibold">High Security</h1>
                    <p className="text-gray-300 w-52 m-auto mt-3">Professional management team and high standard farm</p>
                </div>
                <div className="w-1/3 flex flex-col justify-center relative top-3 left-3 hover:bg-zinc-700 my-4 pb-4 rounded-lg mx-8 transition-all ">
                    <img className="w-48 relative left-28 top-4" src={GraphIllusttration} alt="Wallet" />
                    <h1 className="text-white text-lg font-semibold mt-10 relative right-6">Property Model</h1>
                    <p className="text-gray-300 w-48 m-auto mt-3 relative right-6 ">One second mining two years experience</p>
                </div>
            </div>
            </div>
        </>
    )


}