let express = require('express');
let router = express.Router();

require('../db/db');
const User = require('../models/user');

const { requireAuth } = require('../middleware/authMiddleware');

router.get('/:id', requireAuth, function(req, res, next) {
  console.log(req.params.id)
  User.findById(req.params.id, function (err, user){
    res.render('edit-user', {
      user
    });
  });
});

//edit
router.post('/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {
      $set: {
        fullName:req.body.fullName,
        email:req.body.email
      }
    })
    res.redirect('/user-list');
})

module.exports = router;