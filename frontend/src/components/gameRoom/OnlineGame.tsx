import GameBoard from "./GameBoard";
import { useSocket } from "../../hooks/useSocket";
import { GameState } from "../../types";
import { cellClick } from "../../utils/cellClick";

interface OnlineGameProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  roomId: string | undefined;
}

const OnlineGame = ({ gameState, setGameState, roomId }: OnlineGameProps) => {
  const { socket } = useSocket();
  const { board, currentPlayer, winner, avatar } = gameState;

  const handleCellClick = (position: number) => {
    if (board[position] || winner || avatar !== currentPlayer) return;

    cellClick(position, setGameState);

    socket?.emit("makeMove", { position, roomId });
  };

  return <GameBoard board={board} handleCellClick={handleCellClick} />;
};

export default OnlineGame;
