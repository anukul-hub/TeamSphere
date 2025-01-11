const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',  // Vite default port
    methods: ['GET', 'POST']
  }
});

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  // Basic message event
  socket.on('message', (data) => {
    console.log('Message received:', data);
    socket.broadcast.emit('message', data);
  });

  // Disconnection event
  socket.on('disconnect', () => {
    console.log('A user disconnected', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
