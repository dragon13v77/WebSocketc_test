var socket = null;

var openSocket = function() {
	console.log('Start opening web socket');

	socket = new WebSocket('ws://localhost:1337');

// Show a connected message when the WebSocket is opened.
	socket.onopen = function(event) {
		console.log('WebSocket is connected.');
	};

	socket.onmessage = function(event) {
		console.debug("WebSocket message received:", event.data);
	};
};

var sendMessageToServer = function() {
	if (socket) {
		socket.send('Message sent from client'); // Sends data to server.
	}
}