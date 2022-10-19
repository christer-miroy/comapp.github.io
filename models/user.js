const mongoose = require('mongoose');

// schema for user
const userSchema = new mongoose.Schema ({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    shared: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Upload' //model name
        }
    ]
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);
module.exports = User;