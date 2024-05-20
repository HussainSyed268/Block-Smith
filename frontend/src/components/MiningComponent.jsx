import React, { useState, useContext } from 'react';
import { WavyBackground } from "./ui/wavy-background.tsx";
import Navbar from "./Navbar.jsx";
import BlockchainComponent from './BlockChain';
import { AuthContext } from '../auth/AuthProvider';
import { ClipLoader } from 'react-spinners'; // Import the spinner component

export default function MiningComponent() {
    const { isMining, setIsMining } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleMining = () => {
        setLoading(true);
        setTimeout(() => {
            setIsMining(true);
            setLoading(false);
        }, 5000);
    };

    return (
        <>
            <WavyBackground />
            <div className="flex justify-center items-center mt-[8rem] z-20 ">
                {loading ? (
                    <div className="flex flex-col items-center mt-[4rem]">
                        <ClipLoader color={"#c20c0c"} loading={loading} size={35} width={10}  />
                        <p className="text-white z-20 mt-4 ">Joining the mining network</p>
                    </div>
                ) : (
                    isMining ? (
                        <BlockchainComponent />
                    ) : (
                        <div className="w-2/6 text-center z-20">
                            <h1 className="text-white text-6xl font-roboto font-semibold z-20">
                                <span className="text-red-600">Bux</span> Mining pool and Hashrate Management Platform
                            </h1>
                            <div>
                                <p className="text-gray-300 font-roboto pt-8 text-center">
                                    Headframe offers FPPS mining with low mining fees, stability, free daily payouts and unique features for data centers and hashrate managers.
                                </p>
                                <div>
                                    <button
                                        className="px-4 h-10 bg-red-600 rounded-xl text-white mt-8 font-semibold"
                                        onClick={handleMining}
                                    >
                                        Start Mining
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </>
    );
}
