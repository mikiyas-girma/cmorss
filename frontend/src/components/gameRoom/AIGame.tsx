import { useEffect, useState } from "react";
import { GameState } from "../../types";
import { findBestMove } from "../../utils/minMaxAlgorithm";
import { cellClick } from "../../utils/cellClick";
import GameBoard from "./GameBoard";

interface AIGameProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}
const AIGame = ({ gameState, setGameState }: AIGameProps) => {
  const { board, winner } = gameState;
  const [isAITurn, setIsAITurn] = useState<boolean>(false);

  const handleCellClick = (index: number) => {
    if (board[index] || winner || isAITurn) return;

    cellClick(index, setGameState);
    setIsAITurn(true);
  };

  // handle ai turn
  useEffect(() => {
    const boardFull = !board.includes(null);
    boardFull && setIsAITurn(false);
    if (isAITurn && !winner && !boardFull) {
      const makeAIMove = () => {
        const bestMove = findBestMove(board);
        if (bestMove !== null) {
          cellClick(bestMove, setGameState);
        }
        setIsAITurn(false);
      };

      const aiMoveTimeout = setTimeout(makeAIMove, 500);

      return () => clearTimeout(aiMoveTimeout);
    }
  }, [isAITurn, board, winner, setGameState]);

  return <GameBoard board={board} handleCellClick={handleCellClick} />;
};

export default AIGame;
