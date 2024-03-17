import React from 'react'

export default function ChatroomGroups({ allChatrooms, chagneGroup, selectedGroup }) {

    const handleChangeGroup = (group) => {
        chagneGroup(group);
    }
    return (!allChatrooms) ? (<h2 className='text-center text-xl font-semibold mt-5 border border-gray-500'>Loading Chatrooms</h2>) : (
        <div className="flex-1 overflow-y-auto mt-5">
            <h1 className="text-2xl font-semibold mx-4"> All Chatrooms</h1>
            {allChatrooms.length == 0 && <h2 className='text-center text-lg py-2 font-semibold text-black mt-5 border border-gray-500 rounded-lg mx-4'>No Chatrooms found</h2>}
            <ul className="px-4">
                {
                    allChatrooms?.map((chatroom) => (
                        <li className={`flex items-center justify-between p-2 px-3 rounded-lg cursor-pointer bg-purple-50  border border-purple-500  my-3 ${chatroom?._id === selectedGroup?._id ? "bg-purple-500 text-white " : ""}`} key={chatroom._id} onClick={() => handleChangeGroup(chatroom)}>
                            <div className="flex items-center space-x-2">
                                <img src={chatroom?.chatroomImage} alt="User profile" className="w-8 h-8 rounded-full" />
                                <span className="font-semibold capitalize">{chatroom.groupName}</span>
                            </div>
                        </li>

                    ))
                }
            </ul>
        </div>
    )
}
