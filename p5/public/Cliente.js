/*export default class Cliente{
    constructor(){
        this.socket = io();
    }

    ChatMessage(data){
        this.socket.emit('chat message', data);
    }
}*/

function Cliente(){
    this.socket = io();
    this.ChatMessage = function(data){
        this.socket.emit('Chat Message', data);
    }
}

