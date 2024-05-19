import React from 'react'
import SendLogo from '../assests/dashboard/send.png' 
import RecieveLogo from '../assests/dashboard/recieve.png' 
import RewardLogo from '../assests/dashboard/reward.png' 

export default function TransactionCard(props) {
    let logoSrc;
    switch (props.type) {
        case 'send':
            logoSrc = SendLogo;
            break;
        case 'recieve':
            logoSrc = RecieveLogo;
            break;
        case 'reward':
            logoSrc = RewardLogo;
            break;
        default:
            logoSrc = null; // You can set a default logo or handle invalid types
    }

    return (
        <>
            <div className='flex w-full py-3'>
                <div>
                    <img className='w-12' src={logoSrc} alt={props.type} />
                </div>
                
                <div className='flex flex-col ml-8'>
                    <h1 className='text-white text-xl font-medium'>
                        {props.title} 
                    </h1> 
                    <p className='text-gray-300 text-sm '>
                        {props.date}    
                    </p>   
                </div>
                <div className='flex flex-col items-end ml-12'>
                    <h1 className='text-white text-xl font-medium'>
                        {props.amount} 
                    </h1>
                    <p className='text-gray-300 text-sm'>
                        {props.type}    
                    </p>
                </div>  
                          
            </div>
        </>
    )
}
