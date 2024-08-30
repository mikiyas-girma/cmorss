import http from "http";
import { Server, Socket } from "socket.io";
import { SocketEvent } from "./utils/socketEvents.js";

type Message = {
  name: string;
  text: string;
  time: string;
};

let cachedIo: Server | null = null;
const roomSize = 2;
const waitingQueue: string[] = [];

function getRoom(roomId: string) {
  return cachedIo?.sockets.adapter.rooms.get(roomId);
}

async function joinSocketToRoom(
  socket: Socket,
  roomId: string,
  avatar: string
) {
  try {
    await socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
    cachedIo?.to(roomId).emit(SocketEvent.ROOM_JOINED, socket.id, avatar);
    const room = getRoom(roomId);
    if (room && room.size === roomSize) {
      console.log(`Room ${roomId} is full.`);
      cachedIo?.to(roomId).emit(SocketEvent.ROOM_FULL, Array.from(room));
    }
  } catch (error) {
    console.error(`Invalid room id: ${roomId}`);
    socket.emit(SocketEvent.ERROR, { error });
  }
}

function canJoinRoom(socket: Socket, roomId: string) {
  const room = getRoom(roomId);
  if (room && room.size < roomSize) {
    return true;
  } else {
    console.error(`Room ${roomId} is full.`);
    socket.emit(SocketEvent.ERROR, { message: "Room is full." });
    return false;
  }
}

function checkMovePosition(position: number) {
  return position >= 0 && position < 9;
}

function initSocketIo(
  httpServerInstance: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >
) {
  if (cachedIo) {
    return cachedIo;
  } else {
    cachedIo = new Server(httpServerInstance, {
      cors: {
        origin: process.env.CORS_ORIGIN || "http://localhost:5173",
      },
    });

    cachedIo.on(SocketEvent.CONNECTION, (socket) => {
      console.log("A user connected");
      //TODO: Manage user session

      socket.on(SocketEvent.CREATE_ROOM, async (roomId: string) => {
        const roomExists = !!getRoom(roomId);

        if (roomExists) {
          console.error(`Room ${roomId} already exist.`);
          socket.emit(SocketEvent.ERROR, { message: "Room already exist." });
        } else {
          joinSocketToRoom(socket, roomId, "X");
        }
      });

      socket.on(SocketEvent.JOIN_ROOM, async (roomId: string, avatar: string) => {
        const roomExists = !!getRoom(roomId);

        if (!roomExists) {
          console.error(`Room ${roomId} does not exist.`);
          socket.emit(SocketEvent.ERROR, { message: "Room does not exist." });
        } else {
          canJoinRoom(socket, roomId) && joinSocketToRoom(socket, roomId, "O");
        }
      });

      socket.on(
        SocketEvent.MAKE_MOVE,
        (moveData: { position: number; roomId: string }) => {
          if (
            checkMovePosition(moveData.position) &&
            socket.rooms.has(moveData.roomId)
          ) {
            const emited = cachedIo
              ?.to(moveData.roomId)
              .emit(SocketEvent.MOVE_MADE, moveData, socket.id);

            if (!emited) {
              console.error(`Failled to emit event for user ${socket.id}`);
              socket.emit(SocketEvent.ERROR, {
                message: "Move made not shared.",
              });
            }
          }
        }
      );

      socket.on(
        SocketEvent.SEND_MESSAGE,
        (data: { message: Message; roomId: string }) => {
          console.log("MESSAGE");
          if (!!getRoom(data.roomId)) {
            const emited = cachedIo
              ?.to(data.roomId)
              .emit(SocketEvent.MESSAGE_SENT, data.message, socket.id);

            if (!emited) {
              console.error(`Failled to emit event for user ${socket.id}`);
              socket.emit(SocketEvent.ERROR, {
                message: "Unable to send message.",
              });
            }
          }
        }
      );

      socket.on(SocketEvent.REQUEST_RESTART, (roomId: string) => {
        console.log("Restart requested by", socket.id);
        if (socket.rooms.has(roomId)) {
          socket.to(roomId).emit(SocketEvent.RESTART_REQUESTED, socket.id);
        } else {
          console.error(`User ${socket.id} is not in room ${roomId}`);
          socket.emit(SocketEvent.ERROR, {
            message: "You are not in the room.",
          });
        }
      });

      socket.on(SocketEvent.RESTART_GAME, (roomId: string) => {
        console.log("Game restarted", roomId);
        if (socket.rooms.has(roomId)) {
          cachedIo?.to(roomId).emit(SocketEvent.GAME_RESTARTED);
        } else {
          console.error(`User ${socket.id} is not in room ${roomId}`);
          socket.emit(SocketEvent.ERROR, {
            message: "You are not in the room.",
          });
        }
      });

      socket.on(SocketEvent.FIND_MATCH, () => {
        if (waitingQueue.length > 0) {
          const opponentSocketId = waitingQueue.shift(); // Get the first waiting player
          const roomId = socket.id + "~" + opponentSocketId;

          if (opponentSocketId) {
            // Notify both players that they have been matched
            console.log("Match found", roomId);
            socket.emit(SocketEvent.MATCH_FOUND, { roomId, opponent: opponentSocketId });
            cachedIo
              ?.to(opponentSocketId)
              .emit(SocketEvent.MATCH_FOUND, { roomId, opponent: socket.id });
          }
        } else {
          // If no players are waiting, add the current player to the queue
          waitingQueue.push(socket.id);
        }
      });

      socket.on("disconnect", () => {
        console.log(socket.id, "has disconnected");
        removeFromQueue(waitingQueue, socket.id);
        cachedIo?.emit("disconnected", socket.id);
      });

      socket.on(SocketEvent.DELETE_ROOM, (roomId: string) => {
        const room = getRoom(roomId);
        removeFromQueue(waitingQueue, socket.id);
        if (room) {
          cachedIo
            ?.to(roomId)
            .emit("roomDeleted", { message: "The room has been deleted." });
          cachedIo?.sockets.adapter.rooms.delete(roomId);
          console.log(`Room ${roomId} deleted`);
        } else {
          console.error(`Room ${roomId} does not exist.`);
          socket.emit("error", { message: "Room does not exist." });
        }
      });
    });
    return cachedIo;
  }
}

function removeFromQueue(queue: string[], id: string) {
  const index = queue.indexOf(id);
  if (index > -1) {
    queue.splice(index, 1);
  }
}

export { initSocketIo };
