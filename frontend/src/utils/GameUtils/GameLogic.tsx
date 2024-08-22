import { GameState, Player, SquareValue } from './GameParams';

// Initialize the game state
export const initializeGameState = (): GameState => ({
  board: Array(9).fill(null),
  currentPlayer: 'X', //sets a player to X
  winner: null,
  isDraw: false,
});

// Handle player move
export const handlePlayerMove = (state: GameState, index: number): GameState => {
  if (state.winner || state.isDraw || state.board[index] !== null) {
    return state; // Move is invalid
  }

  const newBoard = [...state.board]; 
  newBoard[index] = state.currentPlayer;  //update the board

  const winner = checkWinner(newBoard);
  const isDraw = !winner && newBoard.every(cell => cell !== null);

  return {
    ...state,
    board: newBoard,
    currentPlayer: winner ? state.currentPlayer : togglePlayer(state.currentPlayer),
    winner,
    isDraw,
  };
};

// Toggle player
const togglePlayer = (player: Player): Player => (player === 'X' ? 'O' : 'X');

// Check for a winner
export const checkWinner = (board: SquareValue[]): Player | null => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
};
