const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema ({
    sender: {
        type: String,
        required: true
    },
    dateSent: {
        type: Date,
        default: Date.now
    },
    message: {
        type: String,
        required: true
    }
}, { collection: 'chats' });

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;