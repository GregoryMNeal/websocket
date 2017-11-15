// Web Socket App

// Imports
var express = require('express'); // used to make an Express app
var app = express(); // make the app
var http = require('http').Server(app); //Node.js has a built-in module called HTTP which allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP)
var io = require('socket.io')(http); // Socket.IO enables real-time bidirectional event-based communication

// Application setup
app.set('view engine', 'hbs'); // use handlebars for template rendering
app.use(express.static('public')); // eetup express to serve the files in the public folder
app.use('/socket-io',express.static('node_modules/socket.io-client/dist'));

// home page
app.get('/', function (req, resp, next) {
  response.render('chat.hbs');
});

io.on('connection', function(client){
  console.log('CONNECTED');
  client.on('disconnect', function () {
    console.log('EXITED');
  });
});

client.on('incoming', function(msg){
  io.emit('chat-msg', msg);
});

// Listen for requests
http.listen(8000, function() {
  console.log('* Listening on port 8000 *')
});
