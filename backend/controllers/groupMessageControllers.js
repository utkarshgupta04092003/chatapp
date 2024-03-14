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

        return res.json({msg: 'Message Send successfully', stauts: true, messages: modified.message});
        


    }
    catch(err){
        console.log(err)
        return res.json({msg: 'Internal server error', status: false});
    }
}

const getMessage = async (req, res, next) =>{
    try {
        // Fetch all messages with groupId "#123" and sort them by createdAt in descending order
        const {groupId} = req.body;
        const messages = await GroupMessagesModel.find({ groupId: groupId })
          .sort({ createdAt: -1 })
          .exec();

        //   const modified = await messages.populate('message');
    
        // Return the sorted messages
        return res.json({msg: 'Fetched all message of this group', stauts: true, messages});

      } catch (error) {
        console.error('Error fetching messages:', error);
        
        return res.json({msg: 'Internval sever error', status: false});
      }
}

module.exports = {addMessage, getMessage};