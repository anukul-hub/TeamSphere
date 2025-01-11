
import React, { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

// Define the type for socket, including optional properties
let socket: Socket;

const App: React.FC = () => {
  useEffect(() => {
    // Initialize the socket connection to the server
    socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('Connected to server with ID:', socket.id);
      socket.emit('message', 'Hello from TeamSphere client!');
    });

    // Listen for messages from the server
    socket.on('message', (data: string) => {
      console.log('Message from server:', data);
    });

    // Clean up the connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <h1>Welcome to TeamSphere</h1>
      <p>Connected to the server: Check your console for messages!</p>
    </div>
  );
};

export default App;

