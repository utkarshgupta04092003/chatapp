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


const getAllChatrooms = async (req, res, next) =>{

    
    try{
        console.log('get all chtrooms');
        const userId = req.body.currUser._id;
        console.log('curr user id', userId);
        const chatrooms = await ChatroomsModel.find({
            $or: [
                { creatorId: userId }, // Find chatrooms where the user is the creator
                { users: userId }     // Find chatrooms where the user is in the list of users
            ]
        });
        console.log('Chatrooms:', chatrooms);
        res.json({msg: 'Get all users successfully', status: true , chatrooms});

    }
    catch(err){
        console.log(err);
        return res.json({msg: 'Internal server error', status: false});
    }


}
module.exports = { createChatroom , getAllChatrooms};
