import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
export default function Profile() {

  const navigate = useNavigate();

  const [profileData, setProfileData] = useState();
  useEffect(() => {
    if (!localStorage.getItem('chatapp-user')) {
      navigate('/login');
    }
    else{
      const data = JSON.parse(localStorage.getItem('chatapp-user'));
      setProfileData(data);
    }
  }, [])
  // const profileData = {
  //   username: 'JohnDoe',
  //   profileImage: 'https://api.multiavatar.com/925.svg', // URL of profile image
  // };

  const handleSignOut = () =>{
    localStorage.clear();
    navigate('/')
  }

  return (
    <div className="w-1/3 h-[80vh] flex items-center justify-center mx-auto p-4 ">
      {/* Profile Image */}
      <div className='flex flex-col border border-purple-50 p-16 shadow-lg rounded-lg'>
      <div className="text-center">
        <img src={profileData?.avatarImage} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
        <p className="text-lg font-semibold">{profileData?.username}</p>
      </div>

      {/* Edit Profile Photo Button */}
      <div className="text-center mt-4">
        <Link to="/setavatar" className="inline-block bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 mx-2">
          Edit Profile Photo
        </Link>
        <div className="inline-block bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 mx-2 cursor-pointer"
        onClick={handleSignOut}>
          Sign out
        </div>
      </div>
      </div>
    </div>
  );
}
