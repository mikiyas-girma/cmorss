import { GameState } from "../types";

const playAvatarSound = () => {
  new Audio("/sound/avatar-sound.wav")
    .play()
    .catch((error) => console.error("Cannot play avatar sound effect:", error));
};

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
  playAvatarSound();
};
