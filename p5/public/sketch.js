var socket = io();
/** Elementos del DOM **/
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

function setup() {
  var myCanvas = createCanvas(980,400);    
  background(255);    
  
  myCanvas.parent('chat-container');
  socket.on('mouse', newDrawing);  
}

function newDrawing(data){
  strokeWeight(4);
  line(data.newX, data.newY, data.previousX, data.previousY);    
}

function draw() {         
}

function mouseDragged(){    
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
function keyPressed(){
  if(keyCode === ENTER){
    var data = {
      username: username.value,
      message: message.value
    };
    socket.emit('chat message' ,data);  
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
  var data = {
      username:username.value,
      message: message.value
  }
  socket.emit('chat message' ,data);  
  
});

socket.on('chat message', function(data){
  console.log(data);
  actions.innerHTML = '';
  output.innerHTML += `<p>
      <strong>${data.username}</strong>: ${data.message}
  </p>`
});



