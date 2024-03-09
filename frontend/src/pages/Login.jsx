import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import logo from '../assets/logo.png';
import { APP_NAME } from '../utils/constant';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginRoute } from '../utils/APIRoutes';



function Login() {
  
  // use for navigation
  const navigate = useNavigate();
  
  // redirect to home page if user is loggedin 
  useEffect(()=>{
    if(localStorage.getItem('chatapp-user')){
      navigate('/');
    }
  }, []);
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  // handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // validate form inputs
  const validateForm = ()=>{
    if (!formData.username) {
      toast.error("Username is required", {autoClose: 2000});
      return false;
    }
    else if(formData.username.length < 4){
      toast.error("Username length should be greater than 4", {autoClose: 2000});
      return false;
    }
    
    else if (!formData.password) {
      toast.error('Password is required', {autoClose: 2000});
      return false;
    }
    else if(formData.password.length < 8){
      toast.error("Password length should be greater than 8", {autoClose: 2000});
      return false;
    }
    return true;
  }


  // handle form submission from backend and redirect to home page
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login form submitted:', formData);

    if(validateForm()){
      // alert("validated")
      const {username, password} = formData;
      const {data} = await axios.post(loginRoute, {
        username, password
      });
      console.log(data);

      
      if(data.status == false){
        toast.error(data.msg, {autoClose: 2000});
      }
      else{
        toast.success(data.msg, {autoClose: 2000});

        // will use cookie later
        // document.cookie = `userid=${data.user._id}; expire="${new Date()}"`;
        localStorage.setItem('chatapp-user', JSON.stringify(data.user));
        console.log(data.user._id); 
        setTimeout(() => {
          navigate('/')
        }, 3000);
      }
    }
    
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
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default Login;
