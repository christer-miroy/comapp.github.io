let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.render('register-success');
})

module.exports = router;