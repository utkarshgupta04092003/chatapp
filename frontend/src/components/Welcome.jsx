import React from 'react';
import robot from '../assets/robot.gif';

function Welcome({ currentUser }) {
    return (

        <div className="flex flex-col items-center justify-center w-3/4 border  border-gray-400 rounded-tr-xl rounded-br-xl">
            <img src={robot} alt="User" className="w-48 h-48 rounded-full mr-2" />
            <div className='text-center'>
                <p className="text-2xl font-bold text-purple-500">Welcome back,{currentUser?.username}!</p>
                <p className="text-xl text-purple-500">Click any chat to start conversation</p>
            </div>
        </div>

       
    );
}

export default Welcome;
