const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
require('dotenv').config();
const bcrypt = require('bcryptjs');
const { default: mongoose } = require('mongoose');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));

var welcomeRouter = require('./routes/welcome');
var registerRouter = require('./routes/register');
var registerSuccessRouter = require('./routes/register-success');
var loginRouter = require('./routes/login');
var loginSuccessRouter = require('./routes/login-success');
var userListRouter = require('./routes/user-list');
var editUserRouter = require('./routes/edit-user');
var docsListRouter = require('./routes/docs-list');
var shareDocsRouter = require('./routes/share-docs');
var chatRouter = require('./routes/chat');
var shareRouter = require('./routes/share-docs');
var logoutRouter = require('./routes/logout');

app.use('/', welcomeRouter);
app.use('/register', registerRouter);
app.use('/register-success', registerSuccessRouter);
app.use('/login', loginRouter);
app.use('/login-success', loginSuccessRouter);
app.use('/user-list', userListRouter);
app.use('/edit-user', editUserRouter);
app.use('/docs-list', docsListRouter);
app.use('/share-docs', shareDocsRouter);
app.use('/chat', chatRouter);
app.use('/share-docs', shareRouter);
app.use('/logout', logoutRouter);
//app.use(express.static(__dirname + '/public')); //socket.io

//get url and secret
const JWT_SECRET = process.env.jwt;
const MONGODB_URL = process.env.mongodb;
const salt = 10;

http.listen(port, () => {
    console.log(`Running on port ${port}`);
})



require('./db/db');
const Chat = require('./models/chat');

io.on('connection', (socket) => {
    console.log('connected ...');
    socket.on('message', async (message) => {
        const chat = await Chat.create({
            sender: message.user,
            message: message.message
        })
        console.log(chat)
        io.emit('message', chat) //broadcast message to all logged in users
    });
})