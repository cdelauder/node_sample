var express = require('express');

var app = express();

var server = app.listen(3000, function() {
  console.log('listening at ', server.address().address, server.address().port)
});