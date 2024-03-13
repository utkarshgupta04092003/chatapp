const router = require('express').Router();
const {addMessage} = require('../controllers/groupMessageControllers');


router.post('/addmessage', addMessage);

module.exports = router;