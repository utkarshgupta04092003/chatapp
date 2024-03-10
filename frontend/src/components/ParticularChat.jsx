import React, { useEffect, useRef, useState } from 'react'
import MsgInput from './MsgInput'
import ChatHeader from './ChatHeader'
import { getAllMessageRoute, sendMessageRoute } from '../utils/APIRoutes';
import axios from 'axios';
import CurrentUserMessage from './CurrentUserMessage';
import CurrentChatMessage from './CurrentChatMessage';

export default function ParticularChat({ currChat, currUser, setCurrChat, socket }) {


    const [messages, setMessages] = useState([]);
    const [arrivalMsg, setArrivalMsg] = useState(null);
    const scrollRef = useRef();
    useEffect(()=>{

        const fetchAllMessages = async () =>{
            const {data} = await axios.post(getAllMessageRoute, {
                from: currUser._id,
                to: currChat._id
            })
            console.log('fetched all data',data);
            setMessages(data.msg);
        }
        if(currChat)
            fetchAllMessages();
    }, [currChat]);


    useEffect(()=>{
        if(socket.current){
            socket.current.on('msg-recieve', (msg)=>{
                console.log('recieve msg: ', msg);
                setArrivalMsg({fromSelf: false, message: msg});
            })
        }
    }, []);

    useEffect(()=>{
        console.log('arrivalMsg', arrivalMsg);
        arrivalMsg && setMessages(prev => [...prev, arrivalMsg]);
    }, [arrivalMsg]);

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);


    console.log(messages);

    const handleSendMessage = async (msg) => {
        // call the api to add msg in db
        const {data} = await axios.post(sendMessageRoute, { 
            from: currUser._id,
            to: currChat._id,
            message: msg
        })
        socket.current.emit('send-msg', {
            to: currChat._id,
            from: currUser._id,
            message: msg
        })

        const msgs = [...messages];
        msgs.push({fromSelf: true, message: msg});
        setMessages(msgs);

        console.log('send response:', msg);

    }
    return (
        <div className='border  border-gray-400 rounded-tr-xl rounded-br-xl w-3/4'>
            <div className="flex-1 bg-white p-4">

                <div className="">
                    {/* current chat profile */}
                    <ChatHeader currChat={currChat} setCurrChat={setCurrChat} />

                    {/* chat history */}
                    <div className="flex-1 space-y-6 overflow-y-auto rounded-xl bg-purple-50 p-4 text-sm leading-6  shadow-sm text-gray-600  sm:text-base sm:leading-7 h-[75vh] my-5">
                        {
                            messages.length == 0 && <h1 className='font-bold text-2xl flex justify-center items-center h-full text-purple-500'>Let's start the conversations</h1>
                        }
                        {messages.length !== 0 && messages?.map((message, index)=>(
                          <div ref={scrollRef}>
                            {message?.fromSelf ? <CurrentUserMessage currUser={currUser} message={message.message} /> :
                            <CurrentChatMessage currChat={currChat} message={message.message}/>}
                          </div>

                        ))}
                    </div>

               </div>
                {/* Message Input */}
                <MsgInput handleSendMessage={handleSendMessage} />
            </div>

        </div>
    )
}
