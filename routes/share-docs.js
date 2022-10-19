let express = require('express');
let router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Upload = require('../models/uploads');
const { requireAuth } = require('../middleware/authMiddleware');
const { Types } = require('mongoose');

/*
router.get('/:id', requireAuth, async function(req, res, next) {
    const upload = await Upload.findById(req.params.id);
    const token = jwt.decode(req.cookies.jwt);
    const user = await User.find({_id:{$ne:token.id}}) //will not render logged in user's id in drop-down list
    console.log(token);
    console.log(upload);
    res.render('share-docs', {upload, user});
})
*/

router.get('/:id', requireAuth, async function(req, res, next) {
    console.log(req.params.id)
    file_Name = req.params.id;
    const token = jwt.decode(req.cookies.jwt);
    const users = await User.find({_id:{$ne:token.id}});
    await Upload.findById(req.params.id).then(async (share) => {
      await User.find({shared:{$eq:share._id}}).then(usershared => {
        console.log(users)
        console.log(usershared)
        console.log(share);
        res.render('share-docs', {
          usershared,
          users,
          share
        })
      
      })
    })
});
  

router.post('/:id', async (req, res) => {
    const { userId } = req.body
    const { id } = req.params
    await User.findByIdAndUpdate(userId, {
      $addToSet: {
        shared: Types.ObjectId(id)
      }
    }).then(user => {
      res.status(201).send()
    }).catch(error => {
      res.status(401).json({error})
    })
})

/* remove access modal */
router.put('/:id', async (req, res) => {
  await User.findOneAndUpdate({ _id: req.body.userId}, {
    $pull: {
      shared: req.params.id
    }
  }).then((user) => {
      if (user) {
        res.status(200).send();
      } else {
          res.status(400).send('User not found');
      }
  })
})

module.exports = router;