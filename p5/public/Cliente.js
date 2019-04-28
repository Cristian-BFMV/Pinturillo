/*export default class Cliente{
    constructor(){
        this.socket = io();
    }

    ChatMessage(data){
        this.socket.emit('chat message', data);
    }
}*/

var socket = io();

function ChatMessage(data){
    this.socket.emit('Chat Message', data);
}

exports.ChatMessage = ChatMessage;
