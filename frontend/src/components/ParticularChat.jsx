import React from 'react'
import MsgInput from './MsgInput'
import ChatHeader from './ChatHeader'

export default function ParticularChat({ currChat, currUser, setCurrChat }) {
    const handleSendMessage = async (msg) => {
        alert(msg);
    }
    return (
        <div className='border  border-gray-400 w-3/4'>
            <div className="flex-1 bg-white p-4">

                <div className="">
                    {/* current chat profile */}
                    <ChatHeader currChat={currChat} setCurrChat={setCurrChat} />

                    {/* chat history */}
                    <div className="flex-1 space-y-6 overflow-y-auto rounded-xl bg-purple-50 p-4 text-sm leading-6  shadow-sm text-gray-600  sm:text-base sm:leading-7 h-[75vh] my-5">

                        <div className="flex items-start">
                            <img
                                className="mr-2 h-8 w-8 rounded-full"
                                src={currChat.avatarImage} />
                            <div className="flex flex-col rounded-b-xl rounded-tr-xl  p-4 pt-2 bg-white  sm:max-w-md md:max-w-2xl">
                                <p className="text-sm text-purple-600 ">{currChat.username}</p>
                                <p>Explain quantum computing in simple terms</p>
                            </div>
                        </div>

                        <div className="flex flex-row-reverse items-start">
                            <img className="ml-2 h-8 w-8 rounded-full" src={currUser.avatarImage} />

                            <div className="flex flex-col-reverse min-h-[85px] rounded-b-xl rounded-tl-xl bg-white p-4 pt-2 sm:min-h-0 sm:max-w-md md:max-w-2xl">
                                <p> Certainly! Quantum computing is a new type of computing that relies on
                                    the principles of quantum physics. Traditional computers, like the one </p>
                                <p className="text-sm text-purple-600 text-right">{currUser.username}</p>
                            </div>
                        </div>
                    </div>

               </div>
                {/* Message Input */}
                <MsgInput handleSendMessage={handleSendMessage} />
            </div>

        </div>
    )
}
