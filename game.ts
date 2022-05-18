import { random } from "lodash";

import { Tile } from "./tile";
import { Board } from "./board";
import { Mover } from "./mover";
import { Merger } from "./merger";

export type MoveType = "ArrowUp" | "ArrowRight" | "ArrowDown" | "ArrowLeft";

export class Game {
  static defaultScore = 0;

  static isProperMove(value: string): value is MoveType {
    return ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(value);
  }

  static initializeBoard(): Board {
    const board = new Board();
    board.spawnRandomTile();
    return board;
  }

  static handleMove(board: Board, type: MoveType): Board {
    if (type === "ArrowUp") {
      board.getColumns().forEach((column) => Merger.handle(column));
      board.getColumns().forEach((column) => Mover.handle(column));
    }

    if (type === "ArrowRight") {
      board.getRows().forEach((column) => Merger.handle(column.reverse()));
      board.getRows().forEach((column) => Mover.handle(column.reverse()));
    }

    if (type === "ArrowDown") {
      board.getColumns().forEach((row) => Merger.handle(row.reverse()));
      board.getColumns().forEach((row) => Mover.handle(row.reverse()));
    }

    if (type === "ArrowLeft") {
      board.getRows().forEach((row) => Merger.handle(row));
      board.getRows().forEach((row) => Mover.handle(row));
    }

    return board;
  }

  static hasGameEnded(board: Board): boolean {
    return board.state.every(Tile.hasValue);
  }

  static getScore(board: Board) {
    let score = Game.defaultScore;

    for (const tile of board.state) {
      if (tile?.value && tile.value > score) {
        score = tile.value;
      }
    }

    return score;
  }
}
