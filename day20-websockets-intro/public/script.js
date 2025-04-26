const socket = io();

const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('chat message', message);
        messageInput.value = '';    
    }
});

socket.on('chat message', (msg) => {
    const newMessage = document.createElement('p');
    newMessage.textContent = msg;
    chatBox.appendChild(newMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
})