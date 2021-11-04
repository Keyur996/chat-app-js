// DOM elements
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newUserForm = document.querySelector('.new-name');
const updateMessage = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

// Add new Chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    // get message value
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch((ex) => toastr.error(ex.message ? ex.message : ex));
});

// Update User name
newUserForm.addEventListener('submit', e => {
    e.preventDefault();
    const newName = newUserForm.name.value.trim();
    chatroom.updateName(newName);
    newUserForm.reset();
    updateMessage.innerText = `Your name was Updated to ${newName}`;
    setTimeout(() => updateMessage.innerText = '', 3000);
});

// change Room
rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON') {
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
});

const username = localStorage.username ? localStorage.username : 'anon';

// Testing purpose
const chatUI = new ChatUI(chatList);
const chatroom = new ChatRoom('gaming', username);

chatroom.getChats((data) => {
    chatUI.render(data);
});