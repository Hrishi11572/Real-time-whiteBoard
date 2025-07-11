// socket.io server 
const express = require("express"); 
const http = require("http"); 
const cors = require("cors"); 
const { Server } = require("socket.io"); 

const app = express(); 
app.use(cors()); 

const server = http.createServer(app); 
const io = new Server(server, {
    cors: {
        origin: '*' 
    }
});

io.on('connection' , (socket) => {
    console.log('🟢 New client connected:', socket.id);

    socket.on('drawing' , (data) => {
         // Broadcast to all other clients except the sender
         socket.broadcast.emit('drawing' , data); 
    })

    socket.on('disconnect', () => {
        console.log('🔴 Client disconnected:', socket.id);
    });
});

server.listen(3001, () => {
  console.log('✅ Socket.IO server running on http://localhost:3001');
});