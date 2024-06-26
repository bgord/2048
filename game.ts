import { maxBy } from "lodash";

import { Board } from "./board";
import { Mover } from "./mover";
import { Merger } from "./merger";

export type ScoreType = number;

export type HandleMoveReturnType = {
  board: Board;
  hasEnded: boolean;
  score: ScoreType;
};

export enum Actions {
  ArrowUp = "ArrowUp",
  ArrowRight = "ArrowRight",
  ArrowDown = "ArrowDown",
  ArrowLeft = "ArrowLeft",
}

export class Game {
  static defaultScore: ScoreType = 0;

  static isProperAction(value: string): value is Actions {
    return ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(value);
  }

  static initialize(): { board: Board; score: ScoreType } {
    const board = new Board();
    board.spawnRandomTile();

    return { board, score: Game.defaultScore };
  }

  static handleMove(board: Board, action: string): HandleMoveReturnType {
    if (!Game.isProperAction(action) || Game.hasGameEnded(board)) {
      return {
        board,
        hasEnded: Game.hasGameEnded(board),
        score: Game.getScore(board),
      };
    }

    Game._performAction(board, action);
    board.spawnRandomTile();

    return {
      board,
      hasEnded: Game.hasGameEnded(board),
      score: Game.getScore(board),
    };
  }

  static getScore(board: Board): ScoreType {
    return maxBy(board.state, "value")?.value ?? Game.defaultScore;
  }

  static _performAction(board: Board, action: Actions): Board {
    if (!Game.isProperAction(action)) return board;

    if (action === "ArrowUp") {
      board.getColumns().forEach((column) => Merger.handle(column));
      board.getColumns().forEach((column) => Mover.handle(column));
    }

    if (action === "ArrowRight") {
      board.getRows().forEach((column) => Merger.handle(column.reverse()));
      board.getRows().forEach((column) => Mover.handle(column.reverse()));
    }

    if (action === "ArrowDown") {
      board.getColumns().forEach((row) => Merger.handle(row.reverse()));
      board.getColumns().forEach((row) => Mover.handle(row.reverse()));
    }

    if (action === "ArrowLeft") {
      board.getRows().forEach((row) => Merger.handle(row));
      board.getRows().forEach((row) => Mover.handle(row));
    }

    return board;
  }

  static hasGameEnded(board: Board): boolean {
    let numberOfPossibleActions = 0;

    const columns = board.getColumns();
    const rows = board.getRows();

    for (const column of columns) {
      if (Mover.simulate(column) || Mover.simulate(column.reverse())) {
        numberOfPossibleActions++;
      }

      if (Merger.simulate(column) || Merger.simulate(column.reverse())) {
        numberOfPossibleActions++;
      }
    }

    for (const row of rows) {
      if (Mover.simulate(row) || Mover.simulate(row.reverse())) {
        numberOfPossibleActions++;
      }

      if (Merger.simulate(row) || Merger.simulate(row.reverse())) {
        numberOfPossibleActions++;
      }
    }

    return board.isFull() && numberOfPossibleActions === 0;
  }
}
