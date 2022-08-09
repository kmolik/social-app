const { Server } = require('socket.io');
 let io;

 module.exports = {
        init: (httpServer) => {
            io = new Server(httpServer, {
                cors: {
                    origin: '*',
                    methods: ['GET', 'POST', 'PUT', 'DELETE'],
                    allowedHeaders: ['Origin', 'X-Requested-With', 'Content', 'Accept', 'Content-Type', 'Authorization', 'x-access-token'],
                }
            });
            return io;
        },
        getIO: () => {
            if (!io) {
                throw new Error('Socket.io is not initialized!');
            }
            return io;
        }
 }