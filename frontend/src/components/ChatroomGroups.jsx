import React from 'react'

export default function ChatroomGroups({ allChatrooms, chagneGroup, selectedGroup }) {

    const handleChangeGroup = (group) => {
        chagneGroup(group);
    }
    return (!allChatrooms) ? (<h2 className='text-center text-xl font-semibold mt-5'>Loading Chatrooms</h2>) : (
        <div className="flex-1 overflow-y-auto mt-5">
            {allChatrooms.length == 0 && <h2 className='text-center text-xl font-semibold mt-5'>No Chatroom found, <br /> create one</h2>}
            <ul className="px-4">
                {
                    allChatrooms?.map((chatroom) => (
                        <li className={`flex items-center justify-between p-2 px-3 rounded-lg cursor-pointer border border-white my-3 ${chatroom?._id === selectedGroup?._id ? "bg-white text-gray-600" : ""}`} key={chatroom._id} onClick={() => handleChangeGroup(chatroom)}>
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
