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
      const columnsMerge = board.getColumns();

      for (const tile of columnsMerge) {
        const merges = [
          { tiles: [tile[0], tile[1]] },
          { tiles: [tile[0], tile[2]], condition: tile[1].isEmpty() },
          {
            tiles: [tile[0], tile[3]],
            condition: tile[1].isEmpty() && tile[2].isEmpty(),
          },
          { tiles: [tile[1], tile[2]] },
          { tiles: [tile[1], tile[3]], condition: tile[2].isEmpty() },
          { tiles: [tile[2], tile[3]] },
        ];

        for (const merge of merges) {
          if (!shouldMerge(merge)) continue;

          merge.tiles[0].double();
          merge.tiles[1].clear();
        }
      }

      const columnsMove = board.getColumns();

      for (const tile of columnsMove) {
        const moves = [
          { target: tile[0], source: tile[1] },
          { target: tile[0], source: tile[2], condition: tile[1].isEmpty() },
          {
            target: tile[0],
            source: tile[3],
            condition:
              tile[0].isEmpty() && tile[1].isEmpty() && tile[2].isEmpty(),
          },
          { target: tile[1], source: tile[2] },
          { target: tile[1], source: tile[3], condition: tile[2].isEmpty() },
          { target: tile[2], source: tile[3] },
        ];

        for (const move of moves) {
          if (!shouldMove(move)) continue;

          move.target.copyFrom(move.source);
          move.source.clear();
        }
      }
    }

    if (type === "ArrowLeft") {
      const rowsMerge = board.getRows();

      for (const tile of rowsMerge) {
        const merges = [
          { tiles: [tile[0], tile[1]] },
          { tiles: [tile[0], tile[2]], condition: tile[1].isEmpty() },
          {
            tiles: [tile[0], tile[3]],
            condition: tile[1].isEmpty() && tile[2].isEmpty(),
          },
          { tiles: [tile[1], tile[2]] },
          { tiles: [tile[1], tile[3]], condition: tile[2].isEmpty() },
          { tiles: [tile[2], tile[3]] },
        ];

        for (const merge of merges) {
          if (!shouldMerge(merge)) continue;

          merge.tiles[0].double();
          merge.tiles[1].clear();
        }
      }

      const rowsMove = board.getRows();

      for (const tile of rowsMove) {
        const moves = [
          { target: tile[0], source: tile[1] },
          { target: tile[0], source: tile[2], condition: tile[1].isEmpty() },
          {
            target: tile[0],
            source: tile[3],
            condition:
              tile[0].isEmpty() && tile[1].isEmpty() && tile[2].isEmpty(),
          },
          { target: tile[1], source: tile[2] },
          { target: tile[1], source: tile[3], condition: tile[2].isEmpty() },
          { target: tile[2], source: tile[3] },
        ];

        for (const move of moves) {
          if (!shouldMove(move)) continue;

          move.target.copyFrom(move.source);
          move.source.clear();
        }
      }
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
