import { expect, describe, it } from "vitest";

import { Game } from "./game";
import { Board } from "./board";
import { Tile } from "./tile";

describe("game", () => {
  it("should initialize board with 1 tile", () => {
    const board = Game.initializeBoard();
    const numberOfTilesWithValue = board.state.filter(Tile.hasValue).length;
    expect(numberOfTilesWithValue).to.eq(1);
  });

  it("should handle a first move", () => {
    const board = Game.initializeBoard();
    const after = Game.handleMove(board, "ArrowUp");

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(numberOfTilesWithValue).to.eq(2);
  });

  it("know if game has ended", () => {
    const board = new Board([
      new Tile(1, 2),
      new Tile(2, 2),
      new Tile(3, 2),
      new Tile(4, 2),
      new Tile(5, 2),
      new Tile(6, 2),
      new Tile(7, 2),
      new Tile(8, 2),
      new Tile(9, 2),
      new Tile(10, 2),
      new Tile(11, 2),
      new Tile(12, 2),
      new Tile(13, 2),
      new Tile(14, 2),
      new Tile(15, 2),
      new Tile(16, 2),
    ]);

    expect(Game.hasGameEnded(board)).to.eq(true);
  });
});
