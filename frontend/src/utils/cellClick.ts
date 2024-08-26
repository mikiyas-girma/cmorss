import { Board, Player } from "../types";

interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  avatar: Player;
}

export const cellClick = (
  position: number,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
) => {

  setGameState((prev) => {
    const newBoard = [...prev.board];
    newBoard[position] = prev.currentPlayer;
    console.log(prev);

    return {
      ...prev,
      board: newBoard,
      currentPlayer: prev.currentPlayer === "X" ? "O" : "X",
    };
  });
};
