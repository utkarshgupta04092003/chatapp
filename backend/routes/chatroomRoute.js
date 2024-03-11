

const router = require('express').Router();
const { createChatroom } = require('../controllers/chatroomController');

router.post('/createchatroom', createChatroom);
// router.post('/getmsg', getAllMessage);

module.exports = router;