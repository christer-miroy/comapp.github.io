let express = require('express');
let router = express.Router();
const moongose = require('mongoose');
const jwt = require('jsonwebtoken');
const MONGODB_URL = process.env.mongodb;
const { requireAuth } = require('../middleware/authMiddleware');

const salt = 10;

moongose.connect(MONGODB_URL);

router.get('/', requireAuth, (req, res) => {
    const token = jwt.decode(req.cookies.jwt);
    console.log(token);
    res.render('login-success', {email: token.userEmail});
})

module.exports = router;