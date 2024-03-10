import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function ChatHeader({ currChat, setCurrChat }) {


    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Handle option click here
    const handleOptionClick = (option) => {
        console.log(option);
        if(option === "closeChat"){
            setCurrChat('');
        }
       
        setIsOpen(false); 
    };

    return (
        <div className="flex items-center justify-between mb-4 border border-purple-500 rounded-lg p-3 pr-8">
            <div className='flex items-center'>

                <img src={currChat.avatarImage} alt="User" className="w-8 h-8 rounded-full mr-2" />
                <div>
                    <p className="font-semibold">{currChat.username}</p>
                    {/* <p className="text-sm text-gray-500">Last message...</p> */}
                </div>
            </div>
            <div className='flex items-center font-semibold'>
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800" >...</button>
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg">
                            <ul>
                                <li onClick={() => handleOptionClick('closeChat')}
                                    className="py-2 px-4 cursor-pointer hover:bg-gray-100">
                                    Close Chat
                                </li>
                                
                            </ul>
                        </div>
                    )}
                </div>
            </div>

        </div>

    )
}
