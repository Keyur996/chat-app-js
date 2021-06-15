class ChatRoom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
    }
    // add-message
    async addChat(message) {
        const now = new Date();
        const chat = {
            message, username: this.username,
            room: this.room, created_at: firebase.firestore.Timestamp.fromDate(now)
        }
        return await this.chats.add(chat);
    }
}

const chatroom = new ChatRoom('gaming', 'Hardik');

chatroom.addChat('hello Everyone')
    .then(snapshot => console.log(snapshot))
    .catch(err => toastr.error(err.message));
// console.log(chatroom);