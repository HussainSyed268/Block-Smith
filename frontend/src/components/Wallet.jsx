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
        <div className="flex mt-4 justify-between">
        <DashBoardCard
            title=' '
            value='Deposit BTC'
            sideline='Deposit USD '
            bg='bg-[#5cb9c8]'
            width = 'w-[24%]'
        />
        <DashBoardCard
            title=' '
            value='Withdraw BTC'
            sideline=' Withdraw USD to your wallet or bank account'
            bg='bg-[#f9a826]'
            width = 'w-[24%]'
        />
        <DashBoardCard
            title=' '
            value='Transfer BTC'
            sideline='Transfer USD'
            bg='bg-[#f96161]'
            width = 'w-[24%]'
        />
        <DashBoardCard
        title = '     '
        value = 'Link Account'
        sideline = 'Link Account'
        bg = 'bg-[#7ABA78]'
        width = 'w-[24%]'
        />
        </div>
    </div>
    );
    }