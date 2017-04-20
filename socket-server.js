const io = require('socket.io');


    const socketServer = io(server);
    const connections = [];

    socketServer.on('connection', socket => {
        connections.push(socket);

    socket.on('message', data => {
        connections.forEach(connectedSocket => {
            if (connectedSocket !== socket) {
                connectedSocket.emit('message', data);
            }
        });
    });

    socket.on('disconnect', () => {
        const index = connections.indexOf(socket);
        connections.splice(index, 1);
      });
    });


module.exports = socket-server
