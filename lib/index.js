var fs = require('fs'),
    union = require('union');

var server = union.createServer({
  before: [
    function (req, res) {
      fs.readFile(__dirname + '/index.html',
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
    res.writeHead(200);
    res.end(data);
    });
    }
  ]
});

server.listen(3000);

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
  socket.emit('greeting', {hello: 'earth'});
  socket.on('response', function(data) {
    console.log(data);
    socket.emit('destroyMessage', {destroy: 'earth'});
  });
  socket.on('goodbyeResponse', function(data) {
    console.log(data);
    socket.emit('goodbyeMessage', {goodbye: 'earth'});
  });
});

