const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { requireAuth } = require('../middleware/authMiddleware');

require('../db/db');
const User = require('../models/user');

router.get('/', requireAuth, async (req, res) => {
    const users = await User.find();
    const token = jwt.decode(req.cookies.jwt);
    res.render('user-list', {users, id:token.id});
})

router.delete('/:id', (req, res) => {
    User.findOneAndRemove({ _id: req.params.id}).then((user) => {
        if (user) {
            res.status(200).send();
        } else {
            res.status(400).send('User not found');
        }
    })
})

module.exports = router;