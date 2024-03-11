

const router = require('express').Router();
const { createChatroom , getAllChatrooms} = require('../controllers/chatroomController');

router.post('/createchatroom', createChatroom);
router.post('/getallchatrooms', getAllChatrooms);

module.exports = router;