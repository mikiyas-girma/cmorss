import React, { useEffect, useState } from 'react';
import Avatar from '../components/gameRoom/Avatar';
import Box from '../components/gameRoom/Box';
import GameEnd from '../components/gameRoom/GameEnd';
import { checkWinner } from '../utils/checkWinner';
import { useSocket } from '../hooks/useSocket';
import { useParams } from 'react-router-dom';

type Player = 'X' | 'O' | null;
type Board = Player[];

const initialBoard: Board = Array(9).fill(null);

const GameRoom: React.FC = () => {
  const initScore = { O: 0, X: 0, draw: 0 };

  const [board, setBoard] = useState<Board>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<string | null>(null);
  const [score, setScore] = useState(initScore);

  const {socket} = useSocket();
  const {id}  = useParams();

  useEffect(() => {
    if (!socket) return;
    socket.emit('joinRoom', id)
    
    return () => {
      socket.off('joinRoom');
    }
  }, [socket]);

  const handleCellClick = (index: number) => {
    if (board[index]) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  // Observe Board and find Winner
  useEffect(() => {
    const findWinner = checkWinner(board);
    if (findWinner) {
      setWinner(findWinner);
      setScore((prev) => ({ ...prev, [findWinner]: prev[findWinner] + 1 }));
    }
  }, [board, currentPlayer]);

  // Handle Reset Game
  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setWinner(null);
  };

  // Determine if game state is at a draw
  const isADraw = !board.includes(null);
  console.log('THE GAME SCORE: ', score);

  // Return JSX For View
  return (
    <div className="flex flex-col items-center justify-center space-y-12">
      <div className="w-full space-y-4">
        <p className="w-3/4 mx-auto py-1.5 bg-gradient-radial from-[#7D977E] to-[#415E45] rounded-xl text-white text-center font-bold">
          GAME STATS
        </p>

        <div className="w-full grid grid-cols-3 place-items-center">
          <Box
            top="Score"
            score={(score.X + '').padStart(2, '0')}
            bottom="Player X"
            color={'orange'}
          />
          <Box
            top="Draw"
            score={(score.draw + '').padStart(2, '0')}
            color="blue"
          />
          <Box
            top="Score"
            score={(score.O + '').padStart(2, '0')}
            bottom="Player O"
            color={'green'}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {board.map((_, index) => (
          <button
            key={index}
            className=" w-24 h-24 md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px]  rounded-xl bg-white text-black active:opacity-80"
            onClick={() => handleCellClick(index)}
          >
            <Avatar player={board[index]} />
          </button>
        ))}
      </div>

      {(isADraw || winner) && (
        <GameEnd
          player={winner!}
          isDraw={isADraw}
          onRestart={() => {
            if (isADraw) setScore((prev) => ({ ...prev, draw: prev.draw + 1 }));
            resetGame();
          }}
          onExit={resetGame}
        />
      )}
    </div>
  );
};

export default GameRoom;
