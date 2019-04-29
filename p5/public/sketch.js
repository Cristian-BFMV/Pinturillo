var socket = io();
var jugadorDibujo = 'Cristian';
var myCanvas;
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
  console.log(jugadorDibujo);    
  if(jugadorDibujo == 'Cristian'){
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

socket.on('mouse', newDrawing);  

jugar.addEventListener('click' , ()=>{
  clear();
  setup();
  var data ='clear the board';
  socket.emit('clear board', data);
});

socket.on('clear board', (data)=>{
  console.log(data)
  clear();
  setup();
});


