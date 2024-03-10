import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
export default function Profile() {

  const navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem('chatapp-user')){
      navigate('/login');
    }
  })


  const { username } = useParams(); 
  return (
    <div>
      profile - 
      {username}
    </div>
  )
}
