//Declaración de variables
var socket = io();
var jugadorDibujo;
var palabraEscogida;
var myCanvas;
var acierto = false;
/** Elementos del DOM **/
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');
let jugar = document.getElementById('jugar');


function setup() {
  myCanvas = createCanvas(980,400);    
  background(255);      
  myCanvas.parent('chat-container');
  
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
btn.addEventListener('click', function(){    
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

sala1.addEventListener('click',function(){
  socket.emit('change channel','sala1');
  clear();
  setup();
});
  


sala2.addEventListener('click',function(){
  socket.emit('change channel', 'sala2');
  clear();
  setup();
});

socket.on('chat message', function(data){  
  actions.innerHTML = '';
  output.innerHTML += `<p>
      <strong>${data.username}</strong>: ${data.message}
  </p>`
});

socket.on('change channel', function(sala){  
  actions.innerHTML = '';
  output.innerHTML += `<p>
      Bienvenido a la sala: <strong>${sala}</strong>
  </p>`
 // clear();
  //setup();
});
//Evento que dibuja en el browser de los demás jugadores, se llama a la función newDrawing
socket.on('mouse', newDrawing);  

/*  clear();
  setup();
  var data ='clear the board';
  socket.emit('clear board', data);*/

//Por el momento la funcionalidad de escoger el jugador para que se le premita dibujar a traves del evento del boton
jugar.addEventListener('click' , ()=>{
    socket.emit('start the game');
});
//Evento que recibe el jugador que tiene el permiso de dibujar por parte del servidor
socket.on('start the game' , (gameState)=>{
  jugadorDibujo = gameState.jugador;
  palabraEscogida = gameState.palabra;  
});

//Evento(no implementado) que sirve para limpiar el tablero.
socket.on('clear board', (data)=>{
  console.log(data)
  clear();
  setup();
});


