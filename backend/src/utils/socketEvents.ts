export enum SocketEvent {
	CONNECTION = 'connection', // Event raised when a user connect to a room
	CREATE_ROOM = 'createRoom', // Event raised when a user create a room
	JOIN_ROOM = 'joinRoom', // Event raised when a user ask for join a room
	ROOM_JOINED = 'roomJoined', // Event emited when a user successfully joins a game room
	ROOM_FULL = 'roomFull', // Event emited when a room is full
	DISCONNECT = 'disconnect', // Event raised when a user disconnect to a room
	DISCONNECTED = 'disconnect', // Event emited when a user disconnect successfully
	MAKE_MOVE = 'makeMove', // Event raised when a user make a move(set his avatar somewhere in the game field) to a room
	MOVE_MADE = 'moveMade', // Event emited when a user move was correctly processed and broadcasted to other player
	SEND_MESSAGE='sendMessage',
	MESSAGE_SENT='messageSent',
	REQUEST_RESTART = 'requestRestart', // Event raised when a user ask for a game restart
	RESTART_REQUESTED = 'restartRequested', // Event emited when a user ask for a game restart
	RESTART_GAME = 'restartGame', // Event raised when a user ask for a game restart
	GAME_RESTARTED = 'gameRestarted', // Event emited when a game is restarted
	DELETE_ROOM = 'deleteRoom', // Event raised when a user stop a room
	ROOM_DELETED = 'roomDeleted', // Event emited when a room is correctly deleted
	ERROR = 'error', // Event emited when an error occurs
}
