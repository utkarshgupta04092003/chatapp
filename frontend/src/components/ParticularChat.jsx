import React, { useEffect, useState } from 'react'
import MsgInput from './MsgInput'
import ChatHeader from './ChatHeader'
import { getAllMessageRoute, sendMessageRoute } from '../utils/APIRoutes';
import axios from 'axios';
import CurrentUserMessage from './CurrentUserMessage';
import CurrentChatMessage from './CurrentChatMessage';

export default function ParticularChat({ currChat, currUser, setCurrChat }) {


    const [messages, setMessages] = useState([]);
    
    useEffect(()=>{

        const fetchAllMessages = async () =>{
            const {data} = await axios.post(getAllMessageRoute, {
                from: currUser._id,
                to: currChat._id
            })
            console.log('fetched all data',data);
            setMessages(data.msg);
        }
        fetchAllMessages();
    }, [currChat]);


    const handleSendMessage = async (msg) => {
        // call the api to add msg in db
        const {data} = await axios.post(sendMessageRoute, { 
            from: currUser._id,
            to: currChat._id,
            message: msg
        })

        console.log('send response:', data);

    }
    return (
        <div className='border  border-gray-400 w-3/4'>
            <div className="flex-1 bg-white p-4">

                <div className="">
                    {/* current chat profile */}
                    <ChatHeader currChat={currChat} setCurrChat={setCurrChat} />

                    {/* chat history */}
                    <div className="flex-1 space-y-6 overflow-y-auto rounded-xl bg-purple-50 p-4 text-sm leading-6  shadow-sm text-gray-600  sm:text-base sm:leading-7 h-[75vh] my-5">
                        {
                            messages.length == 0 && <h1 className='font-bold text-2xl flex justify-center items-center h-full text-purple-500'>Let's start the conversations</h1>
                        }
                        {messages.length !== 0 && messages?.map((message, index)=>{
                          
                            return message?.fromSelf ? <CurrentUserMessage currUser={currUser} message={message.message} /> : <CurrentChatMessage currChat={currChat} message={message.message}/>

                        })}
                    </div>

               </div>
                {/* Message Input */}
                <MsgInput handleSendMessage={handleSendMessage} />
            </div>

        </div>
    )
}
