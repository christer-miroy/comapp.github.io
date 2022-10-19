var express = require('express');
var router = express.Router();

//get API - welcome
router.get('/', (req, res) => {
    res.render('welcome', {title: 'Welcome'});
})

module.exports = router;