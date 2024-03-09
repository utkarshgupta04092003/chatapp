import { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import logo from '../assets/logo.png';
import { APP_NAME } from '../utils/constant';
import axios from 'axios';
function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login submission
    console.log('Login form submitted:', formData);
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className='flex justify-center items-center'>
          <img src={logo} alt="Logo" className='w-16 h-16 mr-5'/>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">{APP_NAME}</h1>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div className='my-5'>
              <input id="username" name="username" type="text" autoComplete="username" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" placeholder="Username" value={formData.username} onChange={handleChange} />
            </div>
            <div className='my-5'>
              <input id="password" name="password" type="password" autoComplete="current-password" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm" placeholder="Password" value={formData.password} onChange={handleChange} />
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-500 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Sign In
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">Don't have an account? <Link to="/register" className="font-medium text-purple-600 hover:text-purple-500">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
