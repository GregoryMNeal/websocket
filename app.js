// Web Socket App

// Imports
var express = require('express'); // used to make an Express app
var app = express(); // make the app
var http = require('http').Server(app); //Node.js has a built-in module called HTTP which allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP)
var io = require('socket.io')(http);

// home page
app.get('/', function (req, resp, next) {
  resp.sendFile(__dirname + '/views/chat.html');
});

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
});

// Listen for requests
http.listen(8000, function() {
  console.log('* Listening on port 8000 *')
});
