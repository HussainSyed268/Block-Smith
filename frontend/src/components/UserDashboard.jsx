import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Transactions from './Transactions';
import DashBoardCard from './DashBoardCard';
import Wallet from './Wallet';

export default function UserDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');

    const renderComponent = () => {
        if (activeTab === 'dashboard') {
            return (
                <>
                    <Dashboard />
                    <div className='flex mt-8 w-1/2'>
                        <Transactions />
                        <div>
                            
                        </div>
                    </div>

                </>
            );
        } else if (activeTab === 'transactions') {
            return (
                <div className='flex mt-8 w-full'>
                    <Transactions />
                </div>
            );
        } else if (activeTab === 'wallet') {
            return (
                <div className='flex mt-8 w-full'>
                    <Wallet />
                </div>
            );
        }

    };

    return (
        <>
            <div className="bg-[#222222] w-[100vw] h-[100vh]  rounded-3xl font-roboto">   
                <div className="relative flex justify-center my-4">
                    <div
                        className={`text-gray-300 font-semibold text-sm py-4 px-8 transition-all cursor-pointer border-b-2 ${
                            activeTab === 'dashboard' ? 'border-[#5cb9c8]' : 'border-transparent'
                        } hover:text-[#5cb9c8] hover:border-[#5cb9c8]`}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        Dashboard
                    </div>
                   
                    <div
                        className={`text-gray-300 font-semibold text-sm py-4 px-8 transition-all cursor-pointer border-b-2 ${
                            activeTab === 'transactions' ? 'border-[#5cb9c8]' : 'border-transparent'
                        } hover:text-[#5cb9c8] hover:border-[#5cb9c8]`}
                        onClick={() => setActiveTab('transactions')}
                    >
                        Transaction History
                    </div>
                    <div className="text-gray-300 font-semibold text-sm py-4 px-8 transition-all cursor-pointer border-b-2 hover:text-[#5cb9c8] border-transparent hover:border-[#5cb9c8]" onClick={() => setActiveTab('wallet')}>
                        Wallet
                    </div>
                </div>
                   
                {renderComponent()}
            </div>
        </>
    );
}
