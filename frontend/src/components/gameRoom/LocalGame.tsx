import React from "react";
import GameBoard from "./GameBoard";
import { cellClick } from "../../utils/cellClick";
import { GameState } from "../../types";

interface LocalGameProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const LocalGame = ({ gameState, setGameState }: LocalGameProps) => {
  const { board, winner } = gameState;

  const handleCellClick = (index: number) => {
    if (board[index] || winner) return;
    cellClick(index, setGameState);
  };

  return <GameBoard board={board} handleCellClick={handleCellClick} />;
};

export default LocalGame;
