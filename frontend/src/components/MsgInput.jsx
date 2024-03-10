import React, { useEffect, useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';


export default function MsgInput({handleSendMessage}) {
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef(null);
    const [inputText, setInputText] = useState('');


    useEffect(() => {
        // Function to handle clicks outside of the emoji picker
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setShowPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    
    const handleEmojiClick = (event, emojiObject) => {
        console.log('emoji',emojiObject);
        console.log(event.emoji);
        setInputText(prev =>(prev+event.emoji));
    };

    const handleSend = (e) =>{
        console.log(inputText);
        handleSendMessage(inputText);
    }
    return (
        <div className="flex items-center">
            <div className="relative">
                {/* placeholder emoji */}
                <button
                    onClick={() => setShowPicker(!showPicker)}
                    className="bg-purple-200 rounded-full  text-2xl mr-3 focus:outline-none"
                >
                    😀
                </button>

                {/* Emoji Picker */}
                {showPicker && (
                    <div ref={pickerRef}
                     className="absolute -top-[480px] -right-[300px] z-10 bg-white rounded-md shadow-md p-2">
                        <EmojiPicker
                            onEmojiClick={handleEmojiClick}
                            disableSearchBar
                            disableSkinTonePicker
                            native
                            pickerStyle={{ width: '100', maxHeight: '300px', overflowY: 'auto' }}
                        />
                    </div>
                )}
            </div>
            <input type="text" placeholder="Type a message..." className="w-full border border-gray-200 p-2 rounded-md mr-2" 
            onChange={(e) => setInputText(e.target.value)}
            value={inputText}/>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-md"
            onClick={handleSend}>Send</button>
        </div>

    )
}
