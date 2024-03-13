import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import robot from '../assets/robot.gif';
import axios from 'axios';
import ChatroomHeader from './ChatroomHeader';

export default function ChatroomChats({ selectedGroup, setSelectedGroup }) {


    const [currUser, setCurrUser] = useState();
    const [groupDetails, setGroupDetails] = useState();

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


    useEffect(() => {
        const fetchGroupData = async () => {
            // const { data } = await axios.post('adsf', { groupId: selectedGroup._id});
            setGroupDetails(selectedGroup);

        }
        fetchGroupData();

    }, [selectedGroup]);



    return (!selectedGroup) ?
        (<div className='w-2/3 border border-gray-300 flex flex-col justify-center items-center'>
            <img src={robot} className='w-1/2' alt="welcome gif" />
            <h1 className='text-purple-500 text-center font-bold text-xl'>Welcome back, {currUser?.username}! <br />
                Click any chatroom to start conversation</h1>
        </div>) :

        (
            <div className="flex flex-col w-2/3 bg-gray-100">
                
                <ChatroomHeader setSelectedGroup={setSelectedGroup} groupDetails={groupDetails}/>
                <div className="flex-1 p-4">
                    {/* Chat section */}
                    <div className="flex items-center justify-between mb-4">
                        <input type="text" placeholder="Type your message" className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-purple-400 focus:border-purple-400" />
                        <button className="text-sm text-white bg-purple-600 px-4 py-2 rounded-md">Send</button>
                    </div>
                    <div className="flex flex-col space-y-4">
                        {/* Chat messages */}
                        {/* Replace with actual chat messages */}
                        <div className="flex items-center">
                            <img src="/user-profile.jpg" alt="User profile" className="w-8 h-8 rounded-full" />
                            <div className="bg-purple-600 text-white px-4 py-2 rounded-md">
                                <p>Chat message</p>
                            </div>
                        </div>
                        {/* Repeat for each chat message */}
                    </div>
                </div>
            </div>
        )
}
