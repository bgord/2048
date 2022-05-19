import { random } from "lodash";

import { Tile } from "./tile";

type BoardStateType = [
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

export class Board {
  state: BoardStateType;

  constructor(state: BoardStateType = Board.getEmpty()) {
    this.state = state;
  }

  static getEmpty(): BoardStateType {
    return [
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
  }

  spawnRandomTile(): Board {
    const randomEmptyTileId = this.getRandomEmptyTileId();

    for (const tile of this.state) {
      if (tile.id === randomEmptyTileId) {
        tile.setValue(Tile.newlySpawnedValue);
      }
    }

    return this;
  }

  private getRandomEmptyTileId(): Tile["id"] | null {
    const emptyTiles = this.state.filter(Tile.isEmpty);

    if (emptyTiles.length === 0) return null;

    const randomEmptyTileIndex = random(emptyTiles.length - 1);
    return emptyTiles[randomEmptyTileIndex].id;
  }

  getColumns() {
    const columns: Tile[][] = [[], [], [], []];

    for (const tile of this.state) {
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

  getRows() {
    const rows: Tile[][] = [[], [], [], []];

    for (const tile of this.state) {
      if ([1, 2, 3, 4].includes(tile.id)) {
        rows[0].push(tile);
      }
      if ([5, 6, 7, 8].includes(tile.id)) {
        rows[1].push(tile);
      }
      if ([9, 10, 11, 12].includes(tile.id)) {
        rows[2].push(tile);
      }
      if ([13, 14, 15, 16].includes(tile.id)) {
        rows[3].push(tile);
      }
    }

    return rows;
  }
}
