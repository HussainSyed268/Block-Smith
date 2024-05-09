import React from "react";
import DashBoardCard from "./DashBoardCard";
export default function Wallet() {
    return (
        <div className="w-full mx-16">
        <div className='text-white text-2xl text-center font-semibold '>
                My Wallet
        </div>
        <div className='flex justify-center mt-4'>
        <DashBoardCard 
            title='Your Account Balance'
            value='3.41320000 BTC'
            sideline='$272413 USD'
            bg='bg-[#9061F9]'
            width = 'w-[25%]'
        />
        </div>  
        <div className='text-white text-2xl mt-8 font-semibold '>
                Manage Your Wallet
        </div>
        
    </div>
    );
    }