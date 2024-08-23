import { Board } from '../types';
import { checkWinner } from './checkWinner';

//Allow the AI to be beatable
// Difficulty level: 0 (easiest) to 1 (hardest)
const findBestMove = (board: Board, difficultyLevel: number = 1): number => {
  let bestScore = -Infinity;
  let bestMoves: number[] = [];

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = 'O'; // Assuming 'O' is the computer
      const score = minmax(board, 0, false);
      board[i] = null;

      if (score > bestScore) {
        bestScore = score;
        bestMoves = [i];
      } else if (score === bestScore) {
        bestMoves.push(i);
      }
    }
  }
  // Randomly choose between the best move and a random move
  if (Math.random() > difficultyLevel) {
    const availableMoves = board.reduce((acc, cell, index) => {
      if (cell === null) acc.push(index);
      return acc;
    }, [] as number[]);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  } else {
    return bestMoves[Math.floor(Math.random() * bestMoves.length)];
  }
};

/**
 * MinMax Algorithm for calculating Best Move for AI
 */
const minmax = (board: Board, depth: number, isMaximizing: boolean): number => {
  const winner = checkWinner(board);
  if (winner === 'O') return 1;
  if (winner === 'X') return -1;
  if (board.every((cell) => cell !== null)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        const score = minmax(board, depth + 1, false);
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
        const score = minmax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

export { minmax, findBestMove };
