import { expect, describe, it } from "vitest";

import { Game, Actions } from "./game";
import { Board } from "./board";
import { Tile } from "./tile";

describe("game", () => {
  it("should initialize board with 1 tile", () => {
    const { board } = Game.initialize();
    const numberOfTilesWithValue = board.state.filter(Tile.hasValue).length;

    expect(numberOfTilesWithValue).to.eq(1);
  });

  it("should handle a first move", () => {
    const { board } = Game.initialize();
    const after = Game._performAction(board, Actions.ArrowUp);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(numberOfTilesWithValue).to.eq(1);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowUp basic scenario", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0, 2), new Tile(1), new Tile(2), new Tile(3),
      new Tile(4, 2), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowUp);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[0].value).to.eq(4);
    expect(after.state[1].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(1);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowUp 3 in a column scenario", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3, 2),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7, 2),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11, 2),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowUp);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(4);
    expect(after.state[7].value).to.eq(2);
    expect(after.state[11].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(2);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowUp distant scenario 1", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3, 2),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11, 2),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowUp);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(4);
    expect(after.state[11].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(1);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowUp distant scenario 2", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3, 2),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15, 2),
    ]);

    const after = Game._performAction(board, Actions.ArrowUp);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(4);
    expect(after.state[15].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(1);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowUp double merging", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3, 2),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7, 2),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11, 2),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15, 2),
    ]);

    const after = Game._performAction(board, Actions.ArrowUp);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(4);
    expect(after.state[7].value).to.eq(4);
    expect(after.state[11].value).to.eq(null);
    expect(after.state[15].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(2);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowUp non-moveable scenario 1", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3, 2),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7, 4),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11, 2),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowUp);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(2);
    expect(after.state[7].value).to.eq(4);
    expect(after.state[11].value).to.eq(2);
    expect(numberOfTilesWithValue).to.eq(3);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowUp non-moveable scenario 2", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3, 2),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11, 8),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15, 2),
    ]);

    const after = Game._performAction(board, Actions.ArrowUp);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(2);
    expect(after.state[7].value).to.eq(8);
    expect(after.state[11].value).to.eq(2);
    expect(after.state[15].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(3);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowUp non-moveable scenario 3", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7, 2),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11, 8),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15, 2),
    ]);

    const after = Game._performAction(board, Actions.ArrowUp);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(2);
    expect(after.state[7].value).to.eq(8);
    expect(after.state[11].value).to.eq(2);
    expect(after.state[15].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(3);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowUp movement alone 1", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11, 8),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowUp);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(8);
    expect(after.state[7].value).to.eq(null);
    expect(after.state[11].value).to.eq(null);
    expect(after.state[15].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(1);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowUp movement alone 2", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15, 8),
    ]);

    const after = Game._performAction(board, Actions.ArrowUp);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(8);
    expect(after.state[7].value).to.eq(null);
    expect(after.state[11].value).to.eq(null);
    expect(after.state[15].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(1);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowUp movement alone 3", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3, 4),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15, 2),
    ]);

    const after = Game._performAction(board, Actions.ArrowUp);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(4);
    expect(after.state[7].value).to.eq(2);
    expect(after.state[11].value).to.eq(null);
    expect(after.state[15].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(2);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowLeft basic scenario", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0, 2), new Tile(1, 2), new Tile(2), new Tile(3),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowLeft);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[0].value).to.eq(4);
    expect(after.state[1].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(1);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowLeft 3 in a column scenario", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12, 2), new Tile(13, 2), new Tile(14, 2), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowLeft);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[12].value).to.eq(4);
    expect(after.state[13].value).to.eq(2);
    expect(after.state[14].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(2);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowLeft distant scenario 1", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0, 2), new Tile(1), new Tile(2, 2), new Tile(3),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowLeft);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[0].value).to.eq(4);
    expect(after.state[2].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(1);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowLeft distant scenario 2", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0, 2), new Tile(1), new Tile(2), new Tile(3, 2),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowLeft);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[0].value).to.eq(4);
    expect(after.state[3].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(1);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowLeft double merging", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3),
      new Tile(4, 2), new Tile(5, 2), new Tile(6, 2), new Tile(7, 2),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowLeft);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[4].value).to.eq(4);
    expect(after.state[5].value).to.eq(4);
    expect(after.state[6].value).to.eq(null);
    expect(after.state[7].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(2);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowLeft non-moveable scenario 1", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0, 2), new Tile(1, 4), new Tile(2, 2), new Tile(3),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowLeft);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[0].value).to.eq(2);
    expect(after.state[1].value).to.eq(4);
    expect(after.state[2].value).to.eq(2);
    expect(numberOfTilesWithValue).to.eq(3);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowLeft non-moveable scenario 2", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0, 2), new Tile(1), new Tile(2, 8), new Tile(3, 2),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowLeft);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[0].value).to.eq(2);
    expect(after.state[1].value).to.eq(8);
    expect(after.state[2].value).to.eq(2);
    expect(after.state[3].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(3);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowLeft non-moveable scenario 3", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1, 2), new Tile(2, 8), new Tile(3, 2),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowLeft);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[0].value).to.eq(2);
    expect(after.state[1].value).to.eq(8);
    expect(after.state[2].value).to.eq(2);
    expect(after.state[3].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(3);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowLeft movement alone 1", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10, 8), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowLeft);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[8].value).to.eq(8);
    expect(after.state[9].value).to.eq(null);
    expect(after.state[10].value).to.eq(null);
    expect(after.state[11].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(1);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowLeft movement alone 2", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15, 8),
    ]);

    const after = Game._performAction(board, Actions.ArrowLeft);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[12].value).to.eq(8);
    expect(after.state[13].value).to.eq(null);
    expect(after.state[14].value).to.eq(null);
    expect(after.state[15].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(1);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowLeft movement alone 3", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0, 4), new Tile(1), new Tile(2), new Tile(3, 2),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowLeft);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[0].value).to.eq(4);
    expect(after.state[1].value).to.eq(2);
    expect(after.state[2].value).to.eq(null);
    expect(after.state[3].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(2);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowRight basic scenario", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2, 2), new Tile(3, 2),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowRight);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(4);
    expect(after.state[2].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(1);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowRight 3 in a column scenario", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13, 2), new Tile(14, 2), new Tile(15, 2),
    ]);

    const after = Game._performAction(board, Actions.ArrowRight);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[13].value).to.eq(null);
    expect(after.state[14].value).to.eq(2);
    expect(after.state[15].value).to.eq(4);
    expect(numberOfTilesWithValue).to.eq(2);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowRight distant scenario 1", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1, 2), new Tile(2), new Tile(3, 2),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowRight);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[1].value).to.eq(null);
    expect(after.state[3].value).to.eq(4);
    expect(numberOfTilesWithValue).to.eq(1);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowRight distant scenario 2", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0, 2), new Tile(1), new Tile(2), new Tile(3, 2),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowRight);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(4);
    expect(after.state[0].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(1);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowRight double merging", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3),
      new Tile(4, 2), new Tile(5, 2), new Tile(6, 2), new Tile(7, 2),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowRight);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[7].value).to.eq(4);
    expect(after.state[6].value).to.eq(4);
    expect(after.state[5].value).to.eq(null);
    expect(after.state[4].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(2);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowRight non-moveable scenario 1", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1, 2), new Tile(2, 4), new Tile(3, 2),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowRight);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[0].value).to.eq(null);
    expect(after.state[1].value).to.eq(2);
    expect(after.state[2].value).to.eq(4);
    expect(after.state[3].value).to.eq(2);
    expect(numberOfTilesWithValue).to.eq(3);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowRight non-moveable scenario 2", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0, 2), new Tile(1, 8), new Tile(2), new Tile(3, 2),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowRight);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(2);
    expect(after.state[2].value).to.eq(8);
    expect(after.state[1].value).to.eq(2);
    expect(after.state[0].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(3);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowRight non-moveable scenario 3", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0, 2), new Tile(1, 8), new Tile(2, 2), new Tile(3),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowRight);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(2);
    expect(after.state[2].value).to.eq(8);
    expect(after.state[1].value).to.eq(2);
    expect(after.state[0].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(3);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowRight movement alone 1", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9, 8), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowRight);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[8].value).to.eq(null);
    expect(after.state[9].value).to.eq(null);
    expect(after.state[10].value).to.eq(null);
    expect(after.state[11].value).to.eq(8);
    expect(numberOfTilesWithValue).to.eq(1);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowRight movement alone 2", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12, 8), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowRight);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[12].value).to.eq(null);
    expect(after.state[13].value).to.eq(null);
    expect(after.state[14].value).to.eq(null);
    expect(after.state[15].value).to.eq(8);
    expect(numberOfTilesWithValue).to.eq(1);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowRight movement alone 3", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0, 2), new Tile(1), new Tile(2), new Tile(3, 4),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowRight);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(4);
    expect(after.state[2].value).to.eq(2);
    expect(after.state[1].value).to.eq(null);
    expect(after.state[0].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(2);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowDown basic scenario", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8, 2), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12, 2), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowDown);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[12].value).to.eq(4);
    expect(after.state[8].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(1);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowDown 3 in a column scenario", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7, 2),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11, 2),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15, 2),
    ]);

    const after = Game._performAction(board, Actions.ArrowDown);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[7].value).to.eq(null);
    expect(after.state[11].value).to.eq(2);
    expect(after.state[15].value).to.eq(4);
    expect(numberOfTilesWithValue).to.eq(2);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowDown distant scenario 1", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7, 2),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15, 2),
    ]);

    const after = Game._performAction(board, Actions.ArrowDown);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[15].value).to.eq(4);
    expect(after.state[7].value).to.eq(null);
    expect(numberOfTilesWithValue).to.eq(1);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowDown distant scenario 2", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3, 2),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15, 2),
    ]);

    const after = Game._performAction(board, Actions.ArrowDown);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(null);
    expect(after.state[15].value).to.eq(4);
    expect(numberOfTilesWithValue).to.eq(1);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowDown double merging", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3, 2),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7, 2),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11, 2),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15, 2),
    ]);

    const after = Game._performAction(board, Actions.ArrowDown);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(null);
    expect(after.state[7].value).to.eq(null);
    expect(after.state[11].value).to.eq(4);
    expect(after.state[15].value).to.eq(4);
    expect(numberOfTilesWithValue).to.eq(2);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowDown non-moveable scenario 1", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7, 2),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11, 4),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15, 2),
    ]);

    const after = Game._performAction(board, Actions.ArrowDown);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[7].value).to.eq(2);
    expect(after.state[11].value).to.eq(4);
    expect(after.state[15].value).to.eq(2);
    expect(numberOfTilesWithValue).to.eq(3);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowDown non-moveable scenario 2", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3, 2),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7, 8),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15, 2),
    ]);

    const after = Game._performAction(board, Actions.ArrowDown);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(null);
    expect(after.state[7].value).to.eq(2);
    expect(after.state[11].value).to.eq(8);
    expect(after.state[15].value).to.eq(2);
    expect(numberOfTilesWithValue).to.eq(3);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowDown non-moveable scenario 3", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3, 2),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7, 8),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11, 2),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowDown);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(null);
    expect(after.state[7].value).to.eq(2);
    expect(after.state[11].value).to.eq(8);
    expect(after.state[15].value).to.eq(2);
    expect(numberOfTilesWithValue).to.eq(3);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowDown movement alone 1", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7, 8),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowDown);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(null);
    expect(after.state[7].value).to.eq(null);
    expect(after.state[11].value).to.eq(null);
    expect(after.state[15].value).to.eq(8);
    expect(numberOfTilesWithValue).to.eq(1);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowDown movement alone 2", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3, 8),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15),
    ]);

    const after = Game._performAction(board, Actions.ArrowDown);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(null);
    expect(after.state[7].value).to.eq(null);
    expect(after.state[11].value).to.eq(null);
    expect(after.state[15].value).to.eq(8);
    expect(numberOfTilesWithValue).to.eq(1);
    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should handle ArrowDown movement alone 3", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0), new Tile(1), new Tile(2), new Tile(3, 2),
      new Tile(4), new Tile(5), new Tile(6), new Tile(7),
      new Tile(8), new Tile(9), new Tile(10), new Tile(11),
      new Tile(12), new Tile(13), new Tile(14), new Tile(15, 4),
    ]);

    const after = Game._performAction(board, Actions.ArrowDown);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[3].value).to.eq(null);
    expect(after.state[7].value).to.eq(null);
    expect(after.state[11].value).to.eq(2);
    expect(after.state[15].value).to.eq(4);
    expect(numberOfTilesWithValue).to.eq(2);

    expect(Game.hasGameEnded(after)).to.eq(false);
  });

  it("should finish the game", () => {
    // prettier-ignore
    const board = new Board([
      new Tile(0, 2), new Tile(1, 8), new Tile(2, 4), new Tile(3, 2),
      new Tile(4, 4), new Tile(5, 2), new Tile(6, 8), new Tile(7, 4),
      new Tile(8, 2), new Tile(9, 8), new Tile(10, 32), new Tile(11, 128),
      new Tile(12, 16), new Tile(13, 32), new Tile(14, 1024), new Tile(15, 512),
    ]);

    const after = Game._performAction(board, Actions.ArrowDown);

    const numberOfTilesWithValue = after.state.filter(Tile.hasValue).length;

    expect(after.state[0].value).to.eq(2);
    expect(after.state[1].value).to.eq(8);
    expect(after.state[2].value).to.eq(4);
    expect(after.state[3].value).to.eq(2);
    expect(after.state[4].value).to.eq(4);
    expect(after.state[5].value).to.eq(2);
    expect(after.state[6].value).to.eq(8);
    expect(after.state[7].value).to.eq(4);
    expect(after.state[8].value).to.eq(2);
    expect(after.state[9].value).to.eq(8);
    expect(after.state[10].value).to.eq(32);
    expect(after.state[11].value).to.eq(128);
    expect(after.state[12].value).to.eq(16);
    expect(after.state[13].value).to.eq(32);
    expect(after.state[14].value).to.eq(1024);
    expect(after.state[15].value).to.eq(512);

    expect(numberOfTilesWithValue).to.eq(16);
    expect(Game.hasGameEnded(after)).to.eq(true);
  });
});
