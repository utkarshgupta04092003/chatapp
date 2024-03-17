import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom'

export default function ChatroomHeader({ setSelectedGroup, groupDetails }) {

    const [isOpen, setIsOpen] = useState(false);
    const [currUser, setCurrUser] = useState();
    const navigate = useNavigate();
    useEffect(() => {

        const setUser = async () => {
            // if user is not authenticated redirect to home page.
            if (!localStorage.getItem('chatapp-user')) {
                navigate('/');
            }
            // store logged in user in currUser
            else {
                const user = await JSON.parse(localStorage.getItem('chatapp-user'));
                console.log('loggedin user', user);
                setCurrUser(user);
            }
        }

        setUser();
    }, [])

    // handle toggle drop down
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    // Handle option click here
    const handleOptionClick = (option) => {
        console.log(option);
        if (option === "closeChat") {
            setSelectedGroup('');
        }

        setIsOpen(false);
    };


    return (
        <div className="p-4 py-2 bg-white border-purple-600 text-black">
            {/* Group details */}
            <div className="flex items-center justify-between space-x-4">
                <div className='flex items-center space-x-4'>

                    <img src={groupDetails?.chatroomImage} alt="Group image" className="w-12 h-12 rounded-full" />
                    <div>
                        <h2 className="text-xl font-semibold   capitalize">{groupDetails?.groupName} {currUser?._id == groupDetails?.creatorId ? "(Admin)" : ""}</h2>
                        <p className="capitalize">{groupDetails?.groupDescription}</p>
                    </div>
                </div>
                {/* <div className='font-bold flex justify-center items-center text-2xl select-none'>...</div> */}
                <div className='flex items-center font-semibold'>
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="font-bold flex justify-center items-center text-2xl select-none" >...</button>
                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg">
                                <ul>
                                    <li onClick={() => handleOptionClick('closeChat')}
                                        className="py-2 px-4 cursor-pointer  text-gray-600">
                                        Close Chat
                                    </li>
                                    <hr />
                                    <li onClick={() => navigate(`/chatrooms/${groupDetails?.groupName}`)}
                                        className="py-2 px-4 cursor-pointer  text-gray-600">
                                        Group Details
                                    </li>

                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
