import React, { useState, useEffect } from 'react';
import { APP_NAME } from '../utils/constant';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';






function Register() {

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('chatapp-user')) {
      navigate('/');
    }
  }, []);


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {

    // Basic form validation
    if (!formData.username) {
      toast.error("Username is required", { autoClose: 2000 });
      return false;
    }
    else if (formData.username.length < 4) {
      toast.error("Username length should be greater than 4", { autoClose: 2000 });
      return false;
    }
    else if (!formData.email) {
      toast.error("Email is requried", { autoClose: 2000 });
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

  // Handle form submission here (e.g., API call)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // alert("validated")
      const { username, email, password } = formData;
      const { data } = await axios.post(registerRoute, {
        username, email, password
      })

      if (data.status == false) {
        toast.error(data.msg, { autoClose: 2000 });

      }
      else {
        // console.log('is tre', data);
        // localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        // localStorage.setItem('user', JSON.stringify(data.user._id));
        toast.success(data.msg, { autoClose: 2000 });
        setTimeout(() => {

          navigate('/login')
        }, 3000);
      }
      // console.log(data);
    }

  };

  return (

    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className='flex justify-center items-center '>
            {/* Insert logo image here */}
            <img src={logo} alt="" className='w-16 h-16 mr-5' />
            <h1 className="text-center text-3xl font-extrabold text-gray-900">{APP_NAME}</h1>
          </div>

          <form className="mt-8 space-y-6 " onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm">

              <div className='my-'>
                {/* <label htmlFor="username">Username</label> */}
                <input id="username" name="username" type="text" autoComplete="username" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" placeholder="Username" value={formData.username} onChange={handleChange} />
              </div>

              <div className='my-5 '>
                {/* <label htmlFor="email">Email address</label> */}
                <input id="email" name="email" type="email" autoComplete="email" className="appearance-none relative rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" placeholder="Email address" value={formData.email} onChange={handleChange} />
              </div>

              <div className='my-5'>
                {/* <label htmlFor="password">Password</label> */}
                <input id="password" name="password" type="password" autoComplete="current-password" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" placeholder="Password" value={formData.password} onChange={handleChange} />
              </div>

              <div className='my-5'>
                {/* <label htmlFor="confirmPassword">Confirm Password</label> */}
                <input id="confirmPassword" name="confirmPassword" type="password" autoComplete="current-password" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
              </div>

            </div>

            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-500 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {/* Heroicon name: solid/lock-closed */}
                </span>
                Sign Up
              </button>
            </div>

          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">Already have an account? <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">Log in</Link></p>
          </div>
        </div>


      </div>

      <ToastContainer></ToastContainer>

    </>
  );
}

export default Register;
