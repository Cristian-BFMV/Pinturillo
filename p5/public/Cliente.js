class Cliente{
    constructor(){
        this.socket = io();
    }

    ChatMessage(data){
        this.socket.emit('chat message', data);
    }
}

