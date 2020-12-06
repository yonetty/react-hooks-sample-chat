const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('A client connected.');
    socket.on('send', (payload) => {
        console.log(payload);
        socket.broadcast.emit('broadcast', payload);
    });
    socket.on('disconnect', () => {
        console.log('Conenction closed.');
    });
});

server.listen(3001, () => {
    console.log('Listening..');
});