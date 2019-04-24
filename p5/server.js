//Import modules
var path = require('path');
var express = require('express')
var app = express();
var http = require('http').createServer(app);
var socket = require('socket.io');
var io = socket(http);

app.use(express.static(path.join(__dirname,'public')));

http.listen(3000, ()=>{
    console.log('Listening on port 3000');
});
/** Evento de conexion de usuario al servidor **/
io.on('connection', (socket)=>{
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
        io.sockets.emit('chat message',data);
    })
});




/*
//Setings
app.set('port', process.env.PORT || 3000);
//Static files
app.use(express.static(path.join(__dirname,'public')));
//start the server
const server = app.listen(app.get('port'), ()=> {
    console.log('server on port' , app.get('port'));
});
//Web sockets
const socketIO = require('socket.io');
const io = socketIO(server);
io.on('connection', (socket)=>{
    console.log('New connection');
});
*/