import React from 'react'
import pfp from '../assests/no-profile-picture.png'
import DashBoardCard from './DashBoardCard'
import Transactions from './DashboardTransactions'

export default function Dashboard() {
    return (
    <div className="font-roboto w-full relative">
        <div className='mx-12 mt-4'>
            <div className='text-white text-2xl font-semibold'>
                My Wallet
            </div>
            <div className='flex justify-between mt-4'>
            <DashBoardCard 
                title='Your Account Balance'
                value='3.41320000 BTC'
                sideline='$272413 USD'
            />
            <DashBoardCard 
                title='Current Exchange Rate'
                value='$63696.22 USD'
                sideline='+0.69%'
            />
            <DashBoardCard 
                title='Last Transaction'
                value='2 Days Ago'
                sideline=' '
            />
        </div>
        
    </div>
    </div>
    
    )}