import React, { useState } from 'react';
import Square from './Square';
import { initializeGameState, handlePlayerMove, checkWinner } from '../../utils/GameUtils/gameLogic';
import { GameState, Player } from '../../utils/GameUtils/GameParams';


const MinimaxGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(initializeGameState);

  const handleClick = (index: number) => {
    if (!gameState.winner && !gameState.isDraw && !gameState.board[index]) {
      const playerMoveState = handlePlayerMove(gameState, index);
      setGameState(playerMoveState);

      if (!playerMoveState.winner && !playerMoveState.isDraw) {
        const computerMoveState = handleComputerMove(playerMoveState);
        setGameState(computerMoveState);
      }
    }
  };

  const handleComputerMove = (state: GameState): GameState => {
    const bestMove = findBestMove(state.board);
    return handlePlayerMove(state, bestMove);
  };

  const findBestMove = (board: (Player | null)[]): number => {
    let bestScore = -Infinity;
    let move = -1;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'O'; // Assuming 'O' is the computer
        let score = minimax(board, 0, false);
        board[i] = null;

        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    return move;
  };

  const minimax = (board: (Player | null)[], depth: number, isMaximizing: boolean): number => {
    const winner = checkWinner(board);
    if (winner === 'O') return 1;
    if (winner === 'X') return -1;
    if (board.every(cell => cell !== null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'O';
          const score = minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'X';
          const score = minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const resetGame = () => {
    setGameState(initializeGameState());
  };


  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {gameState.board.map((value, index) => (
          <Square key={index} value={value} onClick={() => handleClick(index)} />
        ))}
      </div>
      {gameState.winner && <p>Winner: {gameState.winner}</p>}
      {gameState.isDraw && <p>It's a Draw! </p>}
      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={resetGame}
      >
        Reset Game
      </button>

    </div>
    
  );
};

export default MinimaxGame;
