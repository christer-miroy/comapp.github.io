/*  Implement JWT Token, after login create token and store in cookie and for each page check weather token exist or not. */
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.jwt;

//check the authentication status
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //check json web token exist and verified
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            //is there an error?
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('/login');
    }
}

module.exports = { requireAuth };