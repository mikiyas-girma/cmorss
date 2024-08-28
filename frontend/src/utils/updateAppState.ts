import { AppState, Player } from "../types";

export const updateAIGameScore = (setAppState: React.Dispatch<React.SetStateAction<AppState>>, findWinner: Player) => {
  setAppState((prev) => {
    let { user, ai, draw } = prev.aiGame;
    if (findWinner === "X") {
      user += 1;
    } else if (findWinner === "O") {
      ai += 1;
    } else {
      draw += 1;
    }
    return {
      ...prev,
      aiGame: {
        user: user,
        ai: ai,
        draw: draw,
      },
    };
  });
};
