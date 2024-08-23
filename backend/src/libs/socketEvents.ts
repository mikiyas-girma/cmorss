enum SocketEvent {
    CONNECTION = 'connection', // Event raised when a user connect to a room
    ROOM_JOINED = 'joinRoom', // Event raised when a user successfully joins a game room
    DISCONNECT = 'disconnect', // Event raised when a user disconnect to a room
    MAKE_MOVE = 'makeMove', // Event raised when a user make a move(set his avatar somewhere in the game field) to a room
    MOVE_MADE = 'moveMade', // Event raised when a user a move was correctly processed and broadcasted to other player
}