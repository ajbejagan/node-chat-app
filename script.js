const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`, 'them')
})

socket.on('user-connected', name => {
  appendMessage(`${name} joined the room`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} left the room`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`, 'you')
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message, senderType) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  switch(senderType) {
    case 'you':
      messageElement.classList.add('text-blue-300')
      break;
    case 'them':
      messageElement.classList.add('text-red-300')
      break;
    default:
      null
  }
  messageContainer.append(messageElement)
}