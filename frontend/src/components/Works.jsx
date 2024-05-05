import React from 'react'
import Lock from '../assests/home/lock.png';
import Locker from '../assests/home/locker.png';
import Piggy from '../assests/home/piggy.png';
import Bag from '../assests/home/bag.png';
import Arrow from '../assests/home/arrow.png'


export default function Works() {
    return(
        <>
        <div className='mb-32'>
            <div className="font-roboto">
                <h1 className="text-white text-4xl text center font-semibold mb-6">
                    How it works?    
                </h1>    
                <p className="text-gray-300 text-base text-center w-96 m-auto">
                    BlockSmith is production-ready library of stackable content blocks built in React Native. 
                </p>
            </div> 
            <div>
                <div className=' relative'>
                    <img className=' absolute top-16 left-80 ml-3 -rotate-12 w-64' src={Arrow} alt="" />
                    <img className='absolute top-20 left-[80rem]  ml-3  w-64' style={{ transform: 'rotate(-15deg)'}} src={Arrow} alt="" />
                    <img className='absolute top-10 left-[52rem] w-64' style={{ transform: 'rotate(25deg) scaleY(-1)'}} src={Arrow} alt=""/>
                </div>

            <div className="flex flex-row mt-16 items-center relative ">
                    <div className="w-1/4 flex flex-col justify-center  items-center">
                        <img className="h-52" src={Lock} alt = "lock" /> 
                        <div>
                            <p className='text-gray-300 text-sm m-auto font-medium w-16'>Step 1</p>
                            <h1 className='text-white text-2xl font-semibold my-6'>Sign Up</h1>
                            <p className='text-gray-300 text-sm m-auto font-medium w-full px-16'>
                                Create an account to start investing in digital currency today and secure your future.
                            </p>
                        </div>    
                    </div>      
                    <div className="w-1/4 flex flex-col justify-center items-center">
                        <img className="h-44" src={Locker} alt = "locker" /> 
                        <div className='relative top-2'>
                            <p className='text-gray-300 text-sm m-auto font-medium w-16'>Step 2</p>
                            <h1 className='text-white text-2xl font-semibold my-6'>Connect Wallet</h1>
                            <p className='text-gray-300 text-sm m-auto font-medium w-full px-16'>
                                Connect your wallet to your account and start investing in digital currency today.
                            </p>
                        </div>    
                    </div>      
                    <div className="w-1/4 flex flex-col justify-center items-center">
                        <img className="h-52 relative bottom-4" src={Piggy} alt = "lock" /> 
                        <div>
                            <p className='text-gray-300 text-sm m-auto font-medium w-16 '>Step 3</p>
                            <h1 className='text-white text-2xl font-semibold my-6'>Start Mining</h1>
                            <p className='text-gray-300 text-sm m-auto font-medium w-full px-16'>
                                Start mining digital currency today and secure your future with BlockSmith.
                            </p>
                        </div>    
                    </div>      
                    <div className="w-1/4 flex flex-col justify-center items-center">
                        <img className="h-44" src={Bag} alt = "lock" /> 
                        <div>
                            <p className='text-gray-300 text-sm m-auto font-medium w-16'>Step 4</p>
                            <h1 className='text-white text-2xl font-semibold my-6'>Earn Money</h1>
                            <p className='text-gray-300 text-sm m-auto font-medium w-full px-16'>
                                Earn money by investing in digital currency and secure your future with BlockSmith.
                            </p>
                        </div>    
                    </div>      
                 </div>
            </div>
        </div>
        </>
    )
}