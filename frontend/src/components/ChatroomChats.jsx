import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import robot from '../assets/robot.gif';
import axios from 'axios';
import ChatroomHeader from './ChatroomHeader';
import { addChatroomMessageRoute, getChatroomMessageRoute } from '../utils/APIRoutes';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurrentChatMessage from './CurrentChatMessage';
import CurrentUserMessage from './CurrentUserMessage';


export default function ChatroomChats({ selectedGroup, setSelectedGroup }) {


    const [currUser, setCurrUser] = useState();
    const [groupDetails, setGroupDetails] = useState();
    const [inputMsg, setInputMsg] = useState('');
    const [allMessages, setAllMessages] = useState([]);

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
            // const { data } = await axios.post('adsf', { groupId: selectedGroup._id});
            setGroupDetails(selectedGroup);

        }
        fetchGroupData();

    }, [selectedGroup]);

    const handleAddMessages = async (e) => {
        e.preventDefault();
        console.log('called hadnel add message');
        if (!inputMsg) {
            toast.error("Type something to send", { autoclose: 2000 });
            return;
        }
        const { data } = await axios.post(addChatroomMessageRoute, {
            userId: currUser._id,
            groupId: groupDetails._id,
            content: inputMsg,
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
                        <div >
                            {
                            message?.senderId?._id == currUser._id ? 
                            
                            <CurrentUserMessage 
                            currUser={{avatarImage: message?.senderId?.avatarImage, username: message?.senderId?.username, }}
                            message={message.content}/> :

                            <CurrentChatMessage 
                            currChat={{avatarImage: message?.senderId?.avatarImage, username: message?.senderId?.username, }}
                            message={message.content}/>
                            }
                        </div>

                    ))}
                </div>
                <div className="flex w-full p-4 bg-white">


                    {/* Chat section */}
                    <form className="flex items-center justify-between w-full" onSubmit={handleAddMessages}>
                        <input type="text"
                            placeholder="Type your message"
                            value={inputMsg}
                            onChange={(e) => setInputMsg(e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-purple-400 focus:border-purple-400" />
                        <button className="text-sm text-white bg-purple-600 px-4 py-2 rounded-md ml-3" onClick={handleAddMessages}>Send</button>
                    </form>

                </div>
            </div>
            <ToastContainer />

        </>)
}
