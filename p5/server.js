//Import modules
var path = require('path');
var express = require('express')
var app = express();
var http = require('http').createServer(app);
var socket = require('socket.io');
var io = socket(http);
var players = [];
var palabras = ["Balon" , "Carro" , "Puerta"];
var puntos = 100;
var porcentaje = 1;


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
        
         /* Alamacena la informacion de un cliente cuando este envia un mensaje por primera vez*/ 
        if(!flag){
            var playerData = {
                username: data.username,
                id: data.id,    
                puntaje: 0            
            }
            console.log(playerData);
            players.push(playerData);
            flag = true;            
        }
        //En caso de que el jugador haya acertado , se le aumenta el puntaje                
        io.sockets.emit('chat message',data);
    });
    /* Evento para limpliar el tablero, usarlo cuando sea necesario implementar la funcionalidad*/
    socket.on('clear board', (data)=>{
        console.log(data);
        var respuesta = 'board cleared';
        socket.broadcast.emit('clear board', respuesta);
    });

    socket.on('acierto' , (data)=>{
        for(var i = 0 ; i < players.length ; i++){
            if(players[i].id == data.id && players[i].username == data.username){
                players[i].puntaje += puntos*porcentaje;
                if(porcentaje > 0){
                    porcentaje -= 0.25;
                }
                console.log(players[i]);
                break;
            }
        }
        io.sockets.emit('chat message',data);
    });
    /* Evento que escoge uno de los jugadores guardados en el array players para que sea él el unico que tenga el permiso de dibujar*/
    socket.on('start the game',  ()=>{
        var jugadorEscogido = Math.floor(Math.random()*players.length);
        var palabraEscogida = Math.floor(Math.random()*palabras.length);
        var gameState ={
            jugador: players[jugadorEscogido],
            palabra: palabras[palabraEscogida]
        };     
        console.log(gameState);
        io.sockets.emit('start the game', gameState);
    });    

    socket.on('nose' , (data)=>{
        console.log(data);        
    });
});




