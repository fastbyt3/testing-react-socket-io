const express = require("express");
const { createServer } = require("node:http");
const path = require('path');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3001;

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api/hi", (req, res) => {
	res.json({ message: "Hello from server!" });
});

// handle routes other than ones specified above
app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

io.on('connection', (socket) => {
	console.log('a user connected');
	socket.on('chat', (msg) => {
		console.log('[!] Message recv: ', msg);
	});
	// Emit from server -> clinet
	setInterval(() => {
		socket.emit("server", "pinging 1111");
	}, 3000);

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

server.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
