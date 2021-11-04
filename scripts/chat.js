class ChatRoom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
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
    // get-messages
    getChats(callback) {
        this.unsub = this.chats.where('room', '==', this.room).orderBy('created_at').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    callback(change.doc.data());
                }
            });
        });
    }
    // upadte-room
    updateRoom(room) {
        this.room = room;
        if(this.unsub) this.unsub();
    }
    updateName(uname) {
        localStorage.username = this.username = uname;
    }
}