var fs = require('fs'),
    ecstatic = require('ecstatic'),
    union = require('union');

var server = union.createServer({
  before: [
    ecstatic(__dirname + '/../assets', {autoIndex: false}),
    function (req, res) {
      if(req.url === "/foo") {
        res.text(201, "foo");
      }
      fs.readFile(__dirname + '/index.html', function (err, data) {
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
  socket.emit('greeting', {hello: 'Hello Earth '});
  socket.on('response', function(data) {
    console.log(data);
    socket.emit('destroyMessage', {destroy: 'Earth Destroyed '});
  });
  socket.on('goodbyeResponse', function(data) {
    console.log(data);
    socket.emit('goodbyeMessage', {goodbye: 'Goodbye Earth'});
  });
});

