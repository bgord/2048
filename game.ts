import { random } from "lodash";
import { Tile } from "./tile";

export type MoveType = "ArrowUp" | "ArrowRight" | "ArrowDown" | "ArrowLeft";

export type BoardType = [
  Tile,
  Tile,
  Tile,
  Tile,
  Tile,
  Tile,
  Tile,
  Tile,
  Tile,
  Tile,
  Tile,
  Tile,
  Tile,
  Tile,
  Tile,
  Tile
];

export class Game {
  static emptyBoard: BoardType = [
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
    new Tile(16),
  ];

  static defaultScore = 0;

  static isProperMove(value: string): value is MoveType {
    return ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(value);
  }

  static initializeBoard(): BoardType {
    const board = Array.from(Game.emptyBoard) as BoardType;

    return Game.spawnRandomTile(board);
  }

  static handleMove(board: BoardType, type: MoveType): BoardType {
    return this.spawnRandomTile(board);
  }

  static hasGameEnded(board: BoardType): boolean {
    return board.every(Tile.hasValue);
  }

  static getScore(board: BoardType) {
    let score = Game.defaultScore;

    for (const tile of board) {
      if (tile?.value && tile.value > score) {
        score = tile.value;
      }
    }

    return score;
  }

  private static getColumns(board: BoardType) {
    const columns: Tile[][] = [[], [], [], []];

    for (const tile of board) {
      if ([1, 5, 9, 13].includes(tile.id)) {
        columns[0].push(tile);
      }
      if ([2, 6, 10, 14].includes(tile.id)) {
        columns[1].push(tile);
      }
      if ([3, 7, 11, 15].includes(tile.id)) {
        columns[2].push(tile);
      }
      if ([4, 8, 12, 16].includes(tile.id)) {
        columns[3].push(tile);
      }
    }

    return columns;
  }

  private static spawnRandomTile(board: BoardType): BoardType {
    const randomEmptyTileId = Game.getRandomEmptyTileId(board);

    return board.map((tile) =>
      tile.id === randomEmptyTileId ? { ...tile, value: 2 } : tile
    ) as BoardType;
  }

  private static getRandomEmptyTileId(board: BoardType): Tile["id"] {
    const emptyTiles = board.filter(Tile.isEmpty);

    const randomEmptyTileIndex = random(emptyTiles.length - 1);

    return emptyTiles[randomEmptyTileIndex].id;
  }
}
