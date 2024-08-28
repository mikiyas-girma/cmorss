import React, { useEffect, useState } from 'react';
import Avatar from '../components/gameRoom/Avatar';
import Box from '../components/gameRoom/Box';
import GameEnd from '../components/gameRoom/GameEnd';
import { checkWinner } from '../utils/checkWinner';
import { useSocket } from '../hooks/useSocket';
import { useParams } from 'react-router-dom';
import { useGame } from '../hooks/useGame';
import { Board } from '../types';
import { cellClick } from '../utils/cellClick';

const initialBoard: Board = Array(9).fill(null);

const GameRoom: React.FC = () => {
  const initScore = { O: 0, X: 0, draw: 0 };

  const [score, setScore] = useState(initScore);

  const { gameState, setGameState } = useGame();
  const { board, currentPlayer, winner, avatar } = gameState;

  const { socket } = useSocket();
  const { id } = useParams();

  const handleCellClick = (index: number) => {
    if (board[index] || winner || avatar !== currentPlayer) return;
    cellClick(index, setGameState);
    if (id !== 'friend')
      socket?.emit('makeMove', { position: index, roomId: id });
  };

  // Observe Board and find Winner
  useEffect(() => {
    const findWinner = checkWinner(board);
    if (findWinner) {
      setGameState((prev) => ({ ...prev, winner: findWinner }));
      setScore((prev) => ({ ...prev, [findWinner]: prev[findWinner] + 1 }));
    }
  }, [board, currentPlayer, setGameState]);

  // Handle Reset Game
  const resetGame = () => {
    setGameState((prev) => ({
      ...prev,
      board: initialBoard,
      currentPlayer: 'X',
      winner: null,
    }));
  };

  // Determine if game state is at a draw
  const isADraw = !board.includes(null) && !winner;

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
      <Box
        bottom="Turn"
        score={`${currentPlayer}`}
        color={currentPlayer === 'X' ? 'orange' : 'green'}
      />
      {(isADraw || winner) && (
        <GameEnd
          winner={winner!}
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
