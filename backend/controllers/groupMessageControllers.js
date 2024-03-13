const GroupMessagesModel = require('../model/groupMessagesModel');
const ChatroomModel = require('../model/chatroomsModel');

const addMessage = async (req, res, next) =>{

    console.log('add msg called', req.body);
    try{
        const {groupId, userId, content, userName} = req.body;

        const chatroom =  await ChatroomModel.findById(groupId);
        if(!chatroom){
            return res.json({msg: 'chatroom not found', status: false})
        }

        console.log('chatroom',chatroom)
        
        const chatroommsg = await GroupMessagesModel.create({
            groupId: groupId,
            senderId: userId,
            content: content,
            senderName: userName
        })

        if(!chatroommsg){
            return res.json({msg: 'Error in adding message', status: false});
        }

        chatroom.message.push(chatroommsg);
        await chatroom.save();
        const modified = await chatroom.populate('message');

        return res.json({msg: 'Message Send successfully', stauts: true, chatroom: modified});
        


    }
    catch(err){
        console.log(err)
        return res.json({msg: 'Internal server error', status: false});
    }
}

module.exports = {addMessage};