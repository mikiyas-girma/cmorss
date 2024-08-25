export enum SocketEvent {
	CONNECTION = 'connection', // Event raised when a user connect to a room
	CREATE_ROOM = 'createRoom', // Event raised when a user create a room
	JOIN_ROOM = 'joinRoom', // Event raised when a user ask for join a room
	ROOM_JOINED = 'roomJoined', // Event emited when a user successfully joins a game room
	DISCONNECT = 'disconnect', // Event raised when a user disconnect to a room
	DISCONNECTED = 'disconnect', // Event emited when a user disconnect successfully
	MAKE_MOVE = 'makeMove', // Event raised when a user make a move(set his avatar somewhere in the game field) to a room
	MOVE_MADE = 'moveMade', // Event emited when a user move was correctly processed and broadcasted to other player
	DELETE_ROOM = 'deleteRoom', // Event raised when a user stop a room
	ROOM_DELETED = 'roomDeleted', // Event emited when a room is correctly deleted
	ERROR = 'deleteRoom', // Event emited when an error occurs
}