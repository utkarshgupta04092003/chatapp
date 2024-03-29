import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { getAllChatroomsRoute, host } from '../utils/APIRoutes';
import axios from 'axios';
import ChatroomGroups from '../components/ChatroomGroups';
import ChatroomChats from '../components/ChatroomChats';
import plus from '../../public/plus.svg';
import logo from '../../src/assets/logo.png';
import { APP_NAME } from '../utils/constant';
import { io } from 'socket.io-client';


export default function ChatroomChat() {

  const [currUser, setCurrUser] = useState();
  const [allChatrooms, setAllChatrooms] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState();
  const socket = useRef();

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
        console.log('after login', currUser);
      }
    }
    setUser();

  }, [])


  useEffect(() => {
    // get all chatrooms and display them
    console.log('curr user changed', currUser);

    const getChatrooms = async () => {
      console.log('curr user in get', currUser);
      const { data } = await axios.post(getAllChatroomsRoute, { currUser });
      console.log('all ', currUser);

      if (data.status) {
        setAllChatrooms(data.chatrooms);
        // console.log(data.chatrooms)
      }
    }
    if (currUser)
      getChatrooms();

  }, [currUser]);

  useEffect(() => {
    if (currUser) {
      socket.current = io(host);
      socket.current.emit('joinRoom', selectedGroup._id);
    }
  }, [selectedGroup]);

  // handle change chat
  const chagneGroup = (group) => {
    console.log('chage cahtroup called', group);
    setSelectedGroup(group);
  }



  return (
    <div className="flex h-screen w-3/4 mx-auto border border-gray-500">
      {/* Left section */}
      <div className="flex flex-col w-1/3 pt-3 bg-white-500 ">
        <div className='flex justify-center items-center mb-2'>
          {/* Insert logo image here */}
          <img src={logo} alt="" className='w-12 h-12 mr-2 rounded-full' />
          <h1 className="text-2xl font-bold">{APP_NAME}</h1>
        </div>
        <hr />
        <div className="flex items-center justify-between px-4 py-2">

          {/* create chatroom */}
          <div className='w-full flex justify-between items-center mt-3'>

            <Link to={'/'} className='block '>
              <div className={` mb-2  p-2 rounded-md border border-purple-500 cursor-pointer transition ease-in-out delay-75 bg-purple-500`}>
                <p className="text-sm text-center text-white font-semibold">Personal Chats</p>
              </div>
            </Link>

            <Link to={'/createchatroom'} className=' block'>
              <img src={plus} alt="" className='w-8 h-8 font-bold text-black' />
            </Link>
          </div>

        </div>



        {/* search user section  */}
        <div className="px-4 py-2">
          <input type="text" placeholder="Search" className="w-full bg-white border border-purple-500 rounded-md px-3 py-2 focus:outline-none focus:ring-purple-500 focus:border-purple-500" />
        </div>

        {/* list of all users */}
        <ChatroomGroups allChatrooms={allChatrooms} selectedGroup={selectedGroup} chagneGroup={chagneGroup} />
      </div>

      {/* Right section */}
      <ChatroomChats selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} socket={socket} />
    </div>
  );
}