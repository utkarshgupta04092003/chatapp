import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import SetAvatar from './pages/SetAvatar';
import Profile from './pages/Profile';
import CreateChatroom from './pages/CreateChatroom';
import Chatrooms from './pages/Chatrooms';
export default function App() {
  return (

    <div>
      {/* <h1 className="text-3xl">App js</h1> */}

      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Chat/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/setavatar' element={<SetAvatar/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/createchatroom' element={<CreateChatroom/>}/>
        <Route path='/chatrooms' element={<Chatrooms/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
