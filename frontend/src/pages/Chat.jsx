import React, { Component, useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { allUsersRoute, host } from '../utils/APIRoutes';
import {useNavigate} from 'react-router-dom';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ParticularChat from '../components/ParticularChat';

import {io} from 'socket.io-client';


export default function Chat() {

  const [currUser, setCurrUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [currChat, setCurrChat] = useState();
  const navigate = useNavigate();



  // check for the authentication
  useEffect(()=>{

    const setcurr = async ()=>{

      if(!localStorage.getItem('chatapp-user')){
        navigate('/login');
      }
      else{
        const curr = await JSON.parse(localStorage.getItem('chatapp-user'));
        // console.log('curr', curr);
        setCurrUser(curr);
        navigate('/')
      }
    }
    setcurr();
  },[]);

  // socket if the current user is changed
  const socket = useRef();
  useEffect(()=>{

      if(currUser){
        socket.current =  io(host);
        socket.current.emit('add-user', currUser._id);
      }
      
    }, [currUser])
    
    // console.log('currUser._id', currUser._id);

  // change the data if the current user is changed
  useEffect(()=>{
    const fetchAllUsers = async ()=>{

      if(currUser){
        if(currUser){
          if(!currUser.isAvatarImageSet){
            navigate('/setavatar');
          }
          else{
            const { data } = await axios.get(`${allUsersRoute}/${currUser._id}`);
            setContacts(data.users);
          }
        }

      }
      else{
        navigate('/login');
      }
    }
    fetchAllUsers();

  }, [currUser]);

  const changeChat = (contact) =>{
    setCurrChat(contact);
    console.log('curr', contact);
  }


  
  return (
    <div className="flex h-screen mx-auto w-full md:w-3/4">
      
      <Contacts contacts={contacts} currUser={currUser} changeChat={changeChat} />
      {
        currChat ? 
        <ParticularChat currChat={currChat} setCurrChat={setCurrChat} currUser={currUser} socket={socket} /> : 
        <Welcome currentUser={currUser}  />
      }

    </div>
  )
}
