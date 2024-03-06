import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
export default function App() {
  return (

    <div>
      <h1 className="text-3xl">App js</h1>

      <BrowserRouter>
        <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/' element={<Chat/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
