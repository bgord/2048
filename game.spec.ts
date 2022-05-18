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

    expect(numberOfTilesWithValue).to.eq(1);
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

  it("should handle ArrowUp basic scenario", () => {
    const board = new Board([
      new Tile(1, 2),
      new Tile(2),
      new Tile(3),
      new Tile(4),
      new Tile(5, 2),
      new Tile(6),
      new Tile(7),
      new Tile(8),
      new Tile(9),
      new Tile(10),
      new Tile(11),
      new Tile(12),
      new Tile(13),
      new Tile(14),
      new Tile(15),
      new Tile(16),
    ]);

    const after = Game.handleMove(board, "ArrowUp");

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[0].value).to.eq(4);
    expect(after.state[1].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(1);
  });

  it("should handle ArrowUp 3 in a column scenario", () => {
    const board = new Board([
      new Tile(1),
      new Tile(2),
      new Tile(3),
      new Tile(4, 2),
      new Tile(5),
      new Tile(6),
      new Tile(7),
      new Tile(8, 2),
      new Tile(9),
      new Tile(10),
      new Tile(11),
      new Tile(12, 2),
      new Tile(13),
      new Tile(14),
      new Tile(15),
      new Tile(16),
    ]);

    const after = Game.handleMove(board, "ArrowUp");

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(4);
    expect(after.state[7].value).to.eq(2);
    expect(after.state[11].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(2);
  });

  it("should handle ArrowUp distant scenario 1", () => {
    const board = new Board([
      new Tile(1),
      new Tile(2),
      new Tile(3),
      new Tile(4, 2),
      new Tile(5),
      new Tile(6),
      new Tile(7),
      new Tile(8),
      new Tile(9),
      new Tile(10),
      new Tile(11),
      new Tile(12, 2),
      new Tile(13),
      new Tile(14),
      new Tile(15),
      new Tile(16),
    ]);

    const after = Game.handleMove(board, "ArrowUp");

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(4);
    expect(after.state[11].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(1);
  });

  it("should handle ArrowUp distant scenario 2", () => {
    const board = new Board([
      new Tile(1),
      new Tile(2),
      new Tile(3),
      new Tile(4, 2),
      new Tile(5),
      new Tile(6),
      new Tile(7),
      new Tile(8),
      new Tile(9),
      new Tile(10),
      new Tile(11),
      new Tile(12),
      new Tile(13),
      new Tile(14),
      new Tile(15),
      new Tile(16, 2),
    ]);

    const after = Game.handleMove(board, "ArrowUp");

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(4);
    expect(after.state[15].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(1);
  });

  it("should handle ArrowUp double merging", () => {
    const board = new Board([
      new Tile(1),
      new Tile(2),
      new Tile(3),
      new Tile(4, 2),
      new Tile(5),
      new Tile(6),
      new Tile(7),
      new Tile(8, 2),
      new Tile(9),
      new Tile(10),
      new Tile(11),
      new Tile(12, 2),
      new Tile(13),
      new Tile(14),
      new Tile(15),
      new Tile(16, 2),
    ]);

    const after = Game.handleMove(board, "ArrowUp");

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(4);
    expect(after.state[7].value).to.eq(4);
    expect(after.state[11].value).to.eq(null);
    expect(after.state[15].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(2);
  });

  it("should handle ArrowUp non-moveable scenario 1", () => {
    const board = new Board([
      new Tile(1),
      new Tile(2),
      new Tile(3),
      new Tile(4, 2),
      new Tile(5),
      new Tile(6),
      new Tile(7),
      new Tile(8, 4),
      new Tile(9),
      new Tile(10),
      new Tile(11),
      new Tile(12, 2),
      new Tile(13),
      new Tile(14),
      new Tile(15),
      new Tile(16),
    ]);

    const after = Game.handleMove(board, "ArrowUp");

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(2);
    expect(after.state[7].value).to.eq(4);
    expect(after.state[11].value).to.eq(2);
    expect(numberOfTilesWithValue).to.eq(3);
  });

  it("should handle ArrowUp non-moveable scenario 2", () => {
    const board = new Board([
      new Tile(1),
      new Tile(2),
      new Tile(3),
      new Tile(4, 2),
      new Tile(5),
      new Tile(6),
      new Tile(7),
      new Tile(8),
      new Tile(9),
      new Tile(10),
      new Tile(11),
      new Tile(12, 8),
      new Tile(13),
      new Tile(14),
      new Tile(15),
      new Tile(16, 2),
    ]);

    const after = Game.handleMove(board, "ArrowUp");

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(2);
    expect(after.state[7].value).to.eq(8);
    expect(after.state[11].value).to.eq(2);
    expect(after.state[15].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(3);
  });

  it("should handle ArrowUp non-moveable scenario 3", () => {
    const board = new Board([
      new Tile(1),
      new Tile(2),
      new Tile(3),
      new Tile(4),
      new Tile(5),
      new Tile(6),
      new Tile(7),
      new Tile(8, 2),
      new Tile(9),
      new Tile(10),
      new Tile(11),
      new Tile(12, 8),
      new Tile(13),
      new Tile(14),
      new Tile(15),
      new Tile(16, 2),
    ]);

    const after = Game.handleMove(board, "ArrowUp");

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(2);
    expect(after.state[7].value).to.eq(8);
    expect(after.state[11].value).to.eq(2);
    expect(after.state[15].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(3);
  });

  it.only("should handle ArrowUp movement alone 1", () => {
    const board = new Board([
      new Tile(1),
      new Tile(2),
      new Tile(3),
      new Tile(4),
      new Tile(5),
      new Tile(6),
      new Tile(7),
      new Tile(8),
      new Tile(9),
      new Tile(10),
      new Tile(11),
      new Tile(12, 8),
      new Tile(13),
      new Tile(14),
      new Tile(15),
      new Tile(16),
    ]);

    const after = Game.handleMove(board, "ArrowUp");

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(8);
    expect(after.state[7].value).to.eq(null);
    expect(after.state[11].value).to.eq(null);
    expect(after.state[15].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(1);
  });

  it.only("should handle ArrowUp movement alone 2", () => {
    const board = new Board([
      new Tile(1),
      new Tile(2),
      new Tile(3),
      new Tile(4),
      new Tile(5),
      new Tile(6),
      new Tile(7),
      new Tile(8),
      new Tile(9),
      new Tile(10),
      new Tile(11),
      new Tile(12),
      new Tile(13),
      new Tile(14),
      new Tile(15),
      new Tile(16, 8),
    ]);

    const after = Game.handleMove(board, "ArrowUp");

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(8);
    expect(after.state[7].value).to.eq(null);
    expect(after.state[11].value).to.eq(null);
    expect(after.state[15].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(1);
  });

  it.only("should handle ArrowUp movement alone 3", () => {
    const board = new Board([
      new Tile(1),
      new Tile(2),
      new Tile(3),
      new Tile(4, 4),
      new Tile(5),
      new Tile(6),
      new Tile(7),
      new Tile(8),
      new Tile(9),
      new Tile(10),
      new Tile(11),
      new Tile(12),
      new Tile(13),
      new Tile(14),
      new Tile(15),
      new Tile(16, 2),
    ]);

    const after = Game.handleMove(board, "ArrowUp");

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(4);
    expect(after.state[7].value).to.eq(2);
    expect(after.state[11].value).to.eq(null);
    expect(after.state[15].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(2);
  });
});
