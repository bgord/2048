import { random, range } from "lodash";

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

  spawnRandomTile(): Board {
    const randomEmptyTileId = this.getRandomEmptyTileId();

    for (const tile of this.state) {
      if (tile.id === randomEmptyTileId) {
        tile.setValue(Tile.newlySpawnedValue);
      }
    }

    return this;
  }

  isFull(): boolean {
    return this.state.every(Tile.hasValue);
  }

  getColumns() {
    const columns: Tile[][] = [[], [], [], []];

    for (const tile of this.state) {
      if ([0, 4, 8, 12].includes(tile.id)) {
        columns[0].push(tile);
      }
      if ([1, 5, 9, 13].includes(tile.id)) {
        columns[1].push(tile);
      }
      if ([2, 6, 10, 14].includes(tile.id)) {
        columns[2].push(tile);
      }
      if ([3, 7, 11, 15].includes(tile.id)) {
        columns[3].push(tile);
      }
    }

    return columns;
  }

  getRows() {
    const rows: Tile[][] = [[], [], [], []];

    for (const tile of this.state) {
      if ([0, 1, 2, 3].includes(tile.id)) {
        rows[0].push(tile);
      }
      if ([4, 5, 6, 7].includes(tile.id)) {
        rows[1].push(tile);
      }
      if ([8, 9, 10, 11].includes(tile.id)) {
        rows[2].push(tile);
      }
      if ([12, 13, 14, 15].includes(tile.id)) {
        rows[3].push(tile);
      }
    }

    return rows;
  }

  static getEmpty(): BoardStateType {
    return range(0, 16).map((value) => new Tile(value)) as BoardStateType;
  }

  private getRandomEmptyTileId(): Tile["id"] | null {
    const emptyTiles = this.state.filter(Tile.isEmpty);

    if (emptyTiles.length === 0) return null;

    const randomEmptyTileIndex = random(emptyTiles.length - 1);
    return emptyTiles[randomEmptyTileIndex].id;
  }
}
