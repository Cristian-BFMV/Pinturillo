//Import modules
var path = require('path');
var express = require('express')
var app = express();
var http = require('http').createServer(app);
var socket = require('socket.io');
var io = socket(http);
var players = [];


app.use(express.static(path.join(__dirname,'public')));

http.listen(3000, ()=>{
    console.log('Listening on port 3000');
});
/** Evento de conexion de usuario al servidor **/
io.on('connection', (socket)=>{
    var flag = false;
    console.log('An user connected ' + socket.id);
    socket.on('mouse', (data)=>{
        socket.broadcast.emit('mouse', data);
    });

    /** Evento de recibir mensjaes que son enviados del chat **/
    socket.on('chat message',  function (data){

        /** Evento para enviar los mensajes del chat a lo otros usuarios
         *  
         *  El socket.emit permite que ese evento enviado tambien sea visible 
         *  un hipotetico host.
         *  **/
        
        if(!flag){
            var playerData = {
                username: data.username,
                id: data.id                
            }
            players.push(playerData);
            flag = true;            
        }        
        io.sockets.emit('chat message',data);
    });

    socket.on('clear board', (data)=>{
        console.log(data);
        var respuesta = 'board cleared';
        socket.broadcast.emit('clear board', respuesta);
    });
    
    socket.on('start the game',  ()=>{
        var choosenPlayer = Math.floor(Math.random()*players.length);
        var playerDraw = players[choosenPlayer];
        console.log(playerDraw.username);
        io.sockets.emit('start the game', playerDraw);
    });    
});




