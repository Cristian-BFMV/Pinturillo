//Declaración de variables
var socket = io();
var jugadorDibujo;
var palabraEscogida;
var myCanvas;
var acierto = false;
var timer;
/** Elementos del DOM **/
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');
let jugar = document.getElementById('jugar');


function setup() {
  myCanvas = createCanvas(980,400);    
  //background(255);      
  myCanvas.parent('chat-container');
  timer = select('#timer');     
}

function newDrawing(data){
  strokeWeight(4);
  line(data.newX, data.newY, data.previousX, data.previousY);    
}

function draw() {         
}

function mouseDragged(){
  //Controla que el jugador tenga el permiso para dibujar
  if(jugadorDibujo != undefined){
    if(jugadorDibujo.username == username.value && jugadorDibujo.id == socket.id){
      strokeWeight(4);
      line(mouseX, mouseY, pmouseX, pmouseY);    
      var data = {
          previousX: pmouseX,
          previousY: pmouseY,
          newX: mouseX,
          newY: mouseY
      }
      socket.emit('mouse', data);  
    }
  }
}
//Permite que el usuario envie el mensaje al oprimir la tecla enter
function keyPressed(){
  if(keyCode === ENTER){
    var mensaje;    
    if(palabraEscogida != undefined){
      if(message.value.toLowerCase() == palabraEscogida.toLowerCase()){
          mensaje = username.value + ', ha acertado la palabra';             
          var data = {
            username:username.value,
            message: mensaje,
            id: socket.id,        
        }
        socket.emit('acierto',data);
      }else{
        mensaje = message.value;      
      } 
    }else{
      mensaje = message.value;
      var data = {
        username:username.value,
        message: mensaje,
        id: socket.id,        
      }
      socket.emit('chat message' ,data);  
    }    
  }
}

/** Evento de click del boton "Send"
 *  
 *  Añadimos un listener a ese evento, el cual es un "click"
 * 
 *  Cuando se ejecuta este evento debemos enviar una informacion al server. Esta
 *  informacion sera el usuario que envia el mensaje y el contenido de este. En 
 *  este caso lo enviamos como un objeto donde obtenemos el valor que tengan las
 *  etiquetas "input" (username y message) de nuestro HTML**/
btn.addEventListener('click', ()=>{    
  var mensaje;    
    if(palabraEscogida != undefined){
      if(message.value.toLowerCase() == palabraEscogida.toLowerCase()){
          mensaje = username.value + ', ha acertado la palabra';             
          var data = {
            username:username.value,
            message: mensaje,
            id: socket.id,        
        }
        socket.emit('acierto',data);
      }else{
        mensaje = message.value;  
        var data = {
          username:username.value,
          message: mensaje,
          id: socket.id,        
        }
        socket.emit('chat message' ,data);    
      } 
    }else{
      mensaje = message.value;
      var data = {
        username:username.value,
        message: mensaje,
        id: socket.id,        
      }
      socket.emit('chat message' ,data);  
    }      
});

socket.on('chat message', function(data){  
  actions.innerHTML = '';
  output.innerHTML += `<p>
      <strong>${data.username}</strong>: ${data.message}
  </p>`
});

//Evento que dibuja en el browser de los demás jugadores, se llama a la función newDrawing
socket.on('mouse', newDrawing);  

//Por el momento la funcionalidad de escoger el jugador para que se le premita dibujar a traves del evento del boton
jugar.addEventListener('click' , ()=>{
    socket.emit('start the game');  
    socket.emit('timer');     
});

socket.on('timer', (counter)=>{
  timer.html(counter);  
});

socket.on('restart the game' , ()=>{
  socket.emit('clear board');
  socket.emit('start the game'); 
});
//Evento que recibe el jugador que tiene el permiso de dibujar por parte del servidor
socket.on('start the game' , (gameState)=>{
  jugadorDibujo = gameState.jugador;  
  palabraEscogida = gameState.palabra;
  var mensaje;
  if(jugadorDibujo.id == socket.id){
    mensaje = 'Seras el siguinte dibujante, y tu palabra es: ' + gameState.palabra;
  }else{
    mensaje = gameState.jugador.username + ', sera el siguiente en dibujar';
  }  
  actions.innerHTML = '';
  output.innerHTML += `<p>
      <strong>${mensaje}</strong>
  </p>`  
});

//Evento(no implementado) que sirve para limpiar el tablero.
socket.on('clear board', ()=>{
  clear();
});


