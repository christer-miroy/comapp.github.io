const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema ({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    fileLabel: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    }
}, { collection: 'uploads' });

const Upload = mongoose.model('Upload', uploadSchema);
module.exports = Upload;