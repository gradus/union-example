var fs = require('fs'),
    path = require('path'),
    union = require('union');

var server = union.createServer({
  before: [ function (req,res) {
    if(req.url === "/") {
      res.text(201, "Hello Earth from Union");
    }
  } ]
});

server.listen(3000);
console.log('union running on 3000');

