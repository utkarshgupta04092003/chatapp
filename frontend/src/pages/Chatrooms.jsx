import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAllChatrooms } from '../utils/APIRoutes';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Chatrooms() {

  const [currUser, setCurrUser] = useState();
  const [allChatrooms, setAllChatrooms] = useState([]);
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
    // get all chatrooms and display them
    const getChatrooms = async () => {
      const { data } = await axios.post(getAllChatrooms, { currUser });
      // console.log(data);

      if (data.status) {
        setAllChatrooms(data.chatrooms);
      }
    }
    getChatrooms();

  }, [currUser]);

  const handleClickChatroom = (e) =>{
    console.log(e.target);
    e.stopPropagation();
  }
  return (
    <div className="max-w-2xl mx-auto p-4  text-purple-500">

      <div className='flex justify-between mb-3'>

        <h1 className="text-3xl font-bold mb-4">All Chatrooms</h1>
        <Link to="/createchatroom" className="bg-purple-500 text-white mt-4 flex justify-center items-center px-4 rounded-full">
          Create Chatroom
        </Link>
      </div>


      {allChatrooms.length == 0 && <div className="py-4 px-6 text-2xl mt-16 flex items-center text-center justify-center font-bold">Oops! <br /> No Chatroom found.</div>
}
      <div className="shadow-lg rounded-lg overflow-hidden">

        <ul className="divide-y divide-gray-200">
          {allChatrooms?.map((chatroom, index) => (
            <li key={chatroom._id} className="py-4 px-6 flex items-center">
            <Link to={`/chatrooms/${chatroom.groupName}`} className='flex'>
              {chatroom.isChatroomImageSet && 
                <img src={chatroom?.chatroomImage} alt="Profile" className="w-10 h-10 rounded-full mr-4" />
              }
              <div className='capitalize'>
                <p className="block text-gray-700 font-medium">{chatroom.groupName}
                  <span className='ml-3'>({chatroom.creatorId === currUser._id ? "admin" : ""})</span>
                </p>
                <p className="block text-sm text-gray-500">{chatroom.groupDescription}</p>
              </div></Link>
            </li>
          ))}
        </ul>
      </div>


      <ToastContainer />
    </div>
  )
}
