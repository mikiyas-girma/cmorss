import React, { useEffect, useState } from 'react';
import Avatar from '../components/gameRoom/Avatar';
import Box from '../components/gameRoom/Box';
import GameEnd from '../components/gameRoom/GameEnd';
import { Board, Player } from '../types';
import { findBestMove } from '../utils/minMaxAlgorithm';
import { checkWinner } from '../utils/checkWinner';

const initialBoard: Board = Array(9).fill(null);

const AIGameBoard: React.FC = () => {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<string | null>(null);

  const handleCellClick = (index: number) => {
    if (board[index]) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');

    const findWinner = checkWinner(board);
    if (findWinner) {
      setWinner(findWinner);
      return;
    }
  };

  useEffect(() => {
    const findWinner = checkWinner(board);
    if (findWinner) {
      setWinner(findWinner);
    }
  }, [board, currentPlayer]);

  const handleComputerMove = (board: Board) => {
    const bestMove = findBestMove(board);
    handleCellClick(bestMove);
  };

  // Set up useEffect that triggers finding Computer Move
  useEffect(() => {
    if (currentPlayer === 'O') {
      handleComputerMove(board);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer, board]);

  // Handle Reset Game
  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12">
      <div className="w-full space-y-4">
        <p className="w-3/4 mx-auto py-1.5 bg-gradient-radial from-[#7D977E] to-[#415E45] rounded-xl text-white text-center font-bold">
          GAME STATS
        </p>

        <div className="w-full grid grid-cols-3 place-items-center">
          <Box
            top="Score"
            score="00"
            bottom="Player X"
            color={currentPlayer == 'X' ? 'orange' : 'green'}
          />
          <Box top="Draw" score="00" color="blue" />
          <Box
            top="Score"
            score="00"
            bottom="Player O"
            color={currentPlayer == 'O' ? 'orange' : 'green'}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {board.map((_, index) => (
          <button
            key={index}
            className="w-28 h-28 rounded-xl bg-white text-black"
            onClick={() => handleCellClick(index)}
          >
            <Avatar player={board[index]} />
          </button>
        ))}
      </div>

      {(!board.includes(null) || winner) && (
        <GameEnd
          player={winner!}
          isDraw={!board.includes(null)}
          onRestart={resetGame}
          onExit={resetGame}
        />
      )}
    </div>
  );
};

export default AIGameBoard;
