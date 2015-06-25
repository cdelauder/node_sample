var express = require('express');
var bodyParser = require('body-parser');
var jade = require('jade');
var path = require('path');

var app = express();
app.set('view engine', 'jade');
app.set('views', './public/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
require('./controllers/route.js')(app);

var server = app.listen(3000, function() {
  console.log('listening at ', server.address().address, server.address().port);
});

