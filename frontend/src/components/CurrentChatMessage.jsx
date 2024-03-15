import React from 'react'

export default function CurrentChatMessage({ currChat, message }) {
    return (
        <div className="flex items-start">
            <img
                className="mr-2 h-8 w-8 rounded-full"
                src={currChat?.avatarImage} />
            <div className="flex flex-col rounded-b-xl rounded-tr-xl  p-4 pt-2 bg-white  sm:max-w-md md:max-w-2xl">
                <p className="text-sm text-purple-600 ">{currChat?.username}</p>
                <p>{message}</p>
            </div>
        </div>

    )
}
