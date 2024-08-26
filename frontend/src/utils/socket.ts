import { Socket } from "socket.io-client";

export function runSocket(socket : Socket)  {
    socket.on('connect', () => {
        console.log('connected to server');
    });

    socket.on('roomJoined', (roomId, socketId) => {
        if (socket.id === socketId) {
            console.log('you joined a room: roomId = ', roomId);
        }
    });

    socket.on('error', (error) => {
        console.error('Error:', error);
    });

}