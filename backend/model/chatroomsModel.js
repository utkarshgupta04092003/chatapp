
const mongoose = require('mongoose');

const chatroomsSchema = new mongoose.Schema({
    
    groupName: {
        type: String,
        required: true,
        unique: true
    },
    groupDescription: {
        type: String,
        required: true
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },  // user id
    message: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],    // message id
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    isChatroomImageSet : {
        type: Boolean,
        default: false
    },
    chatroomImage: {
        type: String,
        default: "",
    },

},
    {
        timestamps: true
    }


);

module.exports = mongoose.model("Chatrooms", chatroomsSchema)