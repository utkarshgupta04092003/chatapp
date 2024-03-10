import React, { Component, useEffect, useState } from 'react'
import axios from 'axios';
import { allUsersRoute } from '../utils/APIRoutes';
import {useNavigate} from 'react-router-dom';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ParticularChat from '../components/ParticularChat';



export default function Chat() {

  const [currUser, setCurrUser] = useState(null);
  const [contacts, setContacts] = useState();
  const [currChat, setCurrChat] = useState();
  const navigate = useNavigate();
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
    <div className="flex h-screen mx-auto  w-3/4">
      
      <Contacts contacts={contacts} currUser={currUser} changeChat={changeChat} />
      {
        currChat ? <ParticularChat currChat={currChat} currUser={currUser}/> : <Welcome currentUser={currUser} />
      }

    </div>
  )
}
