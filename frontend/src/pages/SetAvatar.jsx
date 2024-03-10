import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AVATAR_API } from '../utils/constant';
import axios from 'axios';
import { setAvatarRoute } from '../utils/APIRoutes';


export default function SetAvatar() {

    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('chatapp-user')) {
          navigate('/login');
        }
      }, []);

    const [avatars, setAvatars] = useState([]);
    const [selected, setSelected] = useState('');
    const [resetEnable, setResetEnable] = useState(true);
    const [timer, setTimer] = useState(0);

    const setfourAvatars = () => {
        let array = [];
        for (let i = 0; i < 4; i++) {
            let curr = `${AVATAR_API}/${Math.round(Math.random() * 1000)}`;
            console.log('curr', curr);
            array.push(curr + '.svg');
        }

        setAvatars(array);
        localStorage.setItem('avatars', JSON.stringify(array));
        console.log('lem: ', avatars.length);
    }
    useEffect(() => {
        let avatars = localStorage.getItem('avatars');
        if (!avatars) {
            setfourAvatars();
        }
        else {

            avatars = JSON.parse(avatars);
            let array = [];
            for (let i = 0; i < 4; i++) {
                let curr = avatars[i];
                console.log('curr', curr);
                array.push(curr);
            }

            setAvatars(array);
            console.log('avatars', avatars);
        }
    }, [])

    const handleResetAvatars = () => {
        console.log('reset avatar disabled');
        toast.success('Avatar list changed');
        setfourAvatars();
        setResetEnable(false);
        setTimer(30);
        setTimeout(() => {
            setResetEnable(true);
            console.log('reset avatar enabled');
        }, 30 * 1000);

        // Start the timer
        var t = setInterval(() => {
            setTimer(prev => {
                if (prev <= 0 || !resetEnable) {
                    clearInterval(t);
                    console.log('Timer reached 0');
                }
                return prev > 0 ? prev - 1 : prev;
            });
        }, 1000);
    }

    const handleSaveAvatar = async () => {
        console.log('clicked handle save')
        if (!selected) {
            toast.error('Please select an avatar');
            return;
        }

        // call the api to set the avatar image
        const currUser = await JSON.parse(localStorage.getItem('chatapp-user'));
        console.log('curr user id',currUser);
        const {data} = await axios.post(`${setAvatarRoute}/${currUser._id}`,{
            image: selected
        });
        console.log(data)
        if(data.status){
            toast.success(data.msg, { autoClose: 2000 });
            localStorage.setItem('chatapp-user', JSON.stringify(data.user));
            setTimeout(() => {
                
                navigate('/profile');
            }, 3000);
        }
        else{
            toast.error(data.msg, { autoClose: 2000 })
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="mx-auto px-4  w-3/5">
                <h1 className="text-3xl font-bold text-purple-500 mb-8">Pick an Avatar as Your Profile Photo</h1>

                {/* all avatar */}
                <div className="flex flex-wrap justify-center items-center h-[35vh] shadow-lg">
                    {avatars.map((avatar, index) => (
                        <div key={index} className={`flex items-center justify-center w-1/2 md:w-1/4 `}>
                            <img
                                src={avatar}
                                alt={`Avatar ${index}`}
                                className={`w-32 h-32 rounded-full cursor-pointer ${selected === avatar ? 'border-4 border-purple-500' : ''}`}
                                onClick={() => setSelected(avatar)}
                            />
                        </div>
                    ))}
                </div>

                {/* buttons to set image */}
                <div className="flex justify-center mt-4">
                    <button className={`px-4 py-2  text-white rounded-md mr-4 focus:bg-purple-600 focus:outline-none  ${resetEnable ? "bg-purple-500 hover:bg-purple-600" : "bg-red-500"}`}
                        onClick={handleResetAvatars} disabled={!resetEnable}>Reset Avatar list in {timer} sec</button>
                    <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600" onClick={handleSaveAvatar}>Save Profile Photo</button>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    )
}
