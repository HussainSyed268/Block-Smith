import React, { useState } from 'react';
import Dashboard from './Dashboard';
import DashboardTransactions from './DashboardTransactions';
import DashBoardCard from './DashBoardCard';
import Wallet from './Wallet';
import TradingViewWidget from './Chart';

export default function UserDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');

    const renderComponent = () => {
        if (activeTab === 'dashboard') {
            return (
                <>
                    <Dashboard />
                    <div className='flex mt-8 justify-between h-1/2'>
                        <div className='w-1/4'>
                            <DashboardTransactions id="transactions"/>
                        </div>
                            <div className='w-[70%] relative right-16 '>
                                <div className='mb-4 text-white text-2xl font-semibold'>
                                    Trade Chart
                                </div>
                                <TradingViewWidget/>                          
                            </div>
                    </div>
                    

                </>
            );
        } else if (activeTab === 'transactions') {
            return (
                <div className='flex mt-8 w-full'>
                    <DashboardTransactions />
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
            <div className="bg-[#222222] w-[100vw] h-[100vh] font-roboto">   
                <div className="relative flex ml-6 my-4">
                    <div
                        className={`text-gray-300 font-semibold text-sm py-4 px-8  cursor-pointer border-b-2 transition-all ${
                            activeTab === 'dashboard' ? 'border-red-600' : 'border-transparent'
                        } hover:text-red-600 hover:border-red-600`}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        Dashboard
                    </div>
                   
                    <div
                        className={`text-gray-300 font-semibold text-sm py-4 px-8 transition-all cursor-pointer border-b-2 ${
                            activeTab === 'transactions' ? 'border-red-600' : 'border-transparent'
                        } hover:text-red-600 hover:border-red-600`}
                        onClick={() => setActiveTab('transactions')}
                    >
                        Transaction History
                    </div>
                    <div className="text-gray-300 font-semibold text-sm py-4 px-8 transition-all cursor-pointer border-b-2 hover:text-red-600 border-transparent hover:border-red-600" onClick={() => setActiveTab('wallet')}>
                        Wallet
                    </div>
                </div>
                   
                {renderComponent()}
            </div>
        </>
    );
}
