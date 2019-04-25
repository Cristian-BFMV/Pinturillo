var socket = io();
/** Elementos del DOM **/
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

function setup() {
  createCanvas(600,600);
  background(0);  
  socket.on('mouse', newDrawing);  
}

function newDrawing(data){
  noStroke();    
  ellipse(data.x, data.y, 10,10);
}

function draw() {     
}

function mouseDragged(){
  noStroke();    
  ellipse(mouseX, mouseY, 10,10);
  var data = {
      x: mouseX,
      y: mouseY
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



