
const mongoose = require('mongoose');

const groupMessagesSchema = new mongoose.Schema({
    groupId: {
        type: String,
        required: true,
    },
    messages: [{
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        content: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model("GroupMessages", groupMessagesSchema);
