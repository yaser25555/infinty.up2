const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// إعداد ملفات الثابتة
app.use(express.static('.'));

io.on('connection', (socket) => {
    console.log('اتصال جديد:', socket.id);
    
    socket.on('disconnect', () => {
        console.log('انقطع الاتصال:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('الخادم يعمل على http://localhost:3000');
});


function nextTurn() {
    currentTurn = (currentTurn + 1) % playerQueue.length;
    io.emit('turnUpdate', playerQueue[currentTurn]);
}

// عند اتصال لاعب جديد
socket.on('join', () => {
    playerQueue.push(socket.id);
    if (playerQueue.length === 1) {
        nextTurn();
    }
});