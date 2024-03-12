

const router = require('express').Router();
const { createChatroom , getAllChatrooms, getChatroomChat, addUserTochatroom} = require('../controllers/chatroomController');

router.post('/createchatroom', createChatroom);
router.post('/getallchatrooms', getAllChatrooms);
router.post('/chatroomchat/:groupName', getChatroomChat);
router.post('/adduser', addUserTochatroom);

module.exports = router;