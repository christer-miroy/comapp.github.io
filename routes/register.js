let express = require('express');
let router = express.Router();
require('../db/db');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const salt = 10;

//register post API
router.post('/', async (req, res) => {
    //data from frontend
    const { fullName, email, password: plainPassword } = req.body;
    console.log("req.body", req.body);
    console.log("fullName" , fullName);
    console.log("email" , email);
    console.log("plainPassword" , plainPassword);

    //password encryption
    const password = await bcrypt.hash(plainPassword, salt);
    try {
        //storing data into database
        const response = await User.create({
            fullName,
            email,
            password
        })
        return res.status(201).send();
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(400).send({ status: 'error', error: 'email already exists' });
        }
        res.status(400).json({
            error
        });
    }
})

//get API - register
router.get('/', (req, res) => {
    res.render('register');
})

module.exports = router;