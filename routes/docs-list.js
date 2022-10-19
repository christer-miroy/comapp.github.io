let express = require('express');
let formidable = require("formidable");
let fs = require("fs");
let router = express.Router();
require('../db/db');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const axios = require('axios');
const { requireAuth } = require('../middleware/authMiddleware');
const folderPath = __dirname + '/uploads';
const User = require('../models/user');
const Upload = require('../models/uploads');

router.post('/', async (req, res) => {
    const token = jwt.decode(req.cookies.jwt);
    console.log(token);
    //const { fileLabel, fileName } = req.body;
    var formData = new formidable.IncomingForm();
    formData.parse(req, function (err, fields, files) {
        const userId = token.id;
        console.log(userId);
        //insert file
        var oldpath = files.fileName.filepath;
        var newpath = process.cwd() + "/routes/uploads/" + files.fileName.originalFilename;
        fs.readFile(oldpath, function (err, data) {
            if (err) throw err;
            Upload.create({
                userId,
                fileLabel: fields.fileLabel,
                fileName: files.fileName.originalFilename
            });
            // write into the file 
            fs.writeFile(newpath, data, function (err) {
                if (err) throw err;
                res.send('File uploaded');
                res.end();
            })
        })
    })
});

/* download file */
const path = require("path");

router.get('/download/:id', (req, res, next) => {
    Upload.findById(req.params.id).exec((err, files) => {
        if (err) throw err;
        res.download(folderPath + '/' + files.fileName);
    })
})

/* delete upload */
router.delete('/:id', (req, res) => {
    Upload.findOneAndRemove({ _id: req.params.id }).then((upload) => {
        if (upload) {
            res.status(200).send();
        } else {
            res.status(4010).send('Upload not found.');
        }
    })
})

/* Edit Label */
router.put('/:id', async (req, res) => {
    await Upload.findByIdAndUpdate(req.params.id, {
        $set: {
            fileLabel: req.body.fileLabel
        }
    })
    res.status(201).send();
})

/* GET docs-list.js */
router.get('/', requireAuth, async (req, res, next) => {
    const token = jwt.decode(req.cookies.jwt);
    await Upload.find({ userId: token.id }).then(uploads => {
        User.findById(token.id).populate({
            path: 'shared',
            populate: {
                path: 'userId',
                model: 'User'
            }
        }).then(users => {
            res.render('docs-list', { uploads, users })
        })
    }).catch(error => {
        res.status(401).send()
    })
})

module.exports = router;