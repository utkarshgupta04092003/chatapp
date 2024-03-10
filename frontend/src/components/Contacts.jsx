import React, { useEffect, useState } from 'react'
import { APP_NAME } from '../utils/constant';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

export default function Contacts({ contacts, currUser, changeChat }) {

    const [currUserName, setCurrUserName] = useState();
    const [currUserImage, setCurrUserImage] = useState();
    const [currentSelected, setCurrentSelected] = useState();

    useEffect(() => {

        if (currUser) {
            setCurrUserName(currUser.username);
            setCurrUserImage(currUser.avatarImage);
        }

    }, [currUser]);


    const handleClickChat = (id, contact) => {
        setCurrentSelected(id);
        changeChat(contact);
    }

    return (

        <div className="w-1/4 bg-white border border-gray-400 rounded-tl-md rounded-bl-md p-4">
            {/* App Name */}
            <div className='flex justify-center items-center mb-2'>
                {/* Insert logo image here */}
                <img src={logo} alt="" className='w-12 h-12 mr-2 rounded-full' />
                <h1 className="text-2xl font-bold">{APP_NAME}</h1>
            </div>

            {/* Current Logged-in User */}
            <Link to={`/profile`}>
                <div className="flex items-center mb-4  p-2 bg-purple-50 rounded-md border border-purple-500 cursor-pointer">
                    <img src={currUserImage} alt="User" className="w-10 h-10 rounded-full mr-2" />
                    <div className='flex flex-col'>

                        <span className="text-sm">{currUserName} (you)</span>
                        <span className="text-sm text-green-500">online</span>
                    </div>
                </div>
            </Link>

            {/* Search Bar */}
            <div className="mb-4">
                <input type="text" placeholder="Search..." className="w-full border border-gray-200 p-2 rounded-md" />
            </div>

            {/* Contact List */}
            <div className='overflow-y-auto h-[70vh] pr-2'>
                {contacts?.map((contact, index) => (

                    <div className={`flex items-center mb-2  p-2 rounded-md border border-purple-500 cursor-pointer transition ease-in-out delay-75 ${currentSelected == contact._id ? "bg-purple-500" : "bg-purple-50"}`} id={contact._id} key={contact._id} onClick={() => handleClickChat(contact._id, contact)}>
                        <img src={contact.avatarImage} alt="Contact" className="w-8 h-8 rounded-full mr-2" />
                        <span className="text-sm">{contact.username}</span>
                    </div>
                ))}


            </div>
        </div>


    );
}
