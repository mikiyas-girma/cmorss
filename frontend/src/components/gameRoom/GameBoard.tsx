import { Player } from '../../types';
import Avatar from './Avatar';

interface GameBoardProps {
  board: Player[];
  handleCellClick: (index: number) => void;
}

const GameBoard = ({ board, handleCellClick }: GameBoardProps) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {board.map((_, index) => (
        <button
          key={index}
          className=" w-24 h-24 sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] rounded-xl bg-white text-black active:opacity-80"
          onClick={() => handleCellClick(index)}
        >
          <Avatar player={board[index]} />
        </button>
      ))}
    </div>
  );
};

export default GameBoard;
