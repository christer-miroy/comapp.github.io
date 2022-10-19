let express = require('express');
let router = express.Router();
const jwt = require('jsonwebtoken');
require('../db/db');
require('dotenv').config();
const Chat = require('../models/chat');
const { requireAuth } = require('../middleware/authMiddleware');


/* GET Chat.js */
router.get('/', requireAuth, async function (req, res, next) {
    
    const chats = await Chat.find()
    //display user name
    const token = jwt.decode(req.cookies.jwt);
    res.render('chat', {fullName: token.userName, chats});
});

module.exports = router;