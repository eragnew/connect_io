var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  socket.emit('sys', {msg: 'new connection!'});
  socket.on('passcode', function(passcode) {
    socket.emit('passcode:resp', passcode === 'foobar' ? 'ok' : 'bad passcode');
  });
});

server.listen(80);
