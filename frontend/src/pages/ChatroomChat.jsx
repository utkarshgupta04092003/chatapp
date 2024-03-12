import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { addUserTochatroomRoute, getChatroomChatRoute } from '../utils/APIRoutes';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ChatroomChat() {

  const { groupName } = useParams();
  const [groupData, setGroupData] = useState();
  const [currUser, setCurrUser] = useState();
  const [clickAddUser, setClickAddUser] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [allUsers, setAllUsers] = useState([]);


  useEffect(() => {

    // if user is not logged in, redirect it to home page else set loggedin user data in currUser state variable
    if (!localStorage.getItem('chatapp-user')) {
      navigate('/');
    }
    else {
      setCurrUser(JSON.parse(localStorage.getItem('chatapp-user')));
    }


    // fetch the particular chatroom details
    const fetchChatroomChat = async () => {
      const { data } = await axios.post(`${getChatroomChatRoute}/${groupName}`, {});
      console.log('chartoomchart data: ', data);
      console.log('chartoomchart data: ', (data.chatroom.users));
      if (data.status)
        setGroupData(data.chatroom);
        setAllUsers(data.chatroom.users);
  
    }
    fetchChatroomChat();
  }, []);

  // handle add new user
  const handleAddUser = async () => {
    if (newUsername.trim() !== '' && newUsername.toLowerCase() != currUser.username.toLowerCase()) {
      // call the api to add user in this group
      const { data } = await axios.post(addUserTochatroomRoute, {
        chatroomId: groupData._id,
        username: newUsername,
      });
      console.log('addUserTochatroom:', data);
      if(data.status == false){
        toast.error(data.msg, { autoClose: 2000 })
      }
      setAllUsers(data.chatroom.users);
    }
    else if (newUsername.toLowerCase() === currUser.username.toLowerCase()) {
      toast.error(`${newUsername} is the admin of this group`, { autoClose: 2000 })
    }
    
  }



  return (
    <div className="bg-white p-4 rounded-md shadow-md mt-16 w-1/2 mx-auto">
      <div className="flex flex-col items-center mb-4">
        {groupData?.isChatroomImageSet && (
          <img src={groupData.chatroomImage} alt="Profile" className="w-24 h-24 rounded-full mr-4" />
        )}
        <div className='mt-5'>
          <h2 className="text-xl font-semibold capitalize text-center">{groupData?.groupName}</h2>
          <p className="text-gray-600 capitalize">{groupData?.groupDescription}</p>
        </div>
      </div>
      <div className="flex items-center text-gray-500">
        <span className="mr-2">Group Admin:</span>
        <span>{groupData?.creatorId === currUser?._id ? `${currUser?.username} (you)` : 'Other User'}</span>
      </div>
      {groupData?.creatorId === currUser?._id && (
        <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
          onClick={() => setClickAddUser(!clickAddUser)}>
          Add Users to the Chatroom
        </button>
      )}

      {clickAddUser &&
        <div className='mt-5'>
          <input
            type="text"
            placeholder="Enter username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className=" px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm mr-3"
          />
          <button
            onClick={handleAddUser}
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
          >
            Add
          </button>
        </div>
      }


      <div>
        <h2>Usernames</h2>
        <ul>
          {allUsers.map((user, index) => (
            (user.username != currUser.username) && <li key={index}>{index} - {user.username}</li>
          ))}
        </ul>
      </div>


      <ToastContainer></ToastContainer>
    </div>
  )
}
