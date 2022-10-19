let express = require('express');
let router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const JWT_SECRET = process.env.jwt;
const salt = 10;


require('../db/db');
const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('login');
})

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const response = await verifyUserLogin(email, password);
    if (response.status === 'ok') {
        res.cookie('jwt', response.token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000});
        //res.redirect('/login-success');
        res.status(201).send()
    } else {
        res.status(400).json(response);
    }
})

const verifyUserLogin = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return { status: 'error', error: 'user not found' }
        }
        if (await bcrypt.compare(password, user.password)) {
            //create token
            const token = jwt.sign({ id: user._id, userName: user.fullName, userEmail: user.email, type: 'user' }, JWT_SECRET); // jwt token
            return { status: 'ok', data: 'Login Success', token };
        }
        return { status: 'error', error: 'invalid password' }
    } catch (error) {
        console.log(error);
        return { status: 'error', error: 'timed out' }
    }
}

module.exports = router;