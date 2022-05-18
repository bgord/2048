import { random } from "lodash";
import { Tile } from "./tile";
import { Board } from "./board";

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
    return board.spawnRandomTile();
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
