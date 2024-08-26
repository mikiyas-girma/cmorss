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
  const [winner, setWinner] = useState<'X' | 'O' | 'draw' | null>(null);

  // Added state to track the score for Player X, Player O, and draws
  const [score, setScore] = useState({ X: 0, O: 0, draw: 0 });

  const [isAITurn, setIsAITurn] = useState<boolean>(false);

  const handlePlayerMove = (index: number) => {
    if (board[index] || winner || isAITurn) return;

    const updatedBoard = [...board];
    updatedBoard[index] = 'X';
    setBoard(updatedBoard);

    // Check for winner after player move and update score if necessary
    checkForWinner(updatedBoard, 'X');

    setIsAITurn(true);
  };

  useEffect(() => {
    if (isAITurn && !winner) {
      const makeAIMove = () => {
        const bestMove = findBestMove(board);
        if (bestMove !== null) {
          const updatedBoard = [...board];
          updatedBoard[bestMove] = 'O';
          setBoard(updatedBoard);

          // Check for winner after AI move and update score if necessary
          checkForWinner(updatedBoard, 'O');
        }
        setIsAITurn(false);
      };

      const aiMoveTimeout = setTimeout(makeAIMove, 500);

      return () => clearTimeout(aiMoveTimeout);
    }
  }, [isAITurn, board, winner]);

  // Modified checkForWinner to handle 'draw' scenario and update the score
  const checkForWinner = (currentBoard: Board, currentPlayer: Player) => {
    const gameResult = checkWinner(currentBoard);

    if (gameResult) {
      setWinner(gameResult);

      // Update score for the winning player or draw
      setScore((prevScore) => ({
        ...prevScore,
        [gameResult]: prevScore[gameResult] + 1, // Increment score for the winner (or draw)
      }));
    } else if (!currentBoard.includes(null)) {
      setWinner('draw');
      setScore((prevScore) => ({
        ...prevScore,
        draw: prevScore.draw + 1, // Increment score for a draw
      }));
    }
  };

  // Reset the board, winner, and AI turn, but keep the score
  const resetGame = () => {
    setBoard(initialBoard);
    setWinner(null);
    setIsAITurn(false);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      <div className="w-full space-y-4">
        <p className="w-3/4 mx-auto py-1.5 bg-gradient-radial from-[#7D977E] to-[#415E45] rounded-xl text-white text-center font-bold">
          GAME STATS
        </p>

        <div className="w-full grid grid-cols-3 place-items-center">
          {/* Display the updated score for Player X, Draws, and Player O */}
          <Box top="Score" score={score.X.toString().padStart(2, '0')} bottom="Player X" color="orange" />
          <Box top="Draw" score={score.draw.toString().padStart(2, '0')} color="blue" />
          <Box top="Score" score={score.O.toString().padStart(2, '0')} bottom="Player O" color="green" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <button
            key={index}
            className="w-24 h-24 md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px] rounded-xl bg-white text-black active:opacity-80"
            onClick={() => handlePlayerMove(index)}
            disabled={!!cell || winner !== null || isAITurn}
          >
            <Avatar player={cell} />
          </button>
        ))}
      </div>

      {/* Display the GameEnd component when there's a winner or draw */}
      {winner && (
        <GameEnd
          player={winner}
          isDraw={winner === 'draw'}
          onRestart={resetGame}
          onExit={resetGame}
        />
      )}
    </div>
  );
};

export default AIGameBoard;
