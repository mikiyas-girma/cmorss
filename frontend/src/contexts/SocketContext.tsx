import React, { createContext, useEffect, useState, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';
import { useGame } from '../hooks/useGame';
import { cellClick } from '../utils/cellClick';

const socketServerUrl = import.meta.env.VITE_SOCKET_SERVER;
const SOCKET_URL = socketServerUrl || 'http://localhost:3000';

interface SocketContextProps {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { setGameState } = useGame();

  useEffect(() => {
    const socketInstance = io(SOCKET_URL);
    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log('connected to server');
    });

    socketInstance.on('roomJoined', (player, avatar) => {
      if (player === socketInstance.id) {
        setGameState((prev) => ({
          ...prev,
          avatar: avatar,
        }));
        console.log('you joined a room ', avatar);
      }
    });

    socketInstance.on('moveMade', ({ position }, player) => {
      if (player != socketInstance.id) {
        cellClick(position, setGameState);
        console.log(
          'Player made a move: position = ',
          position,
          'player = ',
          player
        );
      }
    });

    socketInstance.on('error', (error) => {
      console.error('Error:', error);
    });
    // Clean up on unmount
    return () => {
      socketInstance.off('connect');
      socketInstance.off('roomJoined');
      socketInstance.off('moveMade');
      socketInstance.off('error');
      socketInstance.disconnect();
    };
  }, [setGameState]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
