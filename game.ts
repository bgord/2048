import { random } from "lodash";

export type TileType = { id: number; value: number | null };

export type MoveType = "ArrowUp" | "ArrowRight" | "ArrowDown" | "ArrowLeft";

export type BoardType = [
  TileType,
  TileType,
  TileType,
  TileType,
  TileType,
  TileType,
  TileType,
  TileType,
  TileType,
  TileType,
  TileType,
  TileType,
  TileType,
  TileType,
  TileType,
  TileType
];

export class Game {
  static emptyBoard: BoardType = [
    { id: 1, value: null },
    { id: 2, value: null },
    { id: 3, value: null },
    { id: 4, value: null },
    { id: 5, value: null },
    { id: 6, value: null },
    { id: 7, value: null },
    { id: 8, value: null },
    { id: 9, value: null },
    { id: 10, value: null },
    { id: 11, value: null },
    { id: 12, value: null },
    { id: 13, value: null },
    { id: 14, value: null },
    { id: 15, value: null },
    { id: 16, value: null },
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
    return board.every((tile) => tile.value !== null);
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
    const columns: TileType[][] = [[], [], [], []];

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

  private static getRandomEmptyTileId(board: BoardType): TileType["id"] {
    const emptyTiles = board.filter((tile) => tile.value === null);

    const randomEmptyTileIndex = random(emptyTiles.length - 1);

    return emptyTiles[randomEmptyTileIndex].id;
  }
}
