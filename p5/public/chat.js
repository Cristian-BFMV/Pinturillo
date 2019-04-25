
/*class Cliente{
  constructor(){
      this.socket = io();
  }

  ChatMessage(data){
      this.socket.emit('chat message', data);
  }
}

//import Cliente from './Cliente.js';
*/
var cliente = new Cliente();
/** Elementos del DOM **/
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');



/** Evento de click del boton "Send"
 *  
 *  Añadimos un listener a ese evento, el cual es un "click"
 * 
 *  Cuando se ejecuta este evento debemos enviar una informacion al server. Esta
 *  informacion sera el usuario que envia el mensaje y el contenido de este. En 
 *  este caso lo enviamos como un objeto donde obtenemos el valor que tengan las
 *  etiquetas "input" (username y message) de nuestro HTML**/
btn.addEventListener('click', function(){
    console.log('I am working');
    var data = {
        username:username.value,
        message: message.value
    }
    cliente.ChatMessage(data);
});
/** Evento de usuario escribiendo mensaje
 *  
 *  Si en el input "Message" se esta oprimiendo alguna tecla (con el fin de 
 *  escribir un mensaje), entonces envie al servidor el nombre del usuario
 *  que lo esta haciendo.
 * **/
/*message.addEventListener('keypress', function(){
    socket.emit('chat typing', username.value);
});*/

/** Añadir en el HTML el bloque con un mensaje enviado 
 * 
 *  La nueva etiqueta es añadida en el div de "Output", en el cual van
 *  los mensajes del chat.
 *  **/
/*socket.on('chat message', function(data){
    console.log(data);
    actions.innerHTML = '';
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`
});*/


