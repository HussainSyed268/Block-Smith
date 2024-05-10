import TransactionCard from "./TransactionCard"

export default function DashboardTransactions() {
    return (
        <div className="w-full mx-12">
                <div className='text-white text-2xl font-semibold '>
                        My Transactions
                </div>
                <div className='flex flex-col mt-7 w-full' >
                    <TransactionCard 
                        title='Sent Coins'
                        date='Jan 23, 2024 12:00 PM'
                        amount='0.0000313 BTC'
                        type='send'
                    />
                    <TransactionCard 
                        title='Reward Coins'
                        date='Mar 24, 2024  11:00 AM'
                        amount='0.0000073 BTC'
                        type='reward'
                    />
                    <TransactionCard 
                        title='Recieve Coins'
                        date='May 4, 2024  10:00 PM'
                        amount='0.0000003 BTC'
                        type='recieve'
                    />
                    
                </div>
            </div>
    )}