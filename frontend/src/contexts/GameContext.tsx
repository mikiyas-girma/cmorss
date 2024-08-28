import React, { createContext, ReactNode, useState } from "react";
import { Board, Player } from "../types";

interface GameState {
  board: Board;
  currentPlayer: Player;
  avatar: Player
  winner: Player;
}

interface GameContextProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export const GameContext = createContext<GameContextProps | undefined>(
  undefined
);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    avatar: null,
    winner: null,
  });

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
};
