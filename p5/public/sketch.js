var socket;
/*
let sketch = p.setup();

new p5(sketch, document.getElementById('canvas-container'));*/

function setup() {
  createCanvas(600,600);
  background(0);  
  socket = io();
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





