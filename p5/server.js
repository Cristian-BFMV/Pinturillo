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

io.on('connection', (socket)=>{
    console.log('An user connected' + socket.id);
    socket.on('mouse', (data)=>{
        socket.broadcast.emit('mouse', data);
    });

    socket.on('chat message',  (msg)=>{
        console.log(msg);
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