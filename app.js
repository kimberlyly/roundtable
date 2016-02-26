var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var index = require('./routes/index');
//var chat = require('./routes/chat');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.view);

//app.get('/chat', chat.view);

server.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

io.on('connection', function(socket) {
	console.log('a user connected');
});