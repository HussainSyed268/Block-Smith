import TransactionCard from "./TransactionCard"

export default function Transactions() {
    return (
        <div className="w-full mx-12">
                <div className='text-white text-2xl font-semibold '>
                        My Transactions
                </div>
                <div className='flex flex-col mt-7 w-full' >
                    <div className='bg-[#313131] flex w-full '>
                        <h1 className='text-white text-sm px-6 py-4 w-1/3'>
                            Date
                        </h1>
                        <h1 className='text-white text-sm px-6 py-4 w-1/5'>
                            Type
                        </h1>
                        <h1 className='text-white text-sm px-6 py-4 w-3/5'>
                            Details
                        </h1>
                    </div>
                    <TransactionCard 
                    date='02-03-2024'
                    type='Payout'
                    details='Payout in My Wallet at 12:00 PM'
                    />
                    <TransactionCard 
                    date='17-02-2024'
                    type='Reward'
                    details='Reward for block #153467'
                    />
                    <TransactionCard 
                    date='13-03-2024'
                    type='Reward'
                    details='Reward for block #1/3153467'
                    />
                    <TransactionCard 
                    date='13-03-2024'
                    type='Reward'
                    details='Reward for block #1/3153467'
                    />
                    <TransactionCard 
                    date='13-03-2024'
                    type='Reward'
                    details='Reward for block #1/3153467'
                    />
                </div>
            </div>
    )}