const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Basic route handler.
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Assign callbacks to 'connection' and 'disconnect' socket events.
io.on('connection', (socket) => {
    console.log('a user connected.');

    socket.on('disconnect', () => {
        console.log('user disconnected.');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);

        // If we want to send a message to everyone except for the emitting socket...
        //...we have the broadcast flag for emitting from that socket:
        // socket.broadcast.emit(msg);
        // Or this will send the message for everyone including the sender:
        io.emit('chat message', msg);
    });
});

// Run the server.
server.listen(3000, () => {
    console.log('server is listening port 3000...');
});
