import React, { useState } from 'react';

export default function DashBoardCard(props) {
    var [backgroundColor, setBackgroundColor] = useState(props.bg ? props.bg : 'bg-red-600');
    var [width, setWidth] = useState(props.width ? props.width : 'w-[33%]');

    return (
        <div className={`${width} ${backgroundColor} h-48 rounded-2xl `}>
            <div className='ml-8 mt-10'>
                <h1 className='text-gray-300 text-sm mt-6 mb-2 font-semibold'>
                    {props.title}
                </h1>
                <h1 className='text-white text-2xl mb-2 font-semibold'>
                    {props.value}
                </h1>
                <h1 className='text-gray-300 text-sm mb-2 font-semibold'>
                    {props.sideline}
                </h1>
            </div>
        </div>
    );
}
