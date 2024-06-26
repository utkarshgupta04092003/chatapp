// define all the api route here

export const host = 'https://chatappbackend-1sd2.onrender.com';
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setavatar`;
export const allUsersRoute = `${host}/api/auth/allusers`;


export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const getAllMessageRoute = `${host}/api/messages/getmsg`;


export const createChatroomRoute = `${host}/api/chatroom/createchatroom`;
export const getAllChatrooms = `${host}/api/chatroom/getallchatrooms`;
export const getAllChatroomsRoute = `${host}/api/chatroom/getallchatrooms`;
export const getChatroomChatRoute = `${host}/api/chatroom/chatroomchat`;
export const addUserTochatroomRoute = `${host}/api/chatroom/adduser`;

export const deleteChatroom = `${host}/api/chatroom/deletechatroom`;
export const exitFromChatroom = `${host}/api/chatroom/exitfromchatroom`;


export const addChatroomMessageRoute = `${host}/api/chatroommessage/addmessage`;
export const getChatroomMessageRoute = `${host}/api/chatroommessage/getmessage`;