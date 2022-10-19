let express = require('express');
let router = express.Router();
const jwt = require('jsonwebtoken');

/* GET logout.js */
router.get('/', (req, res, next) => {
    //removing the token value
    res.cookie('jwt', '', {maxAge:1});
    res.render('logout');
});

module.exports = router;