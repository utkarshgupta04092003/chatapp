import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APP_NAME } from '../utils/constant';
import logo from '../assets/logo.png';
import {useNavigate} from 'react-router-dom';
import {createChatroomRoute} from '../utils/APIRoutes';


function CreateChatroom() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    password: '',
    confirmPassword: ''
  });

  const [currUser, setCurrUser] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('chatapp-user')) {
      navigate('/');
    }
    else{
      setCurrUser(JSON.parse(localStorage.getItem('chatapp-user')));
      // console.log('curr creating user', JSON.parse(localStorage.getItem('chatapp-user')));
    }
  }, []);



  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () =>{
    // Basic form validation
    if (!formData.name) {
      toast.error("Chatroom name is required", { autoClose: 2000 });
      return false;
    }
    else if (formData.name.length < 4) {
      toast.error("Chatroom name length should be greater than 4", { autoClose: 2000 });
      return false;
    }
    else if (!formData.description) {
      toast.error("Description is requried", { autoClose: 2000 });
      return false;
    }

    else if (!formData.password) {
      toast.error('Password is required', { autoClose: 2000 });
      return false;
    }
    else if (formData.password.length < 8) {
      toast.error("Password length should be greater than 8", { autoClose: 2000 });
      return false;
    }
    else if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match', { autoClose: 2000 });
      return false;
    }
    else {
      // console.log('Form submitted:', formData);
      return true;
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
     
        const { data } = await axios.post(createChatroomRoute, {
         formData, currUser
        });
        console.log('Chatroom created:', data);
        
        if(data.status){
          toast.success(data.msg, { autoClose: 2000 });
          setTimeout(() => {
            navigate('/chatrooms')
          }, 3000);
        }
        else  
        toast.error(data.msg, { autoClose: 2000 });

      console.log(formData)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-xl">
      <div className="flex items-center justify-center mb-4 ">
        <div className="flex items-center">
          <img src={logo} alt="Company Logo" className="w-12 h-12 mr-2" />
          <h1 className="text-2xl font-bold">{APP_NAME}</h1>
        </div>
      </div>


      <div className="mb-4">
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          // required
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" placeholder="Username"
        />
      </div>

      <div className="mb-4">
        {/* <label htmlFor="description" className="block text-gray-700">Description:</label> */}
        <input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" placeholder="Description"
        />
      </div>

      <div className="mb-4">
        {/* <label htmlFor="password" className="block text-gray-700">Password:</label> */}
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          // required
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" placeholder="Password"
        />
      </div>

      <div className="mb-4">
        {/* <label htmlFor="password" className="block text-gray-700">Password:</label> */}
        <input
          type="password"
          id="conformPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          // required
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" placeholder="Confirm Password"
        />
      </div>
      <button type="submit" className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-500">Create Chatroom</button>

      <ToastContainer></ToastContainer>
    </form>
  );
}

export default CreateChatroom;
