import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import robot from '../assets/robot.gif';
import axios from 'axios';
import ChatroomHeader from './ChatroomHeader';
import { addChatroomMessageRoute, getChatroomMessageRoute } from '../utils/APIRoutes';

import CurrentChatMessage from './CurrentChatMessage';
import CurrentUserMessage from './CurrentUserMessage';
import MsgInput from './MsgInput';


export default function ChatroomChats({ selectedGroup, setSelectedGroup }) {


    const [currUser, setCurrUser] = useState();
    const [groupDetails, setGroupDetails] = useState();
    const [inputMsg, setInputMsg] = useState('');
    const [allMessages, setAllMessages] = useState([]);

    const navigate = useNavigate();
    const scrollRef = useRef();

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
        const fetchAllGroupMessages = async () => {
            const { data } = await axios.post(getChatroomMessageRoute, {
                groupId: groupDetails?._id
            })
            console.log('group msg', data);

            setAllMessages(data?.messages);
            setInputMsg('');
        }
        fetchAllGroupMessages();

    }, [groupDetails]);

    useEffect(() => {
        const fetchGroupData = async () => {
            setGroupDetails(selectedGroup);
        }
        fetchGroupData();
        setTimeout(() => {

            scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 500);

    }, [selectedGroup]);

    const handleAddMessages = async (msg) => {
        // e.preventDefault();
        console.log('called hadnel add message');

        const { data } = await axios.post(addChatroomMessageRoute, {
            userId: currUser._id,
            groupId: groupDetails._id,
            content: msg,
        })
        setAllMessages(data?.messages);
        console.log('data', data);

    }


    return (!selectedGroup) ?
        (<div className='w-2/3 border border-gray-300 flex flex-col justify-center items-center'>
            <img src={robot} className='w-1/2' alt="welcome gif" />
            <h1 className='text-purple-500 text-center font-bold text-xl'>Welcome back, {currUser?.username}! <br />
                Click any chatroom to start conversation</h1>
        </div>) :

        (<>
            <div className="flex flex-col w-2/3 bg-white border-r border-purple-50">

                <ChatroomHeader setSelectedGroup={setSelectedGroup} groupDetails={groupDetails} />


                {/* chat history */}
                <div className="flex-1 space-y-6 overflow-y-auto rounded-xl bg-purple-50 p-4 text-sm leading-6  shadow-sm text-gray-600  sm:text-base sm:leading-7 h-[100vh">
                    {
                        allMessages?.length == 0 && <h1 className='font-bold text-2xl flex justify-center items-center h-full text-purple-500'>Let's start the conversations</h1>
                    }
                    {allMessages?.length !== 0 && allMessages?.map((message, index) => (
                        <div ref={scrollRef} >
                            {
                                message?.senderId?._id == currUser._id ?

                                    <CurrentUserMessage
                                        currUser={{ avatarImage: message?.senderId?.avatarImage, username: message?.senderId?.username, }}
                                        message={message.content} /> :

                                    <CurrentChatMessage
                                        currChat={{ avatarImage: message?.senderId?.avatarImage, username: message?.senderId?.username, }}
                                        message={message.content} />
                            }
                        </div>

                    ))}
                </div>
                <div className="flex w-full p-4 bg-white">
                    <MsgInput handleSendMessage={handleAddMessages} />
                </div>

            </div>

        </>)
}
