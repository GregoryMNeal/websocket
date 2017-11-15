// Chat app using Digital Crafts slides

// Imports
var express = require('express'); // used to make an Express app
var app = express(); // make the app

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine', 'hbs'); // use handlebars for template rendering
app.use('/socket-io', express.static('node_modules/socket.io-client/dist'));

var ROOMS = {};

// home page
app.get('/', function (request, response) {
  response.render('chat.hbs');
});

io.on('connection', function(client){
  console.log('CONNECTED');

  client.on('join-room', function(room) {
    client.join(room, function() {
      console.log(client.rooms);
      io.to(room).emit('chat-msg', '** new user joined **');
      console.log(client.id);

      if (ROOMS[room]) {
        ROOMS[room].push(client.id);
      } else {
        ROOMS[room] = [client.id];
      }
      console.log(ROOMS);

      ROOMS[room].forEach(function (id) {
        // send message to everyone except person who joined
        if (id != client.id) {
          io.to(id).emit('chat-msg', '** this message goes to everyone except the person who just joined **');
        }
      });
    });

    client.on('incoming', function(msg) {
      io.to(msg.room).emit('chat-msg', msg.msg);
    });
  });

  client.on('disconnect', function () {
    console.log('EXITED');
  });
});

// Listen for requests
http.listen(8000, function() {
  console.log('* Listening on port 8000 *')
});
