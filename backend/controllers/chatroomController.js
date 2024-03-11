const ChatroomsModel = require("../model/chatroomsModel");


const createChatroom = async (req, res, next) => {
    try {
        console.log(req.body);
        console.log('create chatroom working');
        const formData = req.body.formData;
        const currUser = req.body.currUser;

        const chatroom = await ChatroomsModel.findOne({ groupName: formData.name });
        if (chatroom) {
            console.log('Chatroom found:', chatroom);
            return res.json({msg: 'Chatroom exist already', status: false});
        } 
        const groupDetails = {
            groupName: formData.name,
            groupDescription: formData.description,
            creatorId: currUser._id,
            user: [currUser._id]
        }
        console.log(groupDetails);
        const data  = await ChatroomsModel.create(groupDetails);
        console.log('data', data);
        return res.json({msg: `Chatroom ${data.groupName} created successfully`, status: true});
    }
    catch (err) {
        console.log(err);
        return res.json({msg: 'Internal server error', status: false})
    }
}

module.exports = { createChatroom };
