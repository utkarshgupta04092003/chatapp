
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { addUserTochatroomRoute, deleteChatroom, getAllChatroomsRoute, getChatroomChatRoute } from '../utils/APIRoutes';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ChatroomDetails() {

  const { groupName } = useParams();
  const [groupData, setGroupData] = useState();
  const [currUser, setCurrUser] = useState();
  const [clickAddUser, setClickAddUser] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [allChatrooms, setAllChatrooms] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();

  const navigate = useNavigate();
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
    // get all chatrooms and display them
    const getChatrooms = async () => {
      const { data } = await axios.post(getAllChatroomsRoute, { currUser });
      console.log('all ', data);

      if (data.status) {
        setAllChatrooms(data.chatrooms);
        // console.log(data.chatrooms)
      }
    }
    getChatrooms();

  }, [currUser]);


  // handle change chat
  const chagneGroup = (group) => {
    console.log('chage cahtroup called', group);
    setSelectedGroup(group);

  }


  // handle add new user
  const handleAddUser = async () => {
    if (newUsername.trim() !== '' && newUsername.toLowerCase() != currUser.username.toLowerCase()) {
      // call the api to add user in this group
      const { data } = await axios.post(addUserTochatroomRoute, {
        chatroomId: groupData._id,
        username: newUsername,
      });
      console.log('addUserTochatroom:', data);
      if (data.status == false) {
        toast.error(data.msg, { autoClose: 2000 })
      }
      setAllUsers(data.chatroom.users);
    }
    else if (newUsername.toLowerCase() === currUser.username.toLowerCase()) {
      toast.error(`${newUsername} is the admin of this group`, { autoClose: 2000 })
    }

  }


  const handleDeleteChatroom = async () => {
    const cnf = confirm("You want to delete this chatroom");

    if (!cnf)
      return;
    console.log('delete', cnf);
    console.log(groupData);

    const { data } = await axios.post(deleteChatroom, {
      groupData
    });



  }


  return (
    <div className="bg-white p-4 rounded-md shadow-md mt-16 w-3/4 mx-auto">
      <div className="flex flex-col items-center mb-4">
        {groupData?.isChatroomImageSet && (
          <img src={groupData.chatroomImage} alt="Profile" className="w-24 h-24 rounded-full mr-4" />
        )}
        <div className='mt-5'>
          <h2 className="text-xl font-semibold capitalize text-center">{groupData?.groupName}</h2>
          <p className="text-gray-600 capitalize">{groupData?.groupDescription}</p>
        </div>
      </div>

      <div className='flex flex-row-reverse  justify-around '>
        <div className=' flex flex-col'>

          {groupData?.creatorId === currUser?._id && (
            <button className="mt-4 px-8 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
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

          {groupData?.creatorId === currUser?._id && (
            <button className="mt-4 px-8 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={handleDeleteChatroom}>
              Delete this chatroom
            </button>
          )}

        </div>

        <div className="bg-purple-100 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-2">Chatroom members</h2>
          <ul className='flex flex-col items-centerjustify-center'>
            {allUsers.map((user, index) => (
              <li key={index} className="flex items-center justify-between text-center py-2">
                <span className="text-gray-800"> {index + 1}.   {user.username}</span>
                <span className="text-sm font-semibold text-gray-500">
                  {groupData?.creatorId === user._id ? "(Admin)" : user._id === currUser._id && "(you)"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>



      <ToastContainer></ToastContainer>
    </div>
  )
}
