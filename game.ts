import { random } from "lodash";
import { Tile } from "./tile";
import { Board } from "./board";

export type MoveType = "ArrowUp" | "ArrowRight" | "ArrowDown" | "ArrowLeft";

function shouldMerge({
  tiles: [first, second],
  condition = true,
}: {
  tiles: Tile[];
  condition?: boolean;
}): boolean {
  return (
    condition &&
    first.hasValue() &&
    second.hasValue() &&
    first.isEqualTo(second)
  );
}

function shouldMove({
  target,
  source,
  condition = true,
}: {
  target: Tile;
  source: Tile;
  condition?: boolean;
}): boolean {
  return condition && target.isEmpty() && source.hasValue();
}

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
      board.getColumns().forEach((column) => MERGES.LEFT_GRAVITY(column));
      board.getColumns().forEach((column) => MOVES.LEFT_GRAVITY(column));
    }

    if (type === "ArrowLeft") {
      board.getRows().forEach((row) => MERGES.LEFT_GRAVITY(row));
      board.getRows().forEach((row) => MOVES.LEFT_GRAVITY(row));
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

const MERGES = {
  LEFT_GRAVITY: (tiles: Tile[]) => {
    const merges = [
      { tiles: [tiles[0], tiles[1]] },
      { tiles: [tiles[0], tiles[2]], condition: tiles[1].isEmpty() },
      {
        tiles: [tiles[0], tiles[3]],
        condition: tiles[1].isEmpty() && tiles[2].isEmpty(),
      },
      { tiles: [tiles[1], tiles[2]] },
      { tiles: [tiles[1], tiles[3]], condition: tiles[2].isEmpty() },
      { tiles: [tiles[2], tiles[3]] },
    ];

    for (const merge of merges) {
      if (!shouldMerge(merge)) continue;

      merge.tiles[0].double();
      merge.tiles[1].clear();
    }
  },
};

const MOVES = {
  LEFT_GRAVITY: (tiles: Tile[]) => {
    const moves = [
      { target: tiles[0], source: tiles[1] },
      { target: tiles[0], source: tiles[2], condition: tiles[1].isEmpty() },
      {
        target: tiles[0],
        source: tiles[3],
        condition:
          tiles[0].isEmpty() && tiles[1].isEmpty() && tiles[2].isEmpty(),
      },
      { target: tiles[1], source: tiles[2] },
      { target: tiles[1], source: tiles[3], condition: tiles[2].isEmpty() },
      { target: tiles[2], source: tiles[3] },
    ];

    for (const move of moves) {
      if (!shouldMove(move)) continue;

      move.target.copyFrom(move.source);
      move.source.clear();
    }
  },
};
