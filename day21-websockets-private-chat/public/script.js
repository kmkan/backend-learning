const socket = io();

function joinRoom() {
  const room = document.getElementById('room').value;
  socket.emit('joinRoom', room);
}

function sendMessage() {
  const room = document.getElementById('room').value;
  const message = document.getElementById('message').value;
  socket.emit('privateMessage', { room, message });
}

socket.on('privateMessage', data => {
  const item = document.createElement('li');
  item.textContent = `${data.sender}: ${data.message}`;
  document.getElementById('messages').appendChild(item);
});
