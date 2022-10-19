const socket = io();

const userEmail = document.getElementById("userEmail");
const chatMessage = document.getElementById("chatMessage");
const sendMessage = document.getElementById("sendMessage");
const typeMessage = document.getElementById("typeMessage");
const chatMain = document.getElementById("chatMain");

window.addEventListener('load', () => {
    scrollToBottom();
    sendMessage.addEventListener('submit', (e) => {
        e.preventDefault();
        sendChat(userEmail.textContent, typeMessage.value);
        typeMessage.value = "";
    })
})

socket.on('message', message => {
    renderMessage(message); //listen to message event
    scrollToBottom();
})

const renderMessage = message => {
    const p = document.createElement("p");
    p.innerHTML = `[${formatDate(message.dateSent)}] ${message.sender} : ${message.message}`;
    chatMessage.appendChild(p);
    scrollToBottom();
}

const formatDate = (d) => {
    const date = new Date(d);
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

const sendChat = (user, message) => {
    const data = {
        user, message
    }
    socket.emit('message', data);
    scrollToBottom();
}

function scrollToBottom() {
    chatMain.scrollTop = chatMain.scrollHeight;
}