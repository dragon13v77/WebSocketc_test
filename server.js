var WebSocketServer = require('websocket').server;
var path = require('path');
//var http = require('http');
//var server = http.createServer(function(req, res) {
//	// process HTTP request.
//});
//server.listen(1337, function() {
//	console.log('HTTP server listening on port 1337');
//
//});


var express = require('express');
const app = express();
app.set('port', 1337);

app.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();
});
app.use(express.static(path.join(__dirname, '')));


const server = app.listen(app.get('port'), function() {
	const port = server.address().port;
	console.log('Listening port ' + port);
});


// WEB SOCKET SERVER
wsServer = new WebSocketServer({
	httpServer: server
});

var wcConnection = null;
wsServer.on('connect', function(webSocketConnection) {
	console.log('WS on connection event ', webSocketConnection);
	wcConnection = webSocketConnection;
	wcConnection.send('Message from server');
});

// WebSocket server
wsServer.on('request', function(request) {
	var connection = request.accept(null, request.origin);
	console.log((new Date()) + ' WS Connection accepted.');
	console.log('WebSocket server created');

	// This is the most important callback for us, we'll handle
	// all messages from users here.
	connection.on('message', function(message) {
		// Process WebSocket message
		console.log('WebSocket server received a message', message);
		wcConnection.send('Server received a message and is responding !');
	});

	connection.on('close', function(connection) {
		// Connection closes
		console.log('WebSocket server closed');
	});
});