/**
 * Creating a function that picks random number to pick from
 * To allow for a fair and winnable game
 */

import { Board } from "../types";

function getRandomEmptyIndex(board: Board): number | null {
  const emptyIndices = board.reduce((acc, cell, index) => {
    if (cell === null) {
      acc.push(index);
    }
    return acc;
  }, [] as number[]);

  if (emptyIndices.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * emptyIndices.length);
  return emptyIndices[randomIndex];
}

export default getRandomEmptyIndex;
