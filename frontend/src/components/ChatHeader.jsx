import React from 'react'

export default function ChatHeader({ currChat }) {
    return (
        <div className="flex items-center justify-between mb-4 border border-purple-500 rounded-lg p-3 pr-8">
            <div className='flex items-center'>

                <img src={currChat.avatarImage} alt="User" className="w-8 h-8 rounded-full mr-2" />
                <div>
                    <p className="font-semibold">{currChat.username}</p>
                    {/* <p className="text-sm text-gray-500">Last message...</p> */}
                </div>
            </div>
            <div className='flex items-center font-bold'>
                
            </div>
        </div>
    )
}
