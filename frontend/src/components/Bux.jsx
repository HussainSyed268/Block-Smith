import React from 'react';
import CoinContainer from './CoinContainer';

export default function Bux() {
    return(
        <>
            <div className="flex flex-row mt-40 mx-32 justify-around mb-48">
            <div className="w-2/5 relative left-10 top-10" >
            <h1 className=" text-6xl text-white font-semibold text-left ">
            What is Bux?
            </h1>
            <p className="text-gray-300 font-roboto py-8 text-left w-4/5 text-xl font-medium">
            Unlock the potential of digital currency with Bux – where innovation meets opportunity. Experience seamless transactions and unparalleled security. Invest in the currency of tomorrow and elevate your financial journey with Bux. Join us in shaping the future of money – make every transaction count with Bux, your ticket to a border-less economy.
            </p>
        </div>
        <div>
            <CoinContainer/>
            </div>
        </div>
        </>
    )
}