import http from 'http';
import { Server } from 'socket.io'
import { SocketEvent } from './utils/socketEvents.js';

let cachedIo: Server | null = null;

// async function joinSocketToRoom (socket: Socket, roomId: string) {
// 	try {
// 		await socket.join(roomId);
// 		console.log(`User ${socket.id} joined room ${roomId}`);
// 		cachedIo.emit(SocketEvent.ROOM_JOINED);
// 	} catch (error) {
// 		console.error(`Invalid room id: ${roomId}`);
// 		socket.emit(SocketEvent.ERROR, { error });
// 	}
// }

// function getRoom(roomId: string) {
// 	return !!cachedIo.sockets.adapter.rooms[roomId];
// }

// function checkMovePosition(position: [number, number]) {
// 	return position[0] > 0 && position[0] <= 3 && position[1] > 0 && position[1] <= 3
// }

function initSocketIo(httpServerInstance: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) {
	if (cachedIo) {
		return cachedIo;
	} else {
		cachedIo = new Server(httpServerInstance, {
			cors: {
				origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
			}
		});

		cachedIo.on(SocketEvent.CONNECTION, (socket) => {
			console.log('A user connected');
			//TODO: Manage user session

			// socket.on(SocketEvent.CREATE_ROOM, async (roomId: string) => {
			// 	const roomExists = getRoom(roomId);

			// 	if (roomExists) {
			// 		console.error(`Room ${roomId} already exist.`);
			// 		socket.emit(SocketEvent.ERROR, { message: 'Room already exist.' });
			// 	} else {
			// 		joinSocketToRoom(socket, roomId);
			// 	}
			// });

			// socket.on(SocketEvent.JOIN_ROOM, async (roomId: string) => {
			// 	const roomExists = getRoom(roomId);

			// 	if (!roomExists) {
			// 		console.error(`Room ${roomId} does not exist.`);
			// 		socket.emit(SocketEvent.ERROR, { message: 'Room does not exist.' });
			// 	} else {
			// 		joinSocketToRoom(socket, roomId);
			// 	}
			// });

			// socket.on(SocketEvent.MAKE_MOVE, (moveData: {
			// 	position: [number, number],
			// 	roomId: string
			// }) => {
			// 	if (checkMovePosition(moveData.position) && socket.rooms.has(moveData.roomId)) {
			// 		const emited = cachedIo.to(moveData.roomId).emit(SocketEvent.MOVE_MADE, moveData);

			// 		if (!emited) {
			// 				console.error(`Failled to emit event for user ${socket.id}`);
			// 				socket.emit(SocketEvent.ERROR, { message: 'Move made not shared.' });
			// 		}
			// 	}
			// });

			socket.on(SocketEvent.DISCONNECT, () => {
				socket.disconnect();
				console.log('User disconnected');
			});

			// socket.on(SocketEvent.DELETE_ROOM, (roomId: string) => {
			// 	const room = getRoom(roomId);

			// 	if (room) {
			// 			cachedIo.sockets.adapter.rooms.delete(roomId);

			// 			console.log(`Room ${roomId} deleted`);
			// 			cachedIo.to(roomId).emit('roomDeleted', { message: 'The room has been deleted.' });
			// 	} else {
			// 			console.error(`Room ${roomId} does not exist.`);
			// 			socket.emit('error', { message: 'Room does not exist.' });
			// 	}
			// });
		});
		return cachedIo;
	}
}

export { initSocketIo };
